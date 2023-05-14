import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import XLSX from 'xlsx';
import '../styles/AllAppoinments.css'

export default function AllMedicines() {
    const[medicines, setMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    let navigate = useNavigate();
    const getData = async () => {
        await axios.get("http://localhost:5001/medicines")
        .then((res) => {            
            setMedicines(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const GenerateReport = () => {
        const XLSX = require("xlsx");
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(medicines);
        XLSX.utils.book_append_sheet(wb, ws, "Medicine Report");
        const wbBlob = new Blob([XLSX.write(wb, { type: "array", bookType: "xlsx" })], { type: "application/octet-stream" });
        const url = URL.createObjectURL(wbBlob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "Medicine-report.xlsx");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

    

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:5001/medicines/${id}`)
        .then(() => {
            alert("Medicine Deleted Successfully")
            getData();
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    

    useEffect(() => {
        getData();
    }, [])

    if(!medicines)
    return alert("No Medicines")

    const onUpdate = (data) => {
      localStorage.setItem('id', data._id);
      localStorage.setItem('medicineno', data.medicineno);
      localStorage.setItem('name', data.name);
      localStorage.setItem('dosage', data.dosage);
      localStorage.setItem('manufacturer', data.manufacturer);
      localStorage.setItem('price', data.price);
      localStorage.setItem('suppliername', data.suppliername);
      localStorage.setItem('company', data.company);
      localStorage.setItem('expireddate', data.expireddate);
      localStorage.setItem('manufacturedate', data.manufacturedate);
      navigate('/update-medicine');
    }

    if (!medicines) return alert('No Medicines');
    const filteredMedicines = medicines.filter((medicine) => {
      return medicine.medicineno.toLowerCase().includes(searchTerm.toLowerCase());
    });
    

    return(
      <div className="container">
          <h1 style={{textAlign: 'center', fontFamily: 'cursive', fontSize: '50px'}}>All Medicines</h1>
          <div className="container">
              <div>
                  <button className="button-add" onClick={() => navigate("/add-medicine")}>
                      Add Medicine
                  </button>
              </div>
                <div className="search-container">
              <input
                  type="text"
                  placeholder="Search by Full Name"
                  value = {searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
          <button 
          type = "button"
          className ="btn-report"
          onClick={() => GenerateReport()}>Generate Report</button>
              <table style={{ textAlign: 'center' }}>
                  <thead>
                      <tr>
                          <th style={{ textAlign: 'center' }}>Medicine No</th>
                          <th style={{ textAlign: 'center' }}>Name</th>
                          <th style={{ textAlign: 'center' }}>Dosage</th>
                          <th style={{ textAlign: 'center' }}>manufacturer</th>                                          
                          <th style={{ textAlign: 'center' }}>Price</th>
                          <th style={{ textAlign: 'center' }}>Suppliername</th>
                          <th style={{ textAlign: 'center' }}>Expireddate</th>
                          <th style={{ textAlign: 'center' }}>Manufacturedate</th>
                          <th style={{ textAlign: 'center' }}>Action</th>
                      </tr>
                  </thead>
                  <tbody >
                      {filteredMedicines.map(medicine => (
                          <tr key={medicine._id}>
                              <td style={{ textAlign: 'center' }}>{medicine.medicineno}</td>
                              <td >{medicine.name}</td>
                              <td>{medicine.dosage}</td>
                              <td>{medicine.manufacture}</td>
                              <td>{medicine.price}</td>
                              <td>{medicine.suppliername}</td>
                              <td>{medicine.expireddate}</td>
                              <td>{medicine.manufactureddate}</td>
                              
                              
                              <td>    
                                  <button type='button' className="btn-update" onClick={() => onUpdate(medicine)}>Update</button>
                                  &nbsp;
                                  <button type='button' className="btn-delete" onClick={() => onDelete(medicine._id)}>Delete</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  )         
}
