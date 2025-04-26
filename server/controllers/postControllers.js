const Post = require("../models/postModel")
const User = require("../models/userModel")
const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')
const HttpError = require('../models/errorModel')


// --- CREATE A POST ---
// POST: api/posts
// PROTECTED
const createPost = async (req, res, next) => {
    try {
        let { title, category, description } = req.body;
        if (!title || !category || !description) {
            return next(new HttpError("Fill in all the fields and choose thumbnail.", 422));
        }
        const { thumbnail } = req.files;
        // check the file size
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail too big. File should be less than 2mb", 422))
        }
        const ext = path.extname(thumbnail.name);
        const baseName = path.basename(thumbnail.name, ext);
        const newFilename = baseName + '-' + uuid() + ext;
        const uploadPath = path.join(__dirname, '..', 'uploads', newFilename);

        await new Promise((resolve, reject) => {
            thumbnail.mv(uploadPath, async (err) => {
                if (err) {
                    return reject(err);
                } else {
                    const newPost = await Post.create({ title, category, description, thumbnail: newFilename, creator: req.user.id })
                    if (!newPost) {
                        return next(new HttpError("Post couldn't be created.", 422))
                    }
                    // find user and increase post count by 1
                    const currentUser = await User.findById(req.user.id)
                    const userPostCount = currentUser.posts + 1;
                    await User.findByIdAndUpdate(req.user.id, { posts: userPostCount })

                    res.status(201).json(newPost)
                }

                resolve();
            });
        });
    } catch (error) {
        return next(new HttpError(error))
    }
}


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


// --- EDIT POSTS ---
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

        // Ensure only the creator can edit
        if (post.creator.toString() !== req.user.id) {
            return next(new HttpError("Unauthorized action.", 403));
        }

        let newFileName = post.thumbnail; // default to old thumbnail

        // If new thumbnail is uploaded
        if (req.files?.thumbnail) {
            const { thumbnail } = req.files;

            if (thumbnail.size > 2000000) {
                return next(new HttpError("Thumbnail too big. Should be less than 2mb.", 422));
            }

            const ext = path.extname(thumbnail.name);
            const baseName = path.basename(thumbnail.name, ext);
            newFileName = baseName + '-' + uuid() + ext;
            const uploadPath = path.join(__dirname, '..', 'uploads', newFileName);

            await new Promise((resolve, reject) => {
                thumbnail.mv(uploadPath, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });

            // Delete the old thumbnail file
            fs.unlink(path.join(__dirname, '..', 'uploads', post.thumbnail), (err) => {
                if (err) { 
                    return next(new HttpError("Error deleting old thumbnail"));
                }
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, category, description, thumbnail: newFileName },
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

        // Check if the user is the creator
        if (post.creator.toString() !== req.user.id) {
            return next(new HttpError("Unauthorized action.", 403));
        }

        // Delete the thumbnail file
        fs.unlink(path.join(__dirname, '..', 'uploads', post.thumbnail), (err) => {
            if (err) console.error("Error deleting thumbnail:", err);
        });

        // Delete the post from DB
        await Post.findByIdAndDelete(postId);

        // Decrease the post count of the user
        const currentUser = await User.findById(req.user.id);
        const userPostCount = currentUser.posts > 0 ? currentUser.posts - 1 : 0;
        await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

        res.status(200).json({ message: `Post ${postId} deleted successfully.` });
    } catch (error) {
        return next(new HttpError(error.message || error));
    }
};


module.exports = { createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost }
