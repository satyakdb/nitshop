import React from 'react'
import Main from './Main'
import Products from './Products'
import Footer from './Footer'

const Home = (props) => {
  return (
    <div>
      <Main/>
      <Products showAlert={props.showAlert}/>
      <Footer/>
    </div>
  )
}

export default Home
