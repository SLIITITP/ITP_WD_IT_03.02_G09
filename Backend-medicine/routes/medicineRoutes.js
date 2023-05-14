const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// CREATE a new medicine
router.post('/Medicines', medicineController.create);

// GET all medicines
router.get('/Medicines', medicineController.findAll);

// GET a specific medicine by ID
router.get('/Medicines/:id', medicineController.findOne);

// UPDATE an existing medicine
router.put('/Medicines/:id', medicineController.update);

// DELETE an existing medicine
router.delete('/Medicines/:id', medicineController.delete);

module.exports = router;
