const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    thumb_img: { type: String, required: true },
    title: { type: String, required: true },
    caption: { type: String, required: true },
    description: { type: String, required: true },
    link_web: { type: String, required: true },
    tech_stack: [],
});

module.exports = mongoose.model('Project', ProjectSchema);