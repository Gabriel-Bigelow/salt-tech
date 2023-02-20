import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

import { baseURL } from '../config';

import Account from '../Components/Account/Account';
import Cart from '../Components/Cart/Cart.js'
import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login';
import Navbar from '../Components/Navbar/Navbar';
import Navlist from '../Components/Navlist/Navlist';
import Orders from '../Components/Orders/Orders';
import Products from '../Components/Products/Products';
import ProductDetails from '../Components/ProductDetails/ProductDetails';

async function checkForUser (user, setUser) {
  if (!user) {
    const response = await fetch(`${baseURL}/users/me`, {
      credentials: 'include'
    });
    
    if (response.ok) {
      setUser(true);
    }
  }
}

function App() {
  const [user, setUser] = useState();
  const [focusedProduct, setFocusedProduct] = useState();

  useEffect(() => {
    checkForUser(user, setUser);
  }, [user]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      
      
      <div id="app-body" className='bg-color-salt-slate'>
        <Navlist focusedProduct={focusedProduct} />
        <Routes>
          <Route path="/" element={<Home/>} />

          <Route path="/account" element={<Account user={user} setUser={setUser} />}/>
          <Route path="/account/orders" element={<Orders user={user} />} />
          <Route path="/cart" element={<Cart user={user} />}/>
          <Route path="/login" element={<Login setUser={setUser} />}/>
          <Route path="/products/:productId" element={<ProductDetails focusedProduct={focusedProduct} /> }/> 
          <Route path="/products" element={<Products setFocusedProduct={setFocusedProduct} />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
