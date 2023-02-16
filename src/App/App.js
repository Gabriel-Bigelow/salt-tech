import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

import { baseURL } from '../config';

import Navbar from '../Components/Navbar/Navbar';
import Home from '../Components/Home/Home';
import Products from '../Components/Products/Products';
import ProductDetails from '../Components/Products/ProductDetails';
import Login from '../Components/Login/Login';
import Cart from '../Components/Cart/Cart.js'

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
    // checkForLoggedIn(loggedIn, setLoggedIn);
    // uncomment this later. Commented out to reduce fetch requests to Database
    // Supabase free account is limited to certain number of requests.
  }, [loggedIn]);

  return (
    <Router>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      
      <div id="app-body" className='bg-color-salt-slate'>
        <Routes>
          <Route path="/" element={<Home/>} />

          <Route path="/account" />
          <Route path="/cart" element={<Cart />}/>

          <Route path="/products/:productId" element={<ProductDetails focusedProduct={focusedProduct} /> }/> 
          <Route path="/products" element={<Products setFocusedProduct={setFocusedProduct} />} />

          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
