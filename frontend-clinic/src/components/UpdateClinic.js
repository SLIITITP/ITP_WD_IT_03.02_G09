import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../styles/AddClinic.css'

export default function UpdateClinic() {
    let navigate = useNavigate();
    
    const [clinicNo, setClinicNo] = useState("");
    const [fullname, setFullName] = useState();
    const [type, setType] = useState("");
    const [doctorname, setDoctorName] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState();
    const [id, setID] = useState("");
    
    async function Update(e) {
        e.preventDefault();

        const updatedClinic = {
            clinicNo,
            fullname,
            type,
            doctorname,
            date,
            location
        }

        await axios.put(`http://localhost:5001/clinics/${id}`,updatedClinic)
        .then(() => {
            alert("Clinic Updated Successfully");
            navigate('/clinics');
            localStorage.clear();
        })
        .catch(err => {
            alert(err);
        })
    }

    useEffect(() => {
        setClinicNo(localStorage.getItem('clinicNo'));
        setFullName(localStorage.getItem('fullname'));
        setType(localStorage.getItem('type'));
        setDoctorName(localStorage.getItem('doctorname'));
        setDate(new Date(localStorage.getItem('date')).toISOString().slice(0,10));
        setLocation(localStorage.getItem('location'));
        setID(localStorage.getItem('id'));
    }, [])

    return (
        <div className='container'>
            <br></br>
            <form onSubmit={Update} className="my-form">
            <div className="mb-3">
                    <label forHtml="clinicNo" className="form-label">Clinic No</label>
                    <input type="number" className="form-control" id="clinicNo" placeholder="Enter Clinic No" value={clinicNo} onChange={(e) => {setClinicNo(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label forHtml="fullname" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="fullname" placeholder="Enter Name" value={fullname} onChange={(e) => {setFullName(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label forHtml="type" className="form-label">Type</label>
                    <input type="text" className="form-control" id="type" value={type} onChange={(e) => {setType(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label forHtml="doctorname" className="form-label">Doctor Name</label>
                    <input type="text" className="form-control" id="doctorname" value={doctorname} onChange={(e) => {setDoctorName(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label forHtml="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" value={date} onChange={(e) => {setDate(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label forHtml="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" placeholder="Enter Location" value={location} onChange={(e) => {setLocation(e.target.value)}}/>
                </div>
                <button type="submit" className="btn btn-primary">UPDATE</button>
            </form>
        </div>
    )
}