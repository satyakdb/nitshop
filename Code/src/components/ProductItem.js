import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import productContext from '../context/products/productContext';

const ProductItem = (props) => {
    const {product, showAlert} = props;
    const navigate = useNavigate();
    const context = useContext(productContext);
    const {setViewproduct, getSellerdetails, user, addCartproduct, cartproducts, setCurUser} = context;
    const viewProduct = ()=>{
      if(localStorage.getItem("token2")){
        getSellerdetails(product.user);
        setViewproduct(product);
        navigate("/viewproduct");
      }
      else{
        navigate('/signin');
      }
    }
    const handleClick = ()=>{
      let flag=0;
      setCurUser(localStorage.getItem("token2"));
      for(let ind=0;ind<cartproducts.length;ind++){
        if(product._id === cartproducts[ind].product){
          flag=1;
        }
      }
      if(product.user === user._id){
        showAlert("warning","You can't add your product to Cart");
      }
      else if(flag){
        showAlert("warning","This product is already in your Cart");
      }
      else{
        addCartproduct(product.title,product.description,product.price,product.mainImage,product._id);
        showAlert("success","Successfully added to Cart");
      }
    }
  return (
    <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
            <img src={product.mainImage[0]} className="card-img-top px-2 py-2" alt="Image" style={{height:"190px"}}/>
            <div className="card-body" style={{color:"rgb(230,230,256)"}}>
                <h4 className="card-title">{product.title}</h4>
                <p><b>Price : </b>{product.price}/-</p>
                <button className='btn my-1' style={{width:"80%"}} onClick={viewProduct}>View Product<i className="fa-solid fa-eye ms-2"></i></button>
                <button className='btn my-1' style={{width:"80%"}} onClick={handleClick}>Add to Cart<i className="fa-solid fa-upload ms-2"></i></button>
            </div>
        </div>
      </div>
  )
}

export default ProductItem
