const express = require('express');
const router = express.Router();
const Annotation = require('../models/Annotation');
const authMiddleware = require('../middleware/roleMiddleware'); // Ensure you have this middleware to authenticate users

// POST a new annotation or update existing one
router.post('/', authMiddleware, async (req, res) => {
    const { image, annotations } = req.body;
    try {
        let annotation = await Annotation.findOne({ image: image });
        if (annotation) {
            // Update existing annotations if the image already exists
            annotation.annotations = annotations;
            await annotation.save();
            res.status(200).json(annotation);
        } else {
            // Create a new annotation if the image does not exist
            annotation = new Annotation({ image, annotations });
            await annotation.save();
            res.status(201).json(annotation);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET annotations by image
router.get('/:image', authMiddleware, async (req, res) => {
    try {
        const annotation = await Annotation.findOne({ image: req.params.image });
        if (!annotation) {
            res.status(404).json({ message: 'No annotations found for this image' });
        } else {
            res.status(200).json(annotation);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
