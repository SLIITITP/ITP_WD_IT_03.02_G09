const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// CREATE a new employee
router.post('/Employees', employeeController.create);

// GET all employee 
router.get('/Employees', employeeController.findAll);

// GET a specific employee by ID
router.get('/Employees/:id', employeeController.findOne);

// UPDATE an existing employee
router.put('/Employees/:id', employeeController.update);

// DELETE an existing employee
router.delete('/Employees/:id', employeeController.delete);

module.exports = router;
