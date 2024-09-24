import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import productContext from '../context/products/productContext';

const SellPackages = (props) => {
    const [product,setProduct] = useState({title:"", price:"",mainImage:[], description:""});
    const navigate = useNavigate();
    const context = useContext(productContext);
    const {addProduct} = context;
    const onChange = (e)=>{
        setProduct({...product, [e.target.name]: e.target.value})
    }
    const url="https://api.cloudinary.com/v1_1/dpabvbttn/auto/upload";
    const uploadFiles=async(file)=>{
        const formData=new FormData()
        formData.append('file',file)
        formData.append('upload_preset',"chat-app-file")
        const res=await fetch(url,{
            method:'post',
            body:formData
        })
        const resdata=await res.json();
        console.log(resdata)
        return resdata;
    }
    const handleUploadPhoto = async(e)=>{
        const file = e.target.files[0];
        const photos = product.mainImage;
        const photo = await uploadFiles(file);
        photos.push(photo.url);
        setProduct((preve)=>{
            return{
                ...preve,
                mainImage: photos
            }
        })
    }
    const handleSumbit = (e)=>{
        e.preventDefault();
        console.log(product.mainImage)
        addProduct(product.title,product.description,product.price,product.mainImage);
        props.showAlert("success","Successfully updated this product");
        navigate("/");
    }
  return (
    <div className="container mt-5 d-flex justify-content-center">
    <div className="rounded-4 " style={{height:"37rem",width:"23rem",backgroundColor:"#008fb3",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <h2 className='mt-5 mb-4' style={{color:"#000"}}>Sell Your Products</h2>
      <form onSubmit={handleSumbit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Product Name
        </label>
        <input
          type="text"
          className="form-control ipt"
          id="title"
          name="title"
          aria-describedby="emailHelp"
          onChange={onChange}
          required
          minLength={3}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="text"
          className="form-control ipt"
          id="price"
          name="price"
          aria-describedby="emailHelp"
          onChange={onChange}
          required
          minLength={3}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mainImage" className="form-label">Images</label>
        <input className="form-control ipt" type="file" id="mainImage" name="mainImage" required multiple onChange={handleUploadPhoto}/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control ipt" id="description" name="description" required rows="3" onChange={onChange}></textarea>
      </div>
      <button type="submit" className="btn" style={{width:"100%"}}>
        Upload Product
      </button>
    </form>
    </div>
  </div>
  )
}

export default SellPackages
