import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddAppoinment from './components/AddAppoinment';
import AllAppoinments from './components/AllAppoinments';
// import Header from './components/Header';
import Register from './components/Register';
import UpdateAppoinment from './components/UpdateAppoinment';
import NavBar from './components/NavBar';
import Login from './components/Login';
import AddClinic from './components/AddClinic';
import AllClinics from './components/AllClinics';
import UpdateClinic from './components/UpdateClinic';
import AddEmployee from './components/AddEmployee';
import AllEmployees from './components/AllEmployees';
import UpdateEmployee from './components/UpdateEmployee';
import AddMedicine from './components/AddMedicine';
import AllMedicines from './components/AllMedicines';
import UpdateMedicine from './components/UpdateMedicine';


function App() {
  return (
    <Router>
      <div>
        {/* <Header/> */}
        {<NavBar/>}
        <Routes>
        <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/appoinments" element={<AllAppoinments/>}/>
          <Route path="/add-appoinment" element={<AddAppoinment/>}/>
          <Route path="/update-appoinment" element={<UpdateAppoinment/>}/>
          <Route path="/clinics" element={<AllClinics/>}/>
          <Route path="/add-clinic" element={<AddClinic/>}/>
          <Route path="/update-clinic" element={<UpdateClinic/>}/>
          <Route path="/employees" element={<AllEmployees/>}/>
          <Route path="/add-employee" element={<AddEmployee/>}/>
          <Route path="/update-employee" element={<UpdateEmployee/>}/>
          <Route path="/medicines" element={<AllMedicines />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
          <Route path="/update-medicine" element={<UpdateMedicine />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
