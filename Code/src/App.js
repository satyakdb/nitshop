import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import ProductState from './context/products/ProductState';
import productContext from './context/products/productContext';
import ViewProduct from './components/ViewProduct';
import Signin from './components/Signin';
import Cart from './components/Cart';
import Profilebox from './components/Profilebox';
import Signup from './components/Signup';
import YourProducts from './components/YourProducts';
import ViewProfile from './components/ViewProfile';
import SellPackages from './components/SellPackages';
const App = () => {
  const [alert , setAlert] = useState(null);
  const showAlert = (type , message) =>{
    setAlert({
      type : type ,
      msg : message
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
      <ProductState>
        <Router>
          <Navbar alert={alert}/>
          <div style={{height:"3.92rem",backgroundColor:"white"}}></div>
          <div className="">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/viewproduct" element={<ViewProduct/>} />
              <Route exact path="/signin" element={<Signin showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
              <Route exact path="/cart" element={<Cart showAlert={showAlert}/>} />
              <Route exact path="/profilebox" element={<Profilebox showAlert={showAlert}/>} />
              <Route exact path="/viewprofile" element={<ViewProfile showAlert={showAlert}/>} />
              <Route exact path="/yourproducts" element={<YourProducts showAlert={showAlert}/>} />
              <Route exact path="/sellpackages" element={<SellPackages showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </ProductState>
    </>
  )
}

export default App
