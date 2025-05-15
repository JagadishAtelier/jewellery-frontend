import React, { useState, useEffect } from 'react';
import './CartPage.css';
import deleveryImage from '../../assets/availability-check-pdp.svg';
import warantyImages from '../../assets/TATA.svg';
import warantyImages1 from '../../assets/bis.svg';
import warantyImages2 from '../../assets/0ne-year-waranty.svg';
import Navbar from '../Navbar/Navbar';
import { useCart } from '../CartContext/CartContext';
import { useLocation, useNavigate } from 'react-router-dom'; 

const images = [warantyImages, warantyImages1, warantyImages2];

function CartPage() {
  const [showPincodeInput, setShowPincodeInput] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const togglePincode = () => setShowPincodeInput((prev) => !prev);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const { cartItems } = useCart(); // ✅ getting cart items from context
  const { state: product } = useLocation();
  const navigate = useNavigate();


  const products = cartItems[0];
  const productPrice = products?.price || 0;
  const formattedPrice = productPrice.toLocaleString('en-IN');

  const paymentData = [
    { label: 'Sub Total', value: `₹ ${product.price.toLocaleString('en-IN')}` },
    { label: 'You Saved', value: '– ₹ 0', className: 'green-text' },
    { label: 'Discount', value: '– ₹ 0' },
    { label: 'Delivery Charge', value: 'FREE' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setAnimate(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className='cart-page-container'>
        <h1 className='header-text'>Cart</h1>
        <div className='cart-page'>
          <div className='cart-left'>
            <div className="delevery-availability-div">
              <div className="availability-left">
                <div className="delevery-image-heading">
                  <img src={deleveryImage} alt="delivery" />
                  <h5>Check Availability</h5>
                </div>
                {showPincodeInput && (
                  <div className="pincode-input-section">
                    <div className="country-select">
                      <img src='https://flagcdn.com/w40/in.png'/>
                      <select>
                        <option value="IN">IN</option>
                      </select>
                    </div>
                    <input type="text" placeholder="Pincode" style={{padding:"-2px !important"}} />
                    <button className="check-button">Check availability</button>
                  </div>
                )}
              </div>

              {!showPincodeInput && (
                <a onClick={togglePincode} style={{cursor:"pointer",color:"#8b3a3a"}}>pincode</a>
              )}
            </div>

            <div className="cart-item">
              <div className='card'>
                <div className="item-left">
                  <img src={product.images[1]} alt="product" />
                </div>

                <div className="item-right">
                  <div className="item-header">
                    <h2>₹ {product.price.toLocaleString('en-IN')}</h2>
                    <i className="bi bi-trash3"></i>
                  </div>
                  <p className="item-name">{product.name}</p>

                  <div className="item-details">
                    <span className="badge">Qty: 1</span>
                    <span className="badge">Size: 18 INCHES</span>
                    <span className="badge">Weight: {product.weight}</span>
                  </div>
                </div>
              </div>

              <label className="gift-checkbox">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={() => setIsGift((prev) => !prev)}
                />
                <span>Is this a gift?</span>
              </label>

              {isGift && (
                <textarea
                  className="gift-textarea"
                  placeholder="Enter a gift message (optional)"
                ></textarea>
              )}
            </div>
          </div>

          <div className="payment-summary-card">
            <div className="coupon-header">
              <div className="coupon-info">
                <img src={deleveryImage} alt="Apply Coupons" />
                <div>
                  <h4>Apply Coupons</h4>
                  <p>Coupons available</p>
                </div>
              </div>
              <button className="view-btn">View</button>
            </div>

            <h3 className="payment-title">Payment Details <span>(1 Item)</span></h3>

            {paymentData.map((item, index) => (
              <div key={index} className="payment-detail-row">
                <span>{item.label}</span>
                <span className={item.className || ''}>{item.value}</span>
              </div>
            ))}

            <div className="grand-total-row">
              <span>Grand Total</span>
              <span>₹ {product.price.toLocaleString('en-IN')}</span>
            </div>

            <div className="waranty-page-container">
              <div className={`image-wrapper ${animate ? 'slide-up' : ''}`}>
                <img src={images[currentIndex]} alt="warranty" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="payment-route-container">
        <div className="product-details">
          <img src={product?.images[1]} alt={product?.name} />
          <h1>{product?.price.toLocaleString('en-IN')}</h1>
          <p>{product?.name}</p>
        </div>

        <button onClick={() => navigate('/checkout', { state: product })} className='payment-btn'>
          Continue
        </button>
      </div>
    </>
  );
}

export default CartPage;
