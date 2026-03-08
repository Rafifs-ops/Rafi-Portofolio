const express = require('express');
const router = express.Router();
const { getSkills, getCertifications, getMessages, getProjects, createSkill, createProject, createCertification } = require('../controllers/dataController');
const upload = require('../middleware/upload');

router.get('/skills', getSkills);
router.post('/skills', upload.single('logo'), createSkill);

router.get('/projects', getProjects);
router.post('/projects', upload.single('thumb_img'), createProject);

router.get('/messages', getMessages);

router.get('/certifications', getCertifications);
router.post('/certifications', upload.single('img'), createCertification);

module.exports = router;