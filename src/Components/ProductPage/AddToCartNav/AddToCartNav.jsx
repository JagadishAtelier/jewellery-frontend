import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
import { useModal } from '../../ModalContext/ModalContext';
 // ✅ Import the hook
import './AddToCartNav.css';

function AddToCartNav() {
  const { state: product } = useLocation();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { setIsLoginOpen } = useModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
    } else {
      addToCart(product);
      navigate('/cart', { state: product });
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
    } else {
      navigate('/checkout', { state: product });
    }
  };

  return (
    <div className="add-to-cart-container">
      <div className="product-details">
        <h4>₹ {product?.price.toLocaleString('en-IN')}</h4>
        <p>{product?.name}</p>
        <div className='vertical-line'></div>
        <p>Weight : {product?.weight}</p>
        <p>karat : {product?.karat}</p>
        <div className='vertical-line'></div>
      </div>

      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
}

export default AddToCartNav;
