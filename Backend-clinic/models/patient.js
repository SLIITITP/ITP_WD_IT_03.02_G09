const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    nic:{
        type: Number,
        required: true,
        unique: true
    },
    dob:{
        type: Date,
        required: true
    },
    gender: String,
    group: String,
    contact:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Patient', patientSchema);
