import React, { useContext, useEffect } from 'react'
import productContext from '../context/products/productContext';
import ProductItem from './ProductItem';

const Products = (props) => {
    const context = useContext(productContext);
    const {allproducts,getAllproducts} = context;
    useEffect(()=>{
        getAllproducts();
    },[]);
  return (
    <div style={{textAlign:"center"}} className='container'>
      <h2 style={{color:"#000"}}>Fresh Recomendation</h2>
      <div className="my-3"style={{height:"3px", backgroundColor:"rgb(0,0,0)"}}></div>
      <div className="container">
            <div className="row">
            {allproducts.length === 0 && <h3 className="container">No Products to display</h3> }
              {allproducts.map((element) => {
                return (
                  <div className="col-xl-4 col-md-6 d-flex justify-content-center " key={element._id}>
                    <ProductItem product={element} showAlert={props.showAlert}/>
                  </div>
                );
              })}
            </div>
          </div>
    </div>
  )
}

export default Products
