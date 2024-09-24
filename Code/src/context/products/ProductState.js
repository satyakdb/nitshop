import React, { useState} from "react";
import ProductContext from "./productContext";
const ProductState = (props)=>{
    const [allproducts,setAllproducts] = useState([]);
    const [cartproducts,setCartproducts] = useState([]);
    const [allcartproducts,setAllcartproducts] = useState([]);
    const getAllproducts = async ()=>{
        const response = await fetch(`http://localhost:5001/api/products/getallproducts`,{
            method: 'GET',
        });
        const json = await response.json();
        setAllproducts(json);
    }
    const getAllcartproducts = async ()=>{
        const response = await fetch(`http://localhost:5001/api/cart/getallproducts`,{
            method: 'GET',
        });
        const json = await response.json();
        setAllcartproducts(json);
    }
    const [viewproduct,setViewproduct] = useState({});
    const [seller, setSeller] = useState({});
    const getSellerdetails = async (id)=>{
        const response = await fetch(`http://localhost:5001/api/products/getsellerdetails/${id}`,{
            method: 'POST',
        });
        const json = await response.json();
        setSeller(json);
    }
    const [user,setUser] = useState({});
    const setCurUser = async(token)=>{
        const response = await fetch('http://localhost:5001/api/auth/getuser',{
            method: 'POST',
            headers :{
                "auth-Token" : token,
            }
        })
        const json = await response.json();
        setUser(json);
    }
    const [userproducts,setUserproducts] = useState([]);
    const getUserproducts = async()=>{
        const response = await fetch('http://localhost:5001/api/products/fetchallproducts',{
            method: 'GET',
            headers :{
                "auth-Token" : localStorage.getItem("token2"),
            }
        })
        const json = await response.json();
        setUserproducts(json);
    }
    const deleteProduct = async(id)=>{
        const response = await fetch(`http://localhost:5001/api/products/deleteproduct/${id}`,{
          method: 'DELETE',
          headers:{
            'Content-Type' : 'application/json',
            'auth-token' : localStorage.getItem('token2')
          },
        });
        const json =  await response.json();
          let newProducts = userproducts.filter((product)=>{return product._id!==id});
          setUserproducts(newProducts);
          newProducts = allproducts.filter((product)=>{return product._id!==id});
          setAllproducts(newProducts);
    };
    const addProduct = async (title,description,price,mainImage)=>{
        const response = await fetch(`http://localhost:5001/api/products/addproduct`,{
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json',
          'auth-token' : localStorage.getItem('token2')
        },
        body: JSON.stringify({title,description,price,mainImage})
      });
      const json = await response.json();
      setAllproducts(allproducts.concat(json));
      setUserproducts(userproducts.concat(json));
    };
    const editProduct = async (id,title,description,price,mainImage)=>{
        const response = await fetch(`http://localhost:5001/api/products/updateproduct/${id}`,{
          method: 'PUT',
          headers:{
            'Content-Type' : 'application/json',
            'auth-token' : localStorage.getItem('token2')
          },
          body: JSON.stringify({title,description,price,mainImage})
        });
        const json = await response.json();
        const newProducts = JSON.parse(JSON.stringify(userproducts));
        for(let ind=0; ind<newProducts.length; ind++){
            const element = newProducts[ind];
            if(element._id === id){
                newProducts[ind].title = title;
                newProducts[ind].description = description;
                newProducts[ind].price = price;
                newProducts[ind].mainImage = mainImage;
                break;
            }
        }
        setUserproducts(newProducts);
        const newProducts1 = JSON.parse(JSON.stringify(allproducts));
        for(let ind=0; ind<newProducts1.length; ind++){
            const element = newProducts1[ind];
            if(element._id === id){
                newProducts1[ind].title = title;
                newProducts1[ind].description = description;
                newProducts1[ind].price = price;
                newProducts1[ind].mainImage = mainImage;
                break;
            }
        }
        setAllproducts(newProducts1);
        for(let ind=0;ind<allcartproducts.length;ind++){
            if(id === allcartproducts[ind].product){
                updateCartProduct(allcartproducts[ind]._id,allcartproducts[ind].title,allcartproducts[ind].description,allcartproducts[ind].price,allcartproducts[ind].mainImage);
            }
        }
    };
    const getCartproducts = async()=>{
        const response = await fetch('http://localhost:5001/api/cart/fetchcartproducts',{
            method: 'GET',
            headers :{
                "auth-Token" : localStorage.getItem("token2"),
            }
        })
        const json = await response.json();
        setCartproducts(json);
    }
    const deleteCartproduct = async(id)=>{
        const response = await fetch(`http://localhost:5001/api/cart/deleteproduct/${id}`,{
            method: 'DELETE',
            headers:{
              'Content-Type' : 'application/json',
              'auth-token' : localStorage.getItem('token2')
            },
          });
          const json =  await response.json();
          let newProducts = cartproducts.filter((product)=>{return product._id!==id});
          setCartproducts(newProducts);
    }
    const addCartproduct = async(title,description,price,mainImage,id)=>{
        const response = await fetch(`http://localhost:5001/api/cart/addproduct`,{
            method: 'POST',
            headers:{
              'Content-Type' : 'application/json',
              'auth-token' : localStorage.getItem('token2')
            },
            body: JSON.stringify({title,description,price,mainImage,id})
          });
          const json = await response.json();
          setCartproducts(cartproducts.concat(json));
    }
    const updateCartProduct = async (id,title,description,price,mainImage)=>{
        const response = await fetch(`http://localhost:5001/api/cart/updateproduct/${id}`,{
            method: 'PUT',
            headers:{
              'Content-Type' : 'application/json',
              'auth-token' : localStorage.getItem('token2')
            },
            body: JSON.stringify({title,description,price,mainImage})
        });
        const json = await response.json();
        const newProducts = JSON.parse(JSON.stringify(cartproducts));
        for(let ind=0; ind<newProducts.length; ind++){
            const element = newProducts[ind];
            if(element._id === id){
                newProducts[ind].title = title;
                newProducts[ind].description = description;
                newProducts[ind].price = price;
                newProducts[ind].mainImage = mainImage;
                break;
            }
        }
        setCartproducts(newProducts);
    }
    return (
        <ProductContext.Provider value={{getAllproducts,allproducts,setViewproduct,viewproduct,seller,getSellerdetails,user,setUser, setCurUser, userproducts, getUserproducts, deleteProduct, addProduct, editProduct, cartproducts, getCartproducts, deleteCartproduct, addCartproduct, getAllcartproducts}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState;