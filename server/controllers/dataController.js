const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Message = require('../models/Message');
const Certification = require('../models/Certification');

exports.getSkills = async (req, res) => {
    try {
        const skill = await Skill.find();
        res.json(skill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getProjects = async (req, res) => {
    try {
        const project = await Project.find();
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getMessages = async (req, res) => {
    try {
        const message = await Message.find();
        res.json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getCertifications = async (req, res) => {
    try {
        const certification = await Certification.find();
        res.json(certification);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}