import React, { useContext, useEffect } from "react";
import productContext from "../context/products/productContext";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const context = useContext(productContext);
  const {
    cartproducts,
    getCartproducts,
    deleteCartproduct,
    setViewproduct,
    getSellerdetails,
    allproducts,
    getAllproducts,
  } = context;
  useEffect(() => {
    getCartproducts();
    getAllproducts();
  }, []);
  const navigate = useNavigate();
  const viewProduct = (product) => {
    setViewproduct(product);
    getSellerdetails(product.user);
    navigate("/viewproduct");
  };
  const deleteproduct = (id) => {
    deleteCartproduct(id);
    props.showAlert("success", "Successfully removed from Cart");
  };
  let price = 0;
  let flag;
  return (
    <div className="container">
      <h2 className="my-3" style={{ color: "#000" }}>
        Your Cart
      </h2>
      <div
        className="my-3"
        style={{ width: "100%", height: "1px", backgroundColor: "#000" }}
      ></div>
      <div className="container" style={{ textAlign: "center" }}>
        <div className="row">
          {cartproducts.length === 0 && (
            <h3 className="container">No products in Cart</h3>
          )}
          {cartproducts.map((element) => {
            price = price + element.price;
            flag = 0;
            for (let ind = 0; ind < allproducts.length; ind++) {
              if (element.product === allproducts[ind]._id) {
                flag = 1;
              }
            }
            return (
              <div
                className="col-xl-4 col-md-6 d-flex justify-content-center "
                key={element._id}
              >
                <div className="my-3">
                  <div className="card" style={{ width: "18rem" }}>
                    {(flag===0)&&<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      removed
                    </span>}
                    <img
                      src={element.mainImage[0]}
                      className="card-img-top px-2 py-2"
                      alt="Image"
                      style={{ height: "190px" }}
                    />
                    <div
                      className="card-body"
                      style={{ color: "rgb(230,230,256)" }}
                    >
                      <h4 className="card-title">{element.title}</h4>
                      <p>
                        <b>Price : </b>
                        {element.price}/-
                      </p>
                      <button
                        className="btn my-1"
                        style={{ width: "80%" }}
                        disabled = {(flag===0)? true : false}
                        onClick={() => {
                          viewProduct(element);
                        }}
                      >
                        View Product<i className="fa-solid fa-eye ms-2"></i>
                      </button>
                      <button
                        className="btn my-1"
                        style={{ width: "80%" }}
                        onClick={() => {
                          deleteproduct(element._id);
                        }}
                      >
                        Remove From Cart
                        <i className="fa-solid fa-trash-can ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="my-4"
        style={{ width: "100%", height: "1px", backgroundColor: "#000" }}
      ></div>
      <div
        className="pt-3 mb-4"
        style={{
          width: "100%",
          height: "7rem",
          borderRadius: "10px",
          backgroundColor: "#46424f",
          textAlign: "center",
        }}
      >
        <h3>
          <b>Items : </b>
          {cartproducts.length}
        </h3>
        <h3>
          <b>Total Price : </b>
          {price}/-
        </h3>
      </div>
    </div>
  );
};

export default Cart;
