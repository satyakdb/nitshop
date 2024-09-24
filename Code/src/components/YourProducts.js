import React, { useContext, useEffect, useRef, useState } from 'react'
import productContext from '../context/products/productContext'
import { useNavigate } from 'react-router-dom';

const YourProducts = (props) => {
  const context = useContext(productContext);
  const ref = useRef(null);
  const refClose = useRef(null);
  const {userproducts, getUserproducts, deleteProduct, editProduct} = context;
  const { getCartproducts,getAllproducts,getAllcartproducts} = context;
  useEffect(()=>{
    getUserproducts();
    getCartproducts();
    getAllproducts();
    getAllcartproducts();
  },[]);
  const navigate = useNavigate();
  const {setViewproduct, getSellerdetails} = context;
    const viewProduct = (product)=>{
      if(localStorage.getItem("token2")){
        getSellerdetails(product.user);
        setViewproduct(product);
        navigate("/viewproduct");
      }
      else{
        navigate('/signin');
      }
    }
  const [product,setProduct] = useState({id:"",etitle:"",eprice:"",emainImage:"",edescription:""});
  const onChange = (e)=>{
    setProduct({...product, [e.target.name]: e.target.value});
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
      return resdata;
  }
  const handleUploadPhoto = async(e)=>{
      const file = e.target.files[0];
      const photos = product.emainImage;
      const photo = await uploadFiles(file);
      photos.push(photo.url);
      setProduct((preve)=>{
          return{
              ...preve,
              emainImage: photos
          }
      })
  }
  const updateProduct = (curProduct)=>{
    ref.current.click();
    setProduct({id: curProduct._id, etitle: curProduct.title, eprice: curProduct.price, emainImage: curProduct.mainImage, edescription: curProduct.description });
  }
  const handleClick = (e)=>{
    editProduct(product.id,product.etitle,product.edescription,product.eprice,product.emainImage);
    props.showAlert("success", "Updated Successfully!");
    refClose.current.click();
  };
  const deleteproduct = (id)=>{
    deleteProduct(id);
    props.showAlert("success","Removed this product Successfully!");
  }
  return (
    <div className='container' >
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content" style={{backgroundColor:"#1c8aa6"}}>
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Product</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form >
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control ipt"
                  id="etitle"
                  name="etitle"
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  required
                  minLength={3}
                  value={product.etitle}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="eprice" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  className="form-control ipt"
                  id="eprice"
                  name="eprice"
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  required
                  minLength={3}
                  value={product.eprice}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="emainImage" className="form-label">Images</label>
                <input className="form-control ipt" type="file" id="emainImage" name="emainImage" multiple onChange={handleUploadPhoto}/>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <textarea className="form-control ipt" id="edescription" name="edescription" required rows="3" onChange={onChange} value={product.edescription}></textarea>
              </div>
            </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn" data-bs-dismiss="modal"  ref={refClose} >Close</button>
                <button type="button" className="btn " onClick={handleClick}>Update Product</button>
            </div>
            </div>
        </div>
        </div>
      <h2 className="my-3" style={{color:"#000"}}>Your Products</h2>
      <div
        className="my-3"
        style={{ width: "100%", height: "1px", backgroundColor: "#000" }}
      ></div>
        <div className="container" style={{textAlign:"center"}}>
            <div className="row">
              {userproducts.length === 0 && <h3 className="container">Upload some Products to display</h3> }
              {userproducts.map((element) => {
                return (
                  <div className="col-xl-4 col-md-6 d-flex justify-content-center " key={element._id}>
                    <div className='my-3'>
                        <div className="card" style={{width: "18rem"}}>
                            <img src={element.mainImage[0]} className="card-img-top px-2 py-2" alt="Image" style={{height:"190px"}}/>
                            <div className="card-body" style={{color:"rgb(230,230,256)"}}>
                                <h4 className="card-title">{element.title}</h4>
                                <p><b>Price : </b>{element.price}/-</p>
                                <button className='btn my-1' style={{width:"86%"}} onClick={()=>{viewProduct(element)}}>View Product<i className="fa-solid fa-eye ms-2"></i></button>
                                <button className='btn my-1' style={{width:"41%"}} onClick={()=>{deleteproduct(element._id)}}>Remove<i className="fa-solid fa-trash-can ms-2"></i></button>
                                <button className='btn my-1 ms-3' style={{width:"41%"}} onClick={()=>{updateProduct(element)}}>Update<i className="fa-solid fa-pen-to-square ms-2"></i></button>
                            </div>
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
    </div>
  )
}

export default YourProducts
