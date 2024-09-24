import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from './Alert';
const Navbar = (props) => {
  const navigate = useNavigate();
  const Cart = (e)=>{
    e.preventDefault(); 
    if(localStorage.getItem("token2")){
      navigate("/cart");
    }
    else{
      navigate("/signin");
    }
  }
  const profile = (e)=>{
    e.preventDefault(); 
    if(localStorage.getItem("token2")){
      navigate("/profilebox");
    }
    else{
      navigate("/signin");
    }
  }
  return (
    <div className='fixed-top'>
      <nav className="navbar navbar-expand-lg" >
        <div className="container-fluid">
            <Link className="navbar-brand ms-lg-5 ms-3" to="/" style={{fontWeight:"700",fontSize:"1.5rem",color:"#000"}}>NIT <span style={{color:"#000"}}>Store</span> </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{color:"#9171f8", backgroundColor:"#a688fa" }}>
            <span className="navbar-toggler-icon" style={{backgroundColor:"#241ed6"}}></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <form className="d-flex align-items-center ">
            <ul className="navbar-nav me-auto my-2 my-lg-0 ">
                <li className='mx-3'>
                    <button className="d-flex" onClick={Cart} style={{fontSize: "1.6rem", border:"none", color:"#000",backgroundColor:"transparent"}}><i className="fa-solid fa-cart-shopping" ></i><p className='d-block d-lg-none ms-2' style={{fontSize:"1rem"}}>Cart</p></button>
                </li>
                <li className='mx-3'> 
                    <button className='d-flex' onClick={profile} to="/" style={{fontSize: "1.6rem", border:"none", color:"#000",backgroundColor:"transparent"}}><i className="fa-solid fa-user"></i><p className='d-flex d-lg-none ms-2 align-self-center' style={{fontSize:"1rem"}}>Profile</p></button>
                </li>
            </ul>
            </form>
            </div>
        </div>
        </nav>
        <Alert alert={props.alert}/>
    </div>
  )
}

export default Navbar
