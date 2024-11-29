const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
    avatar: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
