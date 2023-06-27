const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');

// CREATE a new clinic
router.post('/clinics', clinicController.create);

// GET all clinic 
router.get('/clinics', clinicController.findAll);

// GET a specific clinic by ID
router.get('/clinics/:id', clinicController.findOne);

// UPDATE an existing clinic
router.put('/clinics/:id', clinicController.update);

// DELETE an existing clinic
router.delete('/clinics/:id', clinicController.delete);

module.exports = router;
