import React from 'react'
import store1 from "../images/Designer.jpeg"
const Main = () => {
  return (
    <div className='d-flex-column d-lg-flex ps-3 my-5 container'>
      <div className='me-4'>
        <h2 style={{color:"#000", marginTop:'90px',fontSize:'60px',fontWeight:'bold'}}>NIT-STORE</h2>
        <h3 style={{color:"#000"}}>Shop now, Love Forever!</h3>
        <p className='mt-4' style={{color:"#000",fontSize:'20px',fontStyle:'oblique '}}>
            NIT Store is an online platform that will help the students of a college to buy and sell their belongings conveniently. It will be secure and one stop market place for all the students of a college. <br />
            This Website is to make the process of selling the things by the passout batch(mainly) to their juniors. It will be medium that eliminates the difficulty in selling or buying items in a college.
        </p>
      </div>
      <img src={store1} alt="Image" className="d-none d-sm-block my-lg-0 mt-4"style={{height: '570px', width:"700px",borderRadius:"50%"}}/>
    </div>
  )
}

export default Main
