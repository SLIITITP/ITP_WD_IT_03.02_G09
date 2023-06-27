import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import '../styles/AddAppoinment.css'

export default function AddAppoinment() {
    let navigate = useNavigate();

    const [appoinmentno, setAppoinmentNo] = useState("");
    const [fullname, setFullName] = useState();
    const [email, setEmail] = useState("");
    const [doctorname, setDoctorName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [condition, setCondition] = useState("");
    const [appoinmentNoError, setAppoinmentNoError] = useState('');
    const [fullnameError, setFullNameError] = useState('');
    
    const validateEmail = (input) => {
        // Regex pattern for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(input);
      };

      const validateFullName = (input) => {
        // Regular expression to check if the value contains numbers or symbols
        const regex = /[0-9!@#$%^&*(),.?":{}|<>]/;
        return regex.test(input);
      };

    async function addAppoinment(e) {
        e.preventDefault();

        if (validateFullName(fullname)) {
            setFullNameError('Invalid name format');
            return;
          }

        if (appoinmentno.trim() === '') {
            setAppoinmentNoError('Appoinment No is required');
            return;
          }

          if (!validateEmail(email)) {
            alert('Invalid email format');
            return;
          }

        const newAppoinment = {
            appoinmentno,
            fullname,
            email,
            doctorname,
            date,
            time,
            location,
            condition
        }

        await axios.post("http://localhost:5001/appoinments",newAppoinment)
        .then(() => {
            alert("Appoinment Added Successfully");
            navigate('/appoinments');
        })
        .catch(err => {
            alert(err);
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
        const handleTimeChange = (event) => {
            setTime(event.target.value);
          };
        
          const handleLocationChange = (event) => {
            setLocation(event.target.value);
          };
        

    return (
        <div className='container'>
            <br></br>
            <form onSubmit={addAppoinment} className="my-form">
            <div className="mb-3">
          <label htmlFor="appoinmentno" className="form-label">Appoinment No</label>
          <input
            type="number"
            className={`form-control ${appoinmentNoError ? 'is-invalid' : ''}`}
            id="appoinmentno"
            placeholder="Enter Appoinment No"
            value={appoinmentno}
            onChange={e => {
              setAppoinmentNo(e.target.value);
              setAppoinmentNoError('');
            }}
          />
          {appoinmentNoError && <div className="invalid-feedback">{appoinmentNoError}</div>}
        </div>
        <div className='mb-3'>
          <label htmlFor='fullname' className='form-label'>
            Patient Name
          </label>
          <input
            type='text'
            className={`form-control ${fullnameError ? 'is-invalid' : ''}`}
            id='fullname'
            placeholder='Enter Name'
            value={fullname}
            onChange={(e) => {
              setFullName(e.target.value);
              setFullNameError('');
            }}
          />
          {fullnameError && <div className='invalid-feedback'>{fullnameError}</div>}
        </div>
                <div className="mb-3">
                    <label forHtml="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label forHtml="doctorname" className="form-label">Doctor Name</label>
                    <select className="form-select" id="doctorname" value={doctorname} onChange={(e) => {setDoctorName(e.target.value)}}>
                        <option value="">Select a doctor</option>
                        <option value="Dr. John Doe">Dr. John Doe</option>
                        <option value="Dr. Jane Smith">Dr. Jane Smith</option>
                        <option value="Dr. Mark Johnson">Dr. Mark Johnson</option>
                        <option value="Dr. Saravanan">Dr. Saravanan</option>
                        <option value="Dr. Sharujan">Dr. Sharujan</option>
                        {/* Add more doctor options as needed */}
                </select>
                </div>
                <div className="mb-3">
                    <label forHtml="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date"  value={date} min={getCurrentDate()} onChange={(e) => {setDate(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="time" className="form-label">Time</label>
                    <input type="time" className="form-control" id="time" value={time} onChange={handleTimeChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" placeholder="Enter Location" value={location} onChange={handleLocationChange} />
                </div>
                <div className="mb-3">
                    <label forHtml="condition" className="form-label">Condition</label>
                    <textarea type="text" className="form-control" id="condition" placeholder="Enter Condition" value={condition} onChange={(e) => {setCondition(e.target.value)}}/>
                </div>
                <button type="submit" >ADD</button>
            </form>
        </div>
    )
}
