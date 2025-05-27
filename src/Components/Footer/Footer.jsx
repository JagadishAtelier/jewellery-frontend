import React from 'react'
import './Footer.css'
import Atelierlogo from '../../assets/Atelier-logo-nav.png'
import QrImage from '../../assets/QR.webp'
import { useEffect, useState } from 'react';
import footerImage1 from '../../assets/footerImage1.png'
import footerImage2 from '../../assets/footerImage2.webp'
import axios from 'axios';
const informationSub = [
    {name : "Home",href : "/"},
    {name : "Best Sellers",href : "/best-sellers"},
    {name : "About-Us",href : "/about-us"},
    {name : "Find-Us",href : "/find-us"},
]
const jewellerySub = [
  {name : "Rings",href : "#"},
  {name : "Necklace",href : "#"},
  {name : "Earrings",href : "#"},
  {name : "Chains",href : "#"},
  {name : "Silver",href : "#"},
]
const collectionSub = [
  {name : "Likes",href : "/likes"},
  {name : "Cart",href : "/cart"},
]


const contactUs = [
  {name : "1111-222-3333",href : "#"},
  {name : "Write to Us",href : "#"},
  {name : "Chat with us",href : "#"},
  {name : "Whatsapp Chat with us",href : "#"},
  {name : "+91 12345 67890",href : "#"},
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
    <img src={footerImage1} className='top-curve'/>
    <img src={footerImage2} className='bottom-curve'/>
      <div className='logo-footer'>
       {/* <img src={Atelierlogo} alt="Atelier" height={"70px"} style={{marginTop:"10px"}}/> */}
       <div className='footer-jewellery-content'>
          <h3>Jewellery</h3>
          {jewellerySub.map((sub)=>(
        <div className='footer-sub-heading'>
          <a href={sub.href}>{sub.name}</a>
        </div>
       ))}
       </div>
      </div>
      <div className='footer-jewellery-content'>
        <h3>Usefull Links</h3>
        {collectionSub.map((sub)=>(
          <div className='footer-sub-heading'>
            <a href={sub.href}>{sub.name}</a>
          </div>
        ))}
      </div>

      <div className='footer-jewellery-content'>
        <h3>Information</h3>
        {informationSub.map((sub)=>(
          <div className='footer-sub-heading'>
            <a href={sub.href}>{sub.name}</a>
          </div>
        ))}
      </div>
      
      <div className='footer-jewellery-content'>
    <div className='footer-jewellery-content'>
        <h3>Contacts</h3> 
       {contactUs.map((sub)=>(
        <div className='footer-sub-heading'>
          <a href={sub.href}>{sub.name}</a>
        </div>
       ))}
    </div>
      </div>

      <div className='footer-jewellery-content'>
        <h3 className='download-content'>Download the Mia app for exclusive offers!</h3>
        <img src={QrImage} className='QR-image'/>
        <div className='social-icon'>
          <h3 className='social'>Social</h3>
          <i class="bi bi-instagram"></i>
          <i class="bi bi-twitter-x"></i>
          <i class="bi bi-facebook"></i>
          <i class="bi bi-linkedin"></i>
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
