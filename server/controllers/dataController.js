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

exports.createSkill = async (req, res) => {
    try {
        const { name } = req.body;
        const logo = req.file ? req.file.path : '';

        if (!name || !logo) {
            return res.status(400).json({ message: 'Name and logo are required' });
        }

        const newSkill = new Skill({ name, logo });
        await newSkill.save();
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createProject = async (req, res) => {
    try {
        const { title, caption, description, link_web, tech_stack } = req.body;
        const thumb_img = req.file ? req.file.path : '';

        if (!title || !caption || !description || !link_web || !thumb_img) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let parsedTechStack = [];
        if (tech_stack) {
            try {
                parsedTechStack = JSON.parse(tech_stack);
            } catch (e) {
                // if it's not a JSON string, maybe it's a comma-separated string or just a single string
                parsedTechStack = Array.isArray(tech_stack) ? tech_stack : [tech_stack];
            }
        }

        const newProject = new Project({
            thumb_img,
            title,
            caption,
            description,
            link_web,
            tech_stack: parsedTechStack
        });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createCertification = async (req, res) => {
    try {
        const { title } = req.body;
        const img = req.file ? req.file.path : '';

        if (!title || !img) {
            return res.status(400).json({ message: 'Title and image are required' });
        }

        const newCertification = new Certification({ title, img });
        await newCertification.save();
        res.status(201).json(newCertification);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}