import React, { useState } from 'react';
import './ProductDelevery.css';
import delevery from '../../../assets/availability-check-pdp.svg';

function ProductDelevery() {
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');

  const handleCheck = () => {
    if (pincode.trim() === '') {
      setMessage('Please enter a valid pincode');
    } else {
      setMessage(`✅ Delivery is available for ${pincode}`);
    }
  };

  return (
    
    <div className="delevery-card">
      <div className="delevery-header">
        <img src={delevery} alt="delivery" />
        <span>Delivery Details</span>
      </div>

      <div className="delivery-form">
        <div className="country-select">
          <img src="https://flagcdn.com/w40/in.png" alt="India" />
          <span>IN <i className="bi bi-chevron-down"></i></span>
        </div>
        <input
          type="text"
          className="pincode-input"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button className="check-ava-btn" onClick={handleCheck}>Check Availability</button>
      </div>

      {/* Show message conditionally */}
      {message && <p className="delivery-message">{message}</p>}
    </div>
  );
}

export default ProductDelevery;
