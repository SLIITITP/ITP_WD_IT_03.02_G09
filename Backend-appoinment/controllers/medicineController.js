const Medicine = require('../models/medicine');

// Create and save a new medicine
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const { medicineno, name, dosage, manufacturer, price,suppliername,supplierPhone, company,expireddate, manufactureDate } = req.body;

  // Create a medicine instance
  const medicine = new Medicine({
      medicineno,
      name,
      dosage,
      manufacturer,
      price,
      suppliername,
      supplierPhone,
      company,
      expireddate,
      manufactureDate
  });

  // Save the medicine in the database
  medicine.save()
    .then(() => {
      res.status(201).send({ message: "Medicine registered successfully" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while registering the medicine" });
    });
};

// Retrieve and return all medicines
exports.findAll = (req, res) => {
  Medicine.find()
    .then(medicines => {
      res.send(medicines);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error occurred while retrieving medicine information" });
    });
};

// Retrieve and return a single medicine by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Medicine.findById(id)
    .then(medicine => {
      if (!medicine) {
        res.status(404).send({ message: "Medicine not found with id " + id });
      } else {
        res.send(medicine);
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving medicine with id " + id });
    });
};

// Update a medicine by ID
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;

  Medicine.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(medicine => {
      if (!medicine) {
        res.status(404).send({ message: `Cannot update medicine with ${id}. Medicine not found!` });
      } else {
        res.status(200).send({ message: "Medicine details updated successfully" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error occurred while updating medicine information" });
    });
};

// Delete a medicine by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Medicine.findByIdAndRemove(id)
    .then(medicine => {
      if (!medicine) {
        res.status(404).send({ message: `Cannot delete medicine with ${id}. Medicine not found!` });
      } else {
        res.status(200).send({ message: "Medicine details deleted successfully" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: `Error deleting medicine with id ${id}` });
    });
};
