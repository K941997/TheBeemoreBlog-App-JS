const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: "user",
    },
    content: String,
    post_id: {
        type: String,
        ref: "post"
    },
    rating: {
        type: Number,
        default: 0,
    },
    reply: Array,

}, {
    timestamps: true,
})

module.exports = mongoose.model('comment', commentSchema);