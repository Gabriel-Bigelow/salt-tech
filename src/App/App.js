import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login';
import { useEffect, useState } from 'react';
import { baseURL } from '../config';
import Products from '../Components/Products/Products';

function App() {
  const [user, setUser] = useState();

  // console.log(user);
  // console.log('user is above')

  return (
    <Router>
      <Navbar/>
      
      <div id="app-body">
        <Routes>
          <Route path="/" element={<Home/>} />

          <Route path="me" />

          <Route path="/products" element={<Products />} />

          <Route path="/login" element={<Login setUser={setUser} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
