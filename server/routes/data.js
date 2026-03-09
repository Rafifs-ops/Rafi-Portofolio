const express = require('express');
const router = express.Router();
const { 
    getSkills, getCertifications, getMessages, getProjects, 
    createSkill, createProject, createCertification,
    editSkill, deleteSkill,
    editProject, deleteProject,
    editCertification, deleteCertification
} = require('../controllers/dataController');
const upload = require('../middleware/upload');

router.get('/skills', getSkills);
router.post('/skills', upload.single('logo'), createSkill);
router.put('/skills/:id', upload.single('logo'), editSkill);
router.delete('/skills/:id', deleteSkill);

router.get('/projects', getProjects);
router.post('/projects', upload.single('thumb_img'), createProject);
router.put('/projects/:id', upload.single('thumb_img'), editProject);
router.delete('/projects/:id', deleteProject);

router.get('/messages', getMessages);

router.get('/certifications', getCertifications);
router.post('/certifications', upload.single('img'), createCertification);
router.put('/certifications/:id', upload.single('img'), editCertification);
router.delete('/certifications/:id', deleteCertification);

module.exports = router;