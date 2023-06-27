import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PDFDocument } from "pdf-lib";
import '../styles/AllAppoinments.css'


export default function AllAppoinments() {
    const[appoinments, setAppoinments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    let navigate = useNavigate();
    const getData = async () => {
        await axios.get("http://localhost:5001/appoinments")
        .then((res) => {            
            setAppoinments(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const appointments = [
        { appoinmentNo:'1',PatientName:'Nila',date: '2023-05-15', time: '10:00 AM',email:'Thuvaaju@gmail.com', description: 'Appointment 1' },
        { appoinmentNo:'2',PatientName:'Ayingaran', date: '2023-06-16', time: '10:00 AM',email:'Thuvaaju@gmail.com', description: 'Appointment 2' },
        { appoinmentNo:'3',PatientName:'Sharuk', date: '2023-07-15', time: '12:00 AM', email:'Thuvaaju@gmail.com',description: 'Appointment 3' },
        { appoinmentNo:'4',PatientName:'Shanoojan', date: '2023-08-23', time: '8:00 AM',email:'Thuvaaju@gmail.com', description: 'Appointment 4' },
        { appoinmentNo:'5',PatientName:'Venujan', date: '2023-09-15', time: '11:00 AM',email:'Thuvaaju@gmail.com', description: 'Appointment 5' },
        { appoinmentNo:'6',PatientName:'Abiramy', date: '2023-10-25', time: '5:00 AM',email:'Thuvaaju@gmail.com' ,description: 'Appointment 6' },
        { appoinmentNo:'7',PatientName:'Abilaxshan', date: '2023-11-27', time: '6:00 AM',email:'Thuvaaju@gmail.com', description: 'Appointment 7' },
        { appoinmentNo:'8',PatientName:'Thusithan', date: '2023-12-29', time: '7:00 AM',email:'Thuvaaju@gmail.com', description: 'Appointment 8' },
        // Add more appointment objects as needed
      ];
      
    
      const GenerateReport = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
      
        // Modify this part according to your desired format
        appointments.forEach((appointment, index) => {
            const text = `Appointment ${index + 1}: Date - ${appointment.date}, Time - ${appointment.time}, Description - ${appointment.description}`;
            page.drawText(text, { x: 50, y: 700 - index * 20, size: 10 });
          });
      
        const pdfBytes = await pdfDoc.save();
      
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
      
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Appointment-report.pdf';
        link.style.display = 'none';
      
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

    

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:5001/appoinments/${id}`)
        .then(() => {
            alert("Appoinment Deleted Successfully")
            getData();
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    

    useEffect(() => {
        getData();
    }, [])

    if(!appoinments)
    return alert("No Appoinments")

    const onUpdate = (data) => {
        localStorage.setItem('id', data._id);
        localStorage.setItem('appoinmentno', data.appoinmentno);
        localStorage.setItem('fullname', data.fullname);
        localStorage.setItem('email', data.email);
        localStorage.setItem('doctorname', data.doctorname);
        localStorage.setItem('date', data.date);
        localStorage.setItem('time', data.time);
        localStorage.setItem('location', data.location);
        localStorage.setItem('condition', data.condition);

        navigate('/update-appoinment');
    }

    if(!appoinments) return alert ('No Appointments');
    const filteredAppointments = appoinments.filter((appoinments) => {
        return appoinments.fullname.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return(
        <div className="container">
            <h1 style={{textAlign: 'center', fontFamily: 'cursive', fontSize: '50px'}}>All Appointment Details</h1>
            <div className="container">
                <div>
                    <button className="button-add" onClick={() => navigate("/add-appoinment")}>
                        Add Appoinments
                    </button>
                </div>
                  <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by Patient Name"
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
                            <th style={{ textAlign: 'center' }}>Appoinment No</th>
                            <th style={{ textAlign: 'center' }}>Patient Name</th>
                            <th style={{ textAlign: 'center' }}>Email</th>
                            <th style={{ textAlign: 'center' }}>Doctor Name</th>
                            <th style={{ textAlign: 'center' }}>Date</th>
                            <th style={{ textAlign: 'center' }}>Time</th>
                            <th style={{ textAlign: 'center' }}>Location</th>
                            <th style={{ textAlign: 'center' }}>Condition</th>
                            <th style={{ textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {filteredAppointments.map(appoinment => (
                            <tr key={appoinment._id}>
                                <td style={{ textAlign: 'center' }}>{appoinment.appoinmentno}</td>
                                <td >{appoinment.fullname}</td>
                                <td>{appoinment.email}</td>
                                <td>{appoinment.doctorname}</td>
                                <td>{new Date(appoinment.date).toISOString().slice(0,10)}</td>
                                <td>{appoinment.time}</td>
                                <td>{appoinment.location}</td>
                                <td>{appoinment.condition}</td>
                                <td>    
                                    <button type='button' className="btn-update" onClick={() => onUpdate(appoinment)}>Update</button>
                                    &nbsp;
                                    <button type='button' className="btn-delete" onClick={() => onDelete(appoinment._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )         
}
