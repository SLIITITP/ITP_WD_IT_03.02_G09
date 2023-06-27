import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../styles/AddAppoinment.css';

export default function AddEmployee() {
  let navigate = useNavigate();

  const [employeeno, setEmployeeNo] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [address, setAddress] = useState('');
  const [contactnum, setContactNum] = useState('');

  const validateContactNumber = (input) => {
    // Regex pattern for a 10-digit contact number
    const regex = /^\d{10}$/;
    return regex.test(input);
  };

  const validateEmail = (input) => {
    // Regex pattern for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input);
  };

  async function addEmployee(e) {
    e.preventDefault();

    if (!validateContactNumber(contactnum)) {
      alert('Invalid contact number format');
      return;
    }

    if (!validateEmail(email)) {
      alert('Invalid email format');
      return;
    }

    const newEmployee = {
      employeeno,
      fullname,
      email,
      position,
      address,
      contactnum,
    };

    await axios
      .post('http://localhost:5001/employees', newEmployee)
      .then(() => {
        alert('Employee Added Successfully');
        navigate('/employees');
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className='container'>
      <br></br>
      <form onSubmit={addEmployee} className='my-form'>
        <div className='mb-3'>
          <label htmlFor='employeeno' className='form-label'>
            Employee No
          </label>
          <input
            type='number'
            className='form-control'
            id='employeeno'
            placeholder='Enter Employee No'
            value={employeeno}
            onChange={(e) => {
              setEmployeeNo(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='fullname' className='form-label'>
            Full Name
          </label>
          <input
            type='text'
            className='form-control'
            id='fullname'
            placeholder='Enter Name'
            value={fullname}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='position' className='form-label'>
            Position
          </label>
          <select
            className='form-select'
            id='position'
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          >
            <option value=''>Select a position</option>
            <option value='Doctor'>Doctor</option>
            <option value='Nurse'>Nurse</option>
            <option value='wardSemp'>WardSemp</option>
            {/* Add more doctor options as needed */}
                 </select>
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          value={address}
          onChange={(e) => { setAddress(e.target.value) }}
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="contactnum" className="form-label">Contact Number</label>
        <input
          type="text"
          className="form-control"
          id="contactnum"
          placeholder="Enter Contact Number"
          value={contactnum}
          onChange={(e) => { setContactNum(e.target.value) }}
        />
      </div>

      <button type="submit">ADD</button>
    </form>
  </div>
);
}

