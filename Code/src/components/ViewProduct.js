import React, { useContext } from 'react'
import productContext from '../context/products/productContext';
import profile from "../images/profile.jpeg"
const ViewProduct = () => {
    const context = useContext(productContext);
    const {viewproduct,seller} = context;
    let photos = [viewproduct.mainImage];
    if(Array.isArray(viewproduct.mainImage)){
        photos = viewproduct.mainImage;
    }
  return (
    <div className='container d-xl-flex justify-content-xl-around product'>
      <div className="viewproduct1 mt-4">
        <div id="carouselExample" className="carousel slide" >
            <div className="carousel-inner">
              {photos.map((element) => {
                return (
                    <div className="carousel-item active" key={element}>
                        <div style={{height: "100%"}}>
                            <img src={element} className="" alt="..." style={{height:"90%",width:"90%"}}/>
                        </div>
                    </div>
                );
              })}
            </div>
            <button className="carousel-control-prev d-flex align-self-center" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" style={{backgroundColor: "#1a1625",height:"70px",width:"30px",borderRadius:"5px"}}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next  d-flex align-self-center" type="button" data-bs-target="#carouselExample" data-bs-slide="next" style={{backgroundColor: "#1a1625",height:"70px",width:"30px",borderRadius:"5px"}}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        <div className="viewproduct12 mt-4">
            <h4 className='ms-3 my-3' style={{color:"#000", fontWeight:"bold"}}>Description</h4>
            <hr style={{color:"#000"}}/>
            <p className='ms-3'>{viewproduct.description}</p>
        </div>
      </div>
      <div className='mt-4 viewproduct2'>         
        <div className="viewproduct21">
            <h4 className='ms-3 my-3' style={{color:"#000", fontWeight:"bold"}}>Product Details</h4>
            <hr style={{color:"#000"}}/>
            <p className='ms-3'><b style={{color:"#000"}}>Product Name : </b> {viewproduct.title}</p>
            <p className='ms-3'><b style={{color:"#000"}}>Price : </b> {viewproduct.price}/-</p>
        </div>
        <div className="viewproduct22 mt-4 ">
            <h4 className='ms-3 my-3' style={{color:"#000", fontWeight:"bold"}}>Seller Details</h4>
            <hr style={{color:"#000"}}/>
            <div className="d-flex justify-content-center"style={{width:"100%"}}>
                <img src={profile} alt="Image" className="rounded-circle mb-3 align-self-center"style={{height:"110px",width:"110px"}}/>
            </div>
            <p className='ms-3'><b style={{color:"#000"}}>Name : </b>{seller.name}</p>
            <p className='ms-3'><b style={{color:"#000"}}>Phone no : </b>{seller.contact}</p>
        </div>
       </div>
    </div>
  )
}

export default ViewProduct
