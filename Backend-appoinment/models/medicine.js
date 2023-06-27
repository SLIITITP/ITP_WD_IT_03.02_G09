const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
  medicineno: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  suppliername: {
    type: String,
    required: true
  },
  supplierPhone:{
    type: Number,
    required: true,
},
  company: {
    type: String,
    required: true
  },
  expireddate: {
    type: Date,
    required: true
  },
  manufactureDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Medicine', medicineSchema);
