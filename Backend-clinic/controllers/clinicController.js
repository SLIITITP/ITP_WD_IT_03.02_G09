const Clinic = require('../models/clinic');
const Patient = require('../models/patient');

//Create and save new clinic
exports.create = (req,res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    const { clinicNo, fullname, type, doctorname, date, location } = req.body;

    // new clinic
    const clinic = new Clinic({
        clinicNo,
        fullname,
        type,
        doctorname,
        date,
        location
    })

    // save clinic in the database
    clinic
        .save()
        .then(() => {
            res.status(201).send({message : "Clinic Registered Successfully"})
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "Some error occurred while registering the clinic"
            });
        });
}

// //Retrieve and return all clinic
// exports.findOne = (req,res) => {
//     Clinic.find().populate('fullname', 'name')
//             .then(clinic => {
//                 res.send(clinic)
//             })
//             .catch(err => {
//                 res.status(500).send({ message : err.message || "Error Occurred while retrieving clinic information" })
//             })
// }

//Retrieve and return all clinic
exports.findAll = (req,res) => {
    Clinic.find()
            .then(clinic => {
                res.send(clinic)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retrieving clinic information" })
            })
}

//Retrieve and return a single clinic
exports.findOne = (req,res) => {
    if(req.params.id){
        const id = req.params.id;

        Clinic.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Clinic not found with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving clinic with id " + id})
            })
    }
}

//Update a clinic by clinic id
exports.update = (req,res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Clinic.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot update clinic with ${id}. Maybe clinic not found!`})
            }else{
                res.status(201).send({message : "Clinic details updated successfully"})
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error occurred while updating clinic information"})
        })
}

//Delete a clinic by clinic id
exports.delete = (req,res) => {
    const id = req.params.id;

    Clinic.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Cannot delete clinic with ${id}. Maybe id is incorrect`})
            }
            else{
                res.status(201).send({message : "Clinic details deleted successfully"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message : `Error deleting clinic with id = ${id}`});
        })
}