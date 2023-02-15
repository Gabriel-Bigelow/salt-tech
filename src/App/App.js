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
import ProductDetails from '../Components/Products/ProductDetails';

async function checkForLoggedIn (loggedIn, setLoggedIn) {
  if (!loggedIn) {
    const response = await fetch(`${baseURL}/users/me`, {
      credentials: 'include'
    });
    
    if (response.ok) {
      setLoggedIn(true);
    }
  }
}

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [focusedProduct, setFocusedProduct] = useState();

  useEffect(() => {
    checkForLoggedIn(loggedIn, setLoggedIn);
  }, [loggedIn])

  return (
    <Router>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      
      <div id="app-body">
        <Routes>
          <Route path="/" element={<Home/>} />

          <Route path="me" />

          <Route path="/products/:productId" element={<ProductDetails focusedProduct={focusedProduct} /> }/> 
          <Route path="/products" element={<Products setFocusedProduct={setFocusedProduct} />} />

          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
