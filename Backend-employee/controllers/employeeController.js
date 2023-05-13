const Employee = require('../models/employee');

// Create and save a new employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const { employeeno, fullname, email, position, address, contactnum } = req.body;

  // Create an employee instance
  const employee = new Employee({
    employeeno,
    fullname,
    email,
    position,
    address,
    contactnum
  });

  // Save the employee in the database
  employee.save()
    .then(() => {
      res.status(201).send({ message: "Employee registered successfully" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while registering the employee" });
    });
};

// Retrieve and return all employees
exports.findAll = (req, res) => {
  Employee.find()
    .then(employees => {
      res.send(employees);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error occurred while retrieving employee information" });
    });
};

// Retrieve and return a single employee by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Employee.findById(id)
    .then(employee => {
      if (!employee) {
        res.status(404).send({ message: "Employee not found with id " + id });
      } else {
        res.send(employee);
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving employee with id " + id });
    });
};

// Update an employee by ID
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;

  Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(employee => {
      if (!employee) {
        res.status(404).send({ message: `Cannot update employee with ${id}. Employee not found!` });
      } else {
        res.status(200).send({ message: "Employee details updated successfully" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error occurred while updating employee information" });
    });
};

// Delete an employee by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.findByIdAndRemove(id)
    .then(employee => {
      if (!employee) {
        res.status(404).send({ message: `Cannot delete employee with ${id}. Employee not found!` });
      } else {
        res.status(200).send({ message: "Employee details deleted successfully" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: `Error deleting employee with id ${id}` });
    });
};
