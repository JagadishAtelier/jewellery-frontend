import React from 'react'
import './ShopByGender.css'
import womenImage from  '../../assets/women-jewellery.jpg'
import menImage from '../../assets/men-jewellery.webp'
import kidsImage from '../../assets/kids-jewellery.webp'
const images = [{image:womenImage,text:"Women Jewellery"},
{image:menImage,text:"Men Jewellery"},{image:kidsImage,text:"Kid Jewellery"}]
function ShopByGender() {
    return (
    <div className='shop-by-gender'>
      <h1>Curated For You</h1>
      <br/>
        <h4>Shop by Gender</h4>
      <div className="shop-by-gender-container">
        {images.map((items, index) => (
          <div key={index} className="shop-by-gender-item">
            <img src={items.image} alt={items.text} />
            <h5 style={{marginTop:"20px"}}>{items.text}</h5>
          </div>
        ))}
      </div>
      </div>
    );
  }
  


export default ShopByGender
