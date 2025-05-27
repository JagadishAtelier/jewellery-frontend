import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentRoute.css';

function PaymentRoute() {
  const { state: product } = useLocation(); // Get the data passed through navigate
  const navigate = useNavigate();

  return (
    <div className="payment-route-container">
      <div className="product-details">
        <h4>{product?.price.toLocaleString('en-IN')}</h4>
        <p>{product?.name}</p>
        <div className='vertical-line'></div>
        <p>Weight : {product?.weight}</p>
        <p>karat : {product?.karat}</p>
        <div className='vertical-line'></div>
      </div>

      {/* You can now access the product details here */}
      <button onClick={() => navigate('/payment-page', { state: product })} className='payment-btn'>
        Continue
      </button>
    </div>
  );
}

export default PaymentRoute;
