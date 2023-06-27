import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../styles/AddAppoinment.css';

export default function AddMedicine() {
  let navigate = useNavigate();

  const [medicineno, setMedicineNo] = useState('');
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [price, setPrice] = useState('');
  const [suppliername, setSupplierName] = useState('');
  const [supplierPhone, setSupplierPhone] = useState('');
  const [company, setCompany] = useState('');
  const [expireddate, setExpiredDate] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  


  async function addMedicine(e) {
    e.preventDefault();

    if (!validateContactNumber(supplierPhone)) {
      alert('Invalid contact number format');
      return;
    }

    const newMedicine = {
      medicineno,
      name,
      dosage,
      manufacturer,
      price,
      suppliername,
      supplierPhone,
      company,
      expireddate,
      manufactureDate,
    };

    await axios
      .post('http://localhost:5001/medicines', newMedicine)
      .then(() => {
        alert('Medicine Added Successfully');
        navigate('/medicines');
      })
      .catch((err) => {
        alert(err);
      });
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

  const validateContactNumber = (input) => {
    // Regex pattern for a 10-digit contact number
    const regex = /^\d{10}$/;
    return regex.test(input);
  };

  

  return (
    <div className='container'>
      <br></br>
      <form onSubmit={addMedicine} className='my-form'>
        <div className='mb-3'>
          <label htmlFor='medicineno' className='form-label'>
            Medicine No
          </label>
          <input
            type='number'
            className='form-control'
            id='medicineno'
            placeholder='Enter Medicine No'
            value={medicineno}
            onChange={(e) => {
              setMedicineNo(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='dosage' className='form-label'>
            Dosage
          </label>
          <input
            type='text'
            className='form-control'
            id='dosage'
            value={dosage}
            onChange={(e) => {
              setDosage(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='manufacturer' className='form-label'>
            Manufacturer
          </label>
          <input
            type='text'
            className='form-control'
            id='manufacturer'
            value={manufacturer}
            onChange={(e) => {
              setManufacturer(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='price' className='form-label'>
            Price
          </label>
          <input
            type='number'
            step='0.01'
            className='form-control'
            id='price'
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='suppliername' className='form-label'>
            Supplier Name
          </label>
          <input
            type='text'
            className='form-control'
            id='suppliername'
            value={suppliername}
            onChange={(e) => {
              setSupplierName(e.target.value);
            }}
          />
        </div>
  
  <div className="mb-3">
        <label htmlFor="supplierPhone" className="form-label"> Supplier Phone No</label>
        <input
          type="text"
          className="form-control"
          id="supplierPhone"
          placeholder="Enter Contact Number"
          value={supplierPhone}
          onChange={(e) => { setSupplierPhone(e.target.value) }}
        />
      </div>

        <div className='mb-3'>
          <label htmlFor='company' className='form-label'>
            Company
          </label>
          <input
            type='text'
            className='form-control'
            id='company'
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
        </div>
     
        <div className="mb-3">
                    <label forHtml="expireddate" className="form-label">Expired Date</label>
                    <input type="date" className="form-control" id="expireddate"  value={expireddate} min={getCurrentDate()} onChange={(e) => {setExpiredDate(e.target.value)}}/>
                </div>
        <div className='mb-3'>
          <label htmlFor='manufactureDate' className='form-label'>
            Manufacture Date
          </label>
          <input
            type='date'
            className='form-control'
            id='manufactureDate'
            value={manufactureDate}
            onChange={(e) => {
              setManufactureDate(e.target.value);
            }}
          />
        </div>

        <button type='submit'>ADD</button>
      </form>
    </div>
  );
}

