const mongoose = require('mongoose');
const clinicSchema = new mongoose.Schema({
    clinicNo:{
        type: Number,
        required: true,
        unique: true
    },
    fullname:{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Patient',
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    doctorname:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true
    },
    location:{
        type: String,
        required: true,
    }
});



module.exports = mongoose.model('Clinic', clinicSchema);
