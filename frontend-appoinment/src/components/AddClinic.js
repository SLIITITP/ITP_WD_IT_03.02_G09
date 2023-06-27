import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import '../styles/AddClinic.css'
import '../styles/AddAppoinment.css'

export default function AddClinic() {
    let navigate = useNavigate();

    const [clinicNo, setClinicNo] = useState("");
    const [fullname, setFullName] = useState();
    const [type, setType] = useState("");
    const [doctorname, setDoctorName] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState();
    
    async function addClinic(e) {
        e.preventDefault();

        const newClinic = {
            clinicNo,
            fullname,
            type,
            doctorname,
            date,
            location
        }

        await axios.post("http://localhost:5001/clinics",newClinic)
        .then(() => {
            alert("Clinic Added Successfully");
            navigate('/clinics');
        })
        .catch(err => {
            alert(err);
            console.log(err);
        })
    }

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = (currentDate.getMonth() + 1).toString();
        let day = currentDate.getDate().toString();
    
        // Add leading zero if month/day is a single digit
        month = month.length === 1 ? '0' + month : month;
        day = day.length === 1 ? '0' + day : day;
    
        return `${year}-${month}-${day}`;
      };

    return (
        <div className='container'>
            <br></br>
            <form onSubmit={addClinic} className="my-form">
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
                    
                    <select className="form-select" id="doctorname"value={doctorname} onChange={(e) => {setDoctorName(e.target.value)}}>
                    <option value="Select Doctor">Select Doctor</option>
                    <option value="Dr.Shanoojan">Dr.Shanoojan</option>
                    <option value="Dr.Venujan">Dr.Venujan</option>
                    <option value="Dr. Asmitha">Dr. Asmitha</option>
                    <option value="Dr. Abiramy">Dr. Abiramy</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label forHtml="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" value={date} min={getCurrentDate()} onChange={(e) => {setDate(e.target.value)}}/>

                </div>
                <div className="mb-3">
                    <label forHtml="location" className="form-label">Location</label>
                    <textarea type="text" className="form-control" id="location" placeholder="Enter Location" value={location} onChange={(e) => {setLocation(e.target.value)}}/>
                </div>
                <button type="submit" >ADD</button>
            </form>
        </div>
    )
}