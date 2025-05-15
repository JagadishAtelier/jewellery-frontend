import React, { useEffect, useState } from 'react';
import './ProductPageLeft.css';
import { useLocation } from 'react-router-dom';
import image1 from '../../../assets/diamond.svg';
import image2 from '../../../assets/Ellipse.svg';
import image3 from '../../../assets/Gold.svg';
import image4 from '../../../assets/gold1.svg';
import ProductSize from '../ProductSize/ProductSize'
import ProductDelevery from '../ProductDelevery/ProductDelevery';
import ProductWaranty from '../ProductWaranty/ProductWaranty';
import ProductOffer from '../ProductOffer/ProductOffer';
import CustomerLove from '../CustomerLove/CustomerLove';
import ProductDetails from '../ProductDetails/ProductDetails';
import { useParams } from 'react-router-dom';
function ProductPageLeft() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { state: product } = useLocation();
  const goldDiamond = product
    ? [
        { images: image1, text: product.karat || 'N/A' },
        { images: image2, text: `${product.weight || 'N/A'}gm` },
        { images: image3, text: `₹${product.goldRatePerGram?.toLocaleString('en-IN') || 'N/A'}` },
        { images: image4, text: `${product.name.split(' ').length} Diamonds` },
      ]
    : [];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % goldDiamond.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const visibleItems = [
    goldDiamond[currentIndex],
    goldDiamond[(currentIndex + 1) % goldDiamond.length],
  ];

  return (
    <div className='product-page-left'>
      <div className='product-price-list'>
        <div className='product-page-price'>
          <h1>₹ {product?.price.toLocaleString('en-IN')}</h1>
          <div className='product-page-icon'>
            <i className='bi bi-heart'></i>
            <i className='bi bi-share-fill'></i>
          </div>
        </div>
        <p>{product?.shortdiscription}</p>

        <div className="goldDiamond">
            <div className="goldDiamond-track">
                {visibleItems.map((content, index) => (
                    <div className="goldDiamond-content" key={index}>
                        <img src={content.images} alt="" />
                        <p>{content.text}</p>
        </div>
        ))}
        </div>
        </div>

      </div>
      <hr/>
    <ProductSize/>
    <hr/>
    <ProductDelevery/>
    <hr/>
    <ProductWaranty/>
    <hr/>
    <ProductOffer/>
    <hr/>
    <CustomerLove/>
    <hr/>
    <ProductDetails/>
    </div>
  );
}

export default ProductPageLeft;
