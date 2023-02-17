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
import Navbar from '../Components/Navbar/Navbar';
import Navlist from '../Components/Navlist/Navlist';
import Login from '../Components/Login/Login';
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

function changeLastSubdirectory (subs, newEndpoint, setNavLoc) {
  console.log(subs);
  const newSubs = subs[subs.length-1] = newEndpoint;

  setNavLoc(newSubs);
}

function App() {
  const [user, setUser] = useState();
  const [focusedProduct, setFocusedProduct] = useState();

  useEffect(() => {
    // checkForUser(user, setUser);
    // uncomment this later. Commented out to reduce fetch requests to Database
    // Supabase free account is limited to certain number of requests.
  }, [user]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      
      
      <div id="app-body" className='bg-color-salt-slate'>
        <Navlist focusedProduct={focusedProduct} />
        <Routes>
          <Route path="/" element={<Home/>} />

          <Route path="/account" element={<Account user={user} />}/>
          <Route path="/cart" element={<Cart />}/>

          <Route path="/products/:productId" element={<ProductDetails focusedProduct={focusedProduct} /> }/> 
          <Route path="/products" element={<Products setFocusedProduct={setFocusedProduct} />} />

          <Route path="/login" element={<Login setUser={setUser} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
