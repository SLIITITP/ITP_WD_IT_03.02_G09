import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import XLSX from 'xlsx';
import '../styles/AllAppoinments.css'

export default function AllEmployees() {
    const[employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    let navigate = useNavigate();
    const getData = async () => {
        await axios.get("http://localhost:7001/employees")
        .then((res) => {            
            setEmployees(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const GenerateReport = () => {
        const XLSX = require("xlsx");
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(employees);
        XLSX.utils.book_append_sheet(wb, ws, "Employee Report");
        const wbBlob = new Blob([XLSX.write(wb, { type: "array", bookType: "xlsx" })], { type: "application/octet-stream" });
        const url = URL.createObjectURL(wbBlob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "Employee-report.xlsx");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

    

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:7001/employees/${id}`)
        .then(() => {
            alert("Employee Deleted Successfully")
            getData();
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    

    useEffect(() => {
        getData();
    }, [])

    if(!employees)
    return alert("No Employees")

    const onUpdate = (data) => {
        localStorage.setItem('id', data._id);
        localStorage.setItem('employeeno', data.employeeno);
        localStorage.setItem('fullname', data.fullname);
        localStorage.setItem('email', data.email);
        localStorage.setItem('position', data.position);

       
        localStorage.setItem('address', data.address);
        localStorage.setItem('contactnum', data.contactnum);

        navigate('/update-employee');
    }

    if(!employees) return alert ('No Employees');
    const filteredEmployees = employees.filter((employees) => {
        return employees.fullname.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return(
        <div className="container">
            <h1 style={{textAlign: 'center', fontFamily: 'cursive', fontSize: '50px'}}>All Employees</h1>
            <div className="container">
                <div>
                    <button className="button-add" onClick={() => navigate("/add-employee")}>
                        Add Employee
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
                            <th style={{ textAlign: 'center' }}>Employee No</th>
                            <th style={{ textAlign: 'center' }}>Full Name</th>
                            <th style={{ textAlign: 'center' }}>Email</th>
                            <th style={{ textAlign: 'center' }}>Position</th>
                         
                            
                            <th style={{ textAlign: 'center' }}>Address</th>
                            <th style={{ textAlign: 'center' }}>Contact Number</th>
                            <th style={{ textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {filteredEmployees.map(employee => (
                            <tr key={employee._id}>
                                <td style={{ textAlign: 'center' }}>{employee.employeeno}</td>
                                <td >{employee.fullname}</td>
                                <td>{employee.email}</td>
                                <td>{employee.position}</td>
                                <td>{employee.address}</td>
                                <td>{employee.contactnum}</td>
                                <td>    
                                    <button type='button' className="btn-update" onClick={() => onUpdate(employee)}>Update</button>
                                    &nbsp;
                                    <button type='button' className="btn-delete" onClick={() => onDelete(employee._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )         
}
