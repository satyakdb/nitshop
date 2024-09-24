import React, { useContext, useEffect } from 'react'
import profile from "../images/profile.jpeg"
import productContext from '../context/products/productContext'
import { useNavigate } from 'react-router-dom';
const Profilebox = (props) => {
  const context = useContext(productContext);
  const {user, setCurUser} = context;
  useEffect(()=>{
    setCurUser(localStorage.getItem("token2"));
  },[])
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.removeItem("token2");
    props.showAlert("success", "Successfully Logged Out");
    navigate("/");
  }
  const viewprofile = ()=>{
    navigate("/viewprofile");
  }
  const yourproducts = ()=>{
    navigate("/yourproducts");
  }
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="rounded-5 " style={{height:"37rem",width:"22rem",backgroundColor:"#008fb3",display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"space-evenly"}}>
        <img src={profile} className="rounded-circle my-2"alt="Image" style={{height:"150px",width:"150px"}}/>
        <h3 style={{color:"#000"}}>{user.name}</h3>
        <button className='btn' style={{width:"80%"}} onClick={viewprofile}>View and Edit Profile</button>
        <div style={{width:"80%",backgroundColor:"#fff",height:"1px"}}></div>
        <div style={{fontSize:"1.3rem", cursor:"pointer"}} onClick={()=>{navigate("/sellpackages")}}><i className="fa-brands fa-sellcast me-2" style={{fontSize:"1.5rem"}}></i>Sell Packages</div>
        <div style={{fontSize:"1.3rem", cursor:"pointer"}} onClick={yourproducts}><i className="fa-brands fa-product-hunt me-2" style={{fontSize:"1.5rem"}}></i>Your Products</div>
        <div style={{width:"80%",backgroundColor:"#fff",height:"1px"}}></div>
        <button className='btn' style={{width:"80%"}} onClick={logout}>Log Out <i className="fa-solid fa-arrow-right-from-bracket ms-1"></i></button>
      </div>
    </div>
  )
}

export default Profilebox
