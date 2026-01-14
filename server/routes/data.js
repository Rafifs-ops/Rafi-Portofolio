const express = require('express');
const router = express.Router();
const { getSkills, getCertifications, getMessages, getProjects } = require('../controllers/dataController');

router.get('/skills', getSkills);
router.get('/projects', getProjects);
router.get('/messages', getMessages);
router.get('/certifications', getCertifications);


module.exports = router;