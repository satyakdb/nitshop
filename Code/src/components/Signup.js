import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import productContext from '../context/products/productContext';

const Signup = (props) => {
    const [credentials,setCredentials] = useState({name:"", email:"",password:"", confirmpassword:"", contact:""});
    let navigate = useNavigate();
    const context = useContext(productContext);
    const {setCurUser} = context;
    const handleSumbit = async (e)=>{
        e.preventDefault();
        if(credentials.password === credentials.confirmpassword){
        const response = await fetch("http://localhost:5001/api/auth/createuser",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, contact: credentials.contact})
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token2',json.authToken);
            props.showAlert("success", "Account created Successfully!");
            setCurUser(json.authToken);
            navigate('/');
        }
        else{
            props.showAlert("danger","Invalid Credentials");
        }
      }
      else{
        props.showAlert("danger","Please match your password and confirm password");
      }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="rounded-5 " style={{height:"37rem",width:"22rem",backgroundColor:"#008fb3",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h2 className='mt-4 mb-3' style={{color:"#000"}}>Signup to continue</h2>
        <form onSubmit={handleSumbit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control ipt"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
            minLength={3}
          />
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control ipt"
            id="email"
            name="email"
            aria-describedby="emailHelp"
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
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control ipt"
            id="confirmpassword"
            name="confirmpassword"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">
            Mobile Number
          </label>
          <input
            type="number"
            className="form-control ipt"
            id="contact"
            name="contact"
            onChange={onChange}
            required
            length={10}
          />
        </div>
        <button type="submit" className="btn" style={{width:"100%"}}>
          Sign Up
        </button>
      </form>
      </div>
    </div>
  )
}

export default Signup
