import React from 'react'
import './Footer.css'
import Atelierlogo from '../../assets/Atelier-logo-nav.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
const items = [
    {name : "Collections",href : "/Collections"},
    {name : "Rings",href : "/Rings"},
    {name : "Earings",href : "/Earings"},
    {name : "Necklace",href : "/Necklace"},
    {name : "Bracelets",href : "/Bracelets"},
    {name : "Broochers",href : "/Broochers"},

]


function Footer() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoldRates = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/gold-rates`);
        setRates(res.data);         
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gold rates:", error);
        setLoading(false);
      }
    };

    fetchGoldRates();
  }, []);
  return (
   <>
    <div className='footer'>
      <div className='logo-footer'>
       {/* <img src={Atelierlogo} alt="Atelier" height={"70px"} style={{marginTop:"10px"}}/> */}
       <div>
       <h1>Atelier</h1>
       <p>Jewellery</p>
       </div>
       <div className="policy">
        <p>Privacy Policy</p>
        <p>Return Policy</p>
        <p>Refund Policy</p>
       </div>
      </div>

      <div className='Catalog-footer'>
        <h1>Catalogs</h1>
        <div className='catalog-item' >
      {items.map((data,index)=>(
            <a href={data.href} key={index} style={{color:"white",textDecorationLine:"none",fontSize:"15px",marginTop:"10px"}}>{data.name}</a>
      ))}
        </div>
    </div>

    <div className='Contact-footer'>
        <h1>Contacts</h1> 
       <div className="contact-item">
       <a style={{marginBottom:"15px"}}><i className="bi bi-telephone me-3"></i>+91 98765 65432</a>
        <a style={{marginBottom:"15px",display:'flex'}}><i className="bi bi-geo-alt me-3"></i><span style={{display:"block"}}>28, 1&2, 771, Dr Rajendra Prasad Rd,<br />Gandhipuram, Tamil Nadu <br />641012</span></a>
        <a style={{marginBottom:"15px"}}><i className="bi bi-envelope me-3"></i>contactus@example.com</a>
       </div>
    </div>
    </div>
    {/* <footer className="bg-white border-top text-center py-2">
        <small className="text-muted">
          © {new Date().getFullYear()} Jewelry. All rights reserved to{" "}
          <a href="#" style={{ textDecoration: "none" }}>Atelier</a>
          .
        </small>
      </footer> */}
      <footer className="bg-white border-top py-2 px-3 d-flex justify-content-between align-items-center flex-column flex-md-row text-center text-md-start">
      {/* Left side - gold rates */}
      <div className="text-muted small mb-1 mb-md-0">
        {!loading ? (
          <>
            18k - Gram:<span className="text-primary"> ₹{rates[0]?.ratePerGram || '-'} </span>Poun:<span className="text-primary"> ₹{rates[2]?.ratePerPoun || '-'} </span> &nbsp;|&nbsp;
            22k - Gram:<span className="text-primary"> ₹{rates[1]?.ratePerGram || '-'} </span>Poun:<span className="text-primary"> ₹{rates[2]?.ratePerPoun || '-'} </span> &nbsp;|&nbsp;
            24k- Gram:<span className="text-primary"> ₹{rates[2]?.ratePerGram || '-'} </span>Poun:<span className="text-primary"> ₹{rates[2]?.ratePerPoun || '-'} </span>
          </>
        ) : (
          <span>Loading gold rates...</span>
        )}
      </div>

      {/* Right side - copyright */}
      <small className="text-muted">
        © {new Date().getFullYear()} Jewelry. All rights reserved to{' '}
        <a href="#" style={{ textDecoration: 'none' }}>Atelier</a>.
      </small>
    </footer>
       </>
  )
}

export default Footer
