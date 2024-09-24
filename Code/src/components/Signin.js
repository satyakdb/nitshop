import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import profile from "../images/profile.jpeg"
import productContext from '../context/products/productContext';
const Signin = (props) => {
    const [credentials,setCredentials] = useState({email:"",password:""});
    let navigate = useNavigate();
    const context = useContext(productContext);
    const {setCurUser} = context;
    const handleClick = ()=>{
        navigate("/signup");
    }
    const handleSumbit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5001/api/auth/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token2',json.authToken);
            props.showAlert("success", "Successfully Logged in");
            setCurUser(json.authToken);
            navigate('/');
        }
        else{
            props.showAlert("danger","Invalid Credentials");
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="rounded-5 " style={{height:"37rem",width:"22rem",backgroundColor:"#008fb3",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h2 className='mt-4' style={{color:"#000"}}>Login to continue</h2>
        <img src={profile} className="rounded-circle my-2"alt="Image" style={{height:"150px",width:"150px"}}/>
        <form onSubmit={handleSumbit}>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">
                Email address
            </label>
            <input
                type="email"
                className="form-control ipt"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                value={credentials.email}
                onChange={onChange}
                required
            />
            <div id="emailHelp" className="form-text" style={{color:"rgb(230,230,256)"}}>
                We'll never share your email with anyone else.
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="password" className="form-label">
                Password
            </label>
            <input
                type="password"
                className="form-control ipt"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
                minLength={5}
            />
            </div>
            <button type="submit" className="btn" style={{width:"100%"}}>
              Log in
            </button>
        </form>
        <div className='mt-4'>
            Are you to NIT-Store? <button className='btn ms-2' onClick={handleClick}>Join Us</button>
        </div>
      </div>
    </div>
  )
}

export default Signin
