const mongoose = require('mongoose');

const AnnotationSchema = new mongoose.Schema({
    image: { type: String, required: true },
    annotations: [{ type: Object }]
});

module.exports = mongoose.model('Annotation', AnnotationSchema);
