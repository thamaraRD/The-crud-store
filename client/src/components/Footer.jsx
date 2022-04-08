import React from 'react'

export const Footer = () => {

  return (
    <div>
      <footer className='fixed-bottom bg-dark'>
      <h5 className='text-white text-center mt-2 mb-2'>Thamara Ramos Defitt.
      Contáctame ❤️</h5>
      <div className='row'>
    <div className='justifify-content-center align-items-center text-center mb-2'>
          <a target="_blank" className="text-decoration-none" href="https://www.linkedin.com/in/thamara-ramos-deffitt/" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x ms-5 text-primary"></i>
          </a>
          <a target="_blank" className="text-decoration-none" href="mailto:rdthata@gmail.com" rel="noopener noreferrer">
              <i className="fa-solid fa-envelope fa-2x ms-5 text-warning"></i>
          </a>
          <a target="_blank" className="text-decoration-none" href="https://github.com/thamaraRD" rel="noopener noreferrer">
              <i className="fab fa-github fa-2x ms-5 text-info"></i>
          </a>
    </div>
      </div>
    </footer>
    </div>
  )
};
