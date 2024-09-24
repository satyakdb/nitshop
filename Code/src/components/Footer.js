import React from 'react'

const Footer = () => {
  return (
    <div className='my-5 py-3 d-flex justify-content-center footer align-items-center' style={{backgroundColor: "#46424f"}}>
      <div className='d-flex'>
          <a href="https://www.facebook.com/" target="_blank"><i className="fa-brands fa-facebook"></i><div>Facebook</div></a>
          <a href="https://www.x.com/" target="_blank"><i className="fa-brands fa-twitter"></i><div>Twitter</div></a>
          <a href="https://www.github.com/" target="_blank"><i className="fa-brands fa-github"></i><div>GitHub</div></a>
          <a href="https://www.instagram.com/" target="_blank"><i className="fa-brands fa-instagram"></i><div>Instagram</div></a>
          <a href="https://www.linkedin.com/" target="_blank"><i className="fa-brands fa-linkedin-in"></i><div>LinkedIn</div></a>
      </div>
    </div>
  )
}

export default Footer
