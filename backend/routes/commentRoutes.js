const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/roleMiddleware'); // Ensure this middleware exists and is set up properly to authenticate users

// POST a new comment
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { content, avatar } = req.body;
        const author = req.user.username; // Assuming username is stored in user object after auth
        const newComment = new Comment({
            content,
            author,
            avatar
        });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a specific comment by id
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) res.status(404).json({ message: 'Comment not found' });
        else res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a specific comment by id
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { content } = req.body;
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
        } else {
            if (req.user.username !== comment.author) {
                res.status(403).json({ message: "Unauthorized to edit this comment" });
            } else {
                comment.content = content;
                await comment.save();
                res.json(comment);
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a specific comment
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
        } else {
            if (req.user.username !== comment.author) {
                res.status(403).json({ message: "Unauthorized to delete this comment" });
            } else {
                await comment.remove();
                res.json({ message: 'Comment deleted successfully' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
