import React, { useEffect, useState } from 'react';
import './ProductWaranty.css';
import warantyImages1 from '../../../assets/bis.svg';
import warantyImages2 from '../../../assets/0ne-year-waranty.svg';

const images = [warantyImages1, warantyImages2];

function ProductWaranty() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setAnimate(false);
      }, 500); // duration should match CSS animation
    }, 3000); // change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="waranty-page-container">
      <div className={`image-wrapper ${animate ? 'slide-up' : ''}`}>
        <img src={images[currentIndex]} alt="warranty" />
      </div>
    </div>
  );
}

export default ProductWaranty;
