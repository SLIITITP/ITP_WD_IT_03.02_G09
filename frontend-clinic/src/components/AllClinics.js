import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AllClinics.css'
// eslint-disable-next-line no-unused-vars
import XLSX from 'xlsx';




export default function AllClinics() {
    const[clinics, setClinics] = useState([]);
    const [searchTerm,setSearchTerm]=useState("");
    let navigate = useNavigate();

    const getData = async () => {
        await axios.get("http://localhost:5001/clinics")
        .then((res) => {            
            setClinics(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:5001/clinics/${id}`)
        .then(() => {
            alert("Clinic Deleted Successfully")
            getData();
        })
        .catch((err) => {
            alert(err.message);
        })
    }


    useEffect(() => {
        getData();
    }, [])

    if(!clinics)
    return alert("No Clinics")

    const onUpdate = (data) => {
        localStorage.setItem('id', data._id);
        localStorage.setItem('clinicNo', data.clinicNo);
        localStorage.setItem('fullname', data.fullname);
        localStorage.setItem('type', data.type);
        localStorage.setItem('doctorname', data.doctorname);
        localStorage.setItem('date', data.date);
        localStorage.setItem('location', data.location);

        navigate('/update-clinic');
    }

    const generateReport = () => {
        const XLSX = require("xlsx");
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(clinics);
        XLSX.utils.book_append_sheet(wb, ws, "Bills Report");
        const wbBlob = new Blob([XLSX.write(wb, { type: "array", bookType: "xlsx" })], { type: "application/octet-stream" });
        const url = URL.createObjectURL(wbBlob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "Bills-report.xlsx");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

    if (!clinics)return alert('No clinics');
    const filteredclinics=clinics.filter((clinic)=>{
      return clinic.fullname.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return(
        <div className="container">
            <h1 style={{textAlign:'center'}}>All Clinics</h1>
            <br></br>
            <br></br>
            <div className="container">
            <button className="btn-add" onClick={()=>navigate("/add-clinic")}>
                Add Clinic
            </button>
                <button
                    type="button"
                    className="btn-report"
                    onClick={()=>generateReport()}
                    >
                    Generate Report
                </button>
                <div className="search-bar">
                    <input
                    type="text"
                    placeholder="Search by Full Name"
                    value={searchTerm}
                    onChange={(e)=> setSearchTerm(e.target.value)}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Clinic No</th>
                            <th>Full Name</th>
                            <th>Type</th>
                            <th>Doctor Name</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredclinics.map(clinic => (
                            <tr key={clinic._id}>
                                <td>{clinic.clinicNo}</td>
                                <td>{clinic.fullname}</td>
                                <td>{clinic.type}</td>
                                <td>{clinic.doctorname}</td>
                                <td>{new Date(clinic.date).toISOString().slice(0,10)}</td>
                                <td>{clinic.location}</td>
                                <td>    
                                    <button type='button' className="btn-update" onClick={() => onUpdate(clinic)}>Update</button>
                                    &nbsp;
                                    <button type='button' className="btn-delete" onClick={() => onDelete(clinic._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )         
}
