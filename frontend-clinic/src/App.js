import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddClinic from './components/AddClinic';
import AllClinics from './components/AllClinics';
// import Header from './components/Header';
import Register from './components/Register';
import UpdateClinic from './components/UpdateClinic';
import NavBar from './components/NavBar';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        {/* <Header/> */}
        {<NavBar/>}
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/clinics" element={<AllClinics/>}/>
          <Route path="/add-clinic" element={<AddClinic/>}/>
          <Route path="/update-clinic" element={<UpdateClinic/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
