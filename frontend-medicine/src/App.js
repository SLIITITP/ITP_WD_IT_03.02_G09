import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddMedicine from './components/AddMedicine';
import AllMedicines from './components/AllMedicines';
import UpdateMedicine from './components/UpdateMedicine';
import NavBar from './components/NavBar';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        {<NavBar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/medicines" element={<AllMedicines />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
          <Route path="/update-medicine" element={<UpdateMedicine />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
