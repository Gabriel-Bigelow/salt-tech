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

function App() {
  const [user, setUser] = useState();
  const [focusedProduct, setFocusedProduct] = useState();

  useEffect(() => {

  }, [user])

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      
      <div id="app-body">
        <Routes>
          <Route path="/" element={<Home/>} />

          <Route path="me" />

          <Route path="/products/:productId" element={<ProductDetails focusedProduct={focusedProduct} /> }/> 
          <Route path="/products" element={<Products setFocusedProduct={setFocusedProduct} />} />

          <Route path="/login" element={<Login setUser={setUser} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
