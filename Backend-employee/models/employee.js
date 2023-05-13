const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeno:{
        type: Number,
        required: true,
        unique: true,
    },
    fullname:{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Patient',
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    position:{
        type: String,
        required: true,
    },
     address: {
        type: String,
        required: true,
      },
    contactnum:{
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
