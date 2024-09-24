import React, { useContext, useEffect, useRef, useState } from 'react'
import productContext from '../context/products/productContext'

const ViewProfile = (props) => {
    const context = useContext(productContext);
    const {user, setCurUser} = context;
    useEffect(()=>{
        setCurUser(localStorage.getItem("token2"));
    });
    
    const ref = useRef(null);
    const refClose = useRef(null);
    const [euser,seteUser] = useState({id:"",ename: "",econtact: ""});
    const editUser = async(id,name,contact)=>{
        const response = await fetch(`http://localhost:5001/api/auth/updateuser/${id}`,{
            method: 'PUT',
            headers:{
              'Content-Type' : 'application/json',
              'auth-token' : localStorage.getItem('token2')
            },
            body: JSON.stringify({name,contact})
        });
        const json = await response.json();
    }
  const handleClick = (e)=>{
    editUser(euser.id, euser.ename, euser.econtact);
    props.showAlert("success", "Updated Successfully!");
    refClose.current.click();
  };
  const onChange = (e)=>{
      seteUser({...euser, [e.target.name]: e.target.value})
  }
  const updateUser = (currentUser) => {
    ref.current.click();
    seteUser({id: currentUser._id,ename: currentUser.name, econtact: currentUser.contact});
  };
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="rounded-5 " style={{height:"27rem",width:"22rem",backgroundColor:"#008fb3",display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"space-evenly"}}>
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content" style={{backgroundColor:"#1c8aa6"}}>
            <div className="modal-header">
                <h1 className="modal-title fs-5 " id="exampleModalLabel">Edit Profile</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                <label htmlFor="ename" className="form-label">
                    User Name
                </label>
                <input
                    type="text"
                    className="form-control ipt"
                    id="ename"
                    name="ename"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    required
                    minLength={3}
                    value={euser.ename}
                />
                </div>
                <div className="mb-3">
                <label htmlFor="econtact" className="form-label">
                    Mobile Number
                </label>
                <input
                    type="number"
                    className="form-control ipt"
                    id="econtact"
                    name="econtact"
                    onChange={onChange}
                    required
                    length={10}
                    value={euser.econtact}
                />
                </div>
            </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn" data-bs-dismiss="modal"  ref={refClose} >Close</button>
                <button type="button" className="btn " onClick={handleClick}>Update Profile</button>
            </div>
            </div>
        </div>
        </div>
        <h3 style={{color:"#000"}}>Your Details</h3>
        <div style={{width:"80%",height:"2px",backgroundColor:"#000"}}></div>
        <p><b>Name : </b>{user.name}</p>
        <p><b>Email : </b>{user.email}</p>
        <p><b>Mobile No : </b>{user.contact}</p>
        <button className='btn my-1 ms-3' style={{width:"80%"}} onClick={()=>{updateUser(user)}}>Edit Profile<i className="fa-solid fa-pen-to-square ms-2"></i></button>
        </div>
    </div>
  )
}

export default ViewProfile
