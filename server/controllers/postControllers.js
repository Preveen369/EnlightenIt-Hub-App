const Post = require("../models/postModel")
const User = require("../models/userModel")
const { v4: uuid } = require('uuid')
const HttpError = require('../models/errorModel')
const cloudinary = require("../utils/cloudinaryConfig")


// --- CREATE A POST ---  *****
// POST: api/posts
// PROTECTED
const createPost = async (req, res, next) => {
    try {
        const { title, category, description } = req.body;
        if (!title || !category || !description || !req.files?.thumbnail) {
            return next(new HttpError("Fill in all the fields and choose thumbnail.", 422));
        }
        const { thumbnail } = req.files;
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail too big. File should be less than 2mb", 422));
        }
        
        // Upload thumbnail to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(thumbnail.tempFilePath || thumbnail.path, {
            folder: "enlightenit-hub/posts",
            public_id: uuid()
        });
        
        const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail: uploadResult.secure_url,
            creator: req.user.id
        });
        if (!newPost) {
            return next(new HttpError("Post couldn't be created.", 422));
        }
        // Increase post count for the user
        const currentUser = await User.findById(req.user.id);
        await User.findByIdAndUpdate(req.user.id, { posts: currentUser.posts + 1 });
       
        res.status(201).json(newPost);
    } catch (error) {
        return next(new HttpError(error.message || error));
    }
};


// --- GET ALL POSTS ---
// GET: api/posts/
// UNPROTECTED
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}


// --- GET SINGLE POST ---
// GET: api/posts/:id
// PROTECTED
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError("Post not found", 404))
        }
        res.status(200).json(post);
    } catch (error) {
        return next(new HttpError(error))
    }
}


// --- GET POSTS BY CATEGORY ---
// GET: api/posts/cateogory/:category
// PROTECTED
const getCatPosts = async (req, res, next) => {
    try {
        const { category } = req.params;
        const catPosts = await Post.find({ category }).sort({ createdAt: -1 })
        res.status(200).json(catPosts);
    } catch (error) {
        return next(new HttpError(error))
    }
}


// --- GET USER / AUTHOR POST ---
// GET: api/posts/users/:id
// PROTECTED
const getUserPosts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ creator: id }).sort({ createdAt: -1 })
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError(error))
    }
}


// --- EDIT POSTS ---    ******
// PATCH: api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        let { title, category, description } = req.body;
        if (!title || !category || !description || description.length < 12) {
            return next(new HttpError("Fill in all the fields properly.", 422));
        }
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError("Post not found.", 404));
        }
        if (post.creator.toString() !== req.user.id) {
            return next(new HttpError("Unauthorized action.", 403));
        }
        let newThumbnailUrl = post.thumbnail; // default to existing thumbnail

        // If a new thumbnail is uploaded
        if (req.files?.thumbnail) {
            const { thumbnail } = req.files;
            if (thumbnail.size > 2000000) {
                return next(new HttpError("Thumbnail too big. Should be less than 2mb.", 422));
            }
            const uploadResult = await cloudinary.uploader.upload(thumbnail.tempFilePath || thumbnail.path, {
                folder: "enlightenit-hub/posts",
                public_id: uuid()
            });
            newThumbnailUrl = uploadResult.secure_url;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, category, description, thumbnail: newThumbnailUrl },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        return next(new HttpError(error.message || error));
    }
};


// --- DELETE POSTS ---
// DELETE: api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError("Post not found.", 404));
        }
        if (post.creator.toString() !== req.user.id) {
            return next(new HttpError("Unauthorized action.", 403));
        }
        // Optionally, you can delete the image from Cloudinary if you store the public_id
        // cloudinary.uploader.destroy(post.public_id);

        await Post.findByIdAndDelete(postId);

        // Decrease the post count for the user
        const currentUser = await User.findById(req.user.id);
        const userPostCount = currentUser.posts > 0 ? currentUser.posts - 1 : 0;
        await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

        res.status(200).json({ message: `Post ${postId} deleted successfully.` });
    } catch (error) {
        return next(new HttpError(error.message || error));
    }
};

module.exports = { createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost }
