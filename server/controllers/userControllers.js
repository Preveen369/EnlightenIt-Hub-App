const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {v4: uuid} = require('uuid')
const User = require('../models/userModel')
const HttpError = require('../models/errorModel')
const cloudinary = require("../utils/cloudinaryConfig")

// ---REGISTER A NEW USER ---
// POST: api/users/register
// UNPROTECTED
const registerUser = async (req, res, next) => {
    try{
        const {name, email, password, password2} = req.body;
        if (!name || !email || !password){
            return next(new HttpError("Fill in all the fields.", 422));
        }

        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({email: newEmail})
        if (emailExists){
            return next(new HttpError("Email already exists.", 422));
        }

        if ((password.trim()).length < 6){
            return next(new HttpError("Password should be at least 6 characters.", 422));
        }

        if (password != password2){
            return next(new HttpError("Passwords do not match.", 422));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({name, email: newEmail, password: hashedPass});
        res.status(201).json(`New user ${newUser.email} registered.`);

    } catch(error){
        return next(new HttpError("User registration failed.", 422));
    }
}


// ---LOGIN A REGISTERED USER ---
// POST: api/users/login
// UNPROTECTED
const loginUser = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        if (!email || !password){
            return next(new HttpError("Invalid email or password.", 422))
        }

        const newEmail = email.toLowerCase();

        const user = await User.findOne({email: newEmail})
        if(!user) {
            return next(new HttpError("Invalid credentials.", 422))
        }

        const comparePass = await bcrypt.compare(password, user.password)
        if(!comparePass) {
            return next(new HttpError("Invalid password entered.", 422))
        }

        const {_id: id, name} = user;
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(200).json({token, id, name})
    } catch(error){
        return next(new HttpError("Login failed. Please check your credentials.", 422))
    }
}


// ---USER PROFILE---
// POST: api/users/:id
// PROTECTED
const getUser = async (req, res, next) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id).select(`-password`);
        if (!user){
            return next(new HttpError("User not found. ", 404))
        }
        res.status(200).json(user);

    } catch(error){
        return next(new HttpError(error))
    }
}


// ---CHANGE USER AVATAR (profile picture)---  *****
// POST: api/users/change-avatar
// PROTECTED
const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files || !req.files.avatar) {
            return next(new HttpError("Please choose an image.", 422));
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError("User not found.", 404));
        }
        const { avatar } = req.files;
        if (avatar.size > 500000) {
            return next(new HttpError("Profile picture too big. Should be less than 500kb.", 422));
        }
        // Upload avatar to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(avatar.tempFilePath || avatar.path, {
            folder: "enlightenit-hub/avatars",
            public_id: uuid()
        });
        const updatedAvatar = await User.findByIdAndUpdate(
            req.user.id,
            { avatar: uploadResult.secure_url },
            { new: true }
        );
        if (!updatedAvatar) {
            return next(new HttpError("Avatar couldn't be changed.", 422));
        }
        res.status(200).json(updatedAvatar);
    } catch (error) {
        return next(new HttpError(error.message || "Failed to change avatar.", 500));
    }
};

// ---EDIT USER DETAILS (from profile)---
// POST: api/users/edit-user
// PROTECTED
const editUser = async (req, res, next) => {
    try{
       const {name, email, currentPassword, newPassword, confirmNewPassword} = req.body;
       if (!name || !email || !currentPassword || !newPassword) {
        return next(new HttpError("Fill in all fields.", 422))
       }

       // get user from database
       const user = await User.findById(req.user.id);
       if (!user) {
        return next(new HttpError("User not found.", 403))
       }

       // make sure new email doesn't already exist
       const emailExist = await User.findOne({email});

       if (emailExist && emailExist._id == user._id)  {
            return next(new HttpError("Email already exist.", 422))
       }

       // compare current password to db password
       const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
       if(!validateUserPassword) {
        return next(new HttpError("Invalid current password", 422))
       }

       // compare new passwords
       if (newPassword !== confirmNewPassword){
        return next(new HttpError("New passwords do not match.", 422))
       }

       // hash new password
       const salt = await bcrypt.genSalt(10);
       const hash = await bcrypt.hash(newPassword, salt);

       // update user info in database
       const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password: hash}, {new: true})
       res.status(200).json(newInfo);
    
    } catch(error){
        return next(new HttpError(error))
    }
}

// ---GET AUTHORS---
// POST: api/users/authors
// UNPROTECTED
const getAuthors = async (req, res, next) => {
    try{
        const authors = await User.find().select('-password');
        res.json(authors);
    } catch(error){
        return next(new HttpError(error))
    }
}

module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors};
