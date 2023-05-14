import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddAppoinment from './components/AddAppoinment';
import AllAppoinments from './components/AllAppoinments';
// import Header from './components/Header';
import Register from './components/Register';
import UpdateAppoinment from './components/UpdateAppoinment';
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
          <Route path="/appoinments" element={<AllAppoinments/>}/>
          <Route path="/add-appoinment" element={<AddAppoinment/>}/>
          <Route path="/update-appoinment" element={<UpdateAppoinment/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
