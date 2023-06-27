import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddAppoinment.css';

export default function UpdateEmployee() {
  let navigate = useNavigate();

  const [employeeno, setEmployeeNo] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');

  const [address, setAddress] = useState('');
  const [contactnum, setContactNum] = useState('');
  const [id, setID] = useState('');

  async function Update(e) {
    e.preventDefault();

    const updatedEmployee = {
      employeeno,
      fullname,
      email,
      position,
      address,
      contactnum,
    };

    try {
      await axios.put(`http://localhost:5001/employees/${id}`, updatedEmployee);
      alert('Employee Updated Successfully');
      navigate('/employees');
      localStorage.clear();
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    setEmployeeNo(localStorage.getItem('employeeno'));
    setFullName(localStorage.getItem('fullname'));
    setEmail(localStorage.getItem('email'));
    setPosition(localStorage.getItem('position'));
    setAddress(localStorage.getItem('address'));
    setContactNum(localStorage.getItem('contactnum'));
    setID(localStorage.getItem('id'));
  }, []);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className='container'>
      <br></br>
      <form onSubmit={Update} className='my-form'>
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
          <input
            type='text'
            className='form-control'
            id='position'
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='address' className='form-label'>
            Address
          </label>
          <input
            type='text'
            className='form-control'
            id='address'
            value={address}
            onChange={handleAddressChange}
          />
        </div>
       

        <div className="mb-3">
            <label htmlFor="contactnum" className="form-label">Contact Number</label>
            <input
                type="number"
                className="form-control"
                id="contactnum"
                placeholder="Enter Contact Number"
                value={contactnum}
                onChange={(e) => { setContactNum(e.target.value) }}
            />
        </div>
        <button type="submit" className="btn btn-primary">UPDATE</button>
    </form>
</div>
);
}

