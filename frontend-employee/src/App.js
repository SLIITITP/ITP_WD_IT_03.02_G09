import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
import AllEmployees from './components/AllEmployees';
// import Header from './components/Header';
import Register from './components/Register';
import UpdateEmployee from './components/UpdateEmployee';
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
          <Route path="/employees" element={<AllEmployees/>}/>
          <Route path="/add-employee" element={<AddEmployee/>}/>
          <Route path="/update-employee" element={<UpdateEmployee/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
