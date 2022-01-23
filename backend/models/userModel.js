const mongoose = require('mongoose');
const crypto = require('crypto');

//model:
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please add your username"],
        trim: true,
        maxLength: [20, "Your username is up to 20 chars"]
    },
    account: {
        type: String,
        required: [true, "Please add your email or phone"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please add your password"],
        trim: true,
        minLength: [6, "Password must be at least 6 chars"]
    },
    picture: {
        type: String,
        default: "",
    },
    background: {
        type: String,
        default: "",
    },
    role: {
        type: Number,
        default: 0,
        //we have more type (0: user, 1: admin,....)
    },
    type: {
        type: String,
        default: "register", //login
    },
    resetPasswordLink: {
        data: String,
        default: "",
    },
    posts: {
        type: Array,
        ref: "post"
    },
    followers: {
        type: Array,
    },
    following: {
        type: Array,
    },
    rating: {
        type: Number,
        default: 0,
    }

}, {
    timestamps: true
});

const userModel = mongoose.model("user", userSchema);


//export:
module.exports = userModel;