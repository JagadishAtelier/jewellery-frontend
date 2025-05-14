import React, { useState } from 'react';
import './ProductDetails.css';
import detailsImage from '../../../assets/Orders.svg';
import priceBreakImage from '../../../assets/Price-breakup.svg';
import reviewImage from '../../../assets/Reviews.svg';
import generalImage from '../../../assets/general-mob.svg'
import goldImage from '../../../assets/Gold.svg'
import diamondImage from '../../../assets/diamond.svg'
import { useLocation } from 'react-router-dom';


function ProductDetails() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { state: product } = useLocation();
  const stoneDetails = [
    {key:"Count",value:"9"},
    {key:"Weight",value:"0.057 ct/ 0.011 g"},
    {key:"Making Charges",value:"₹ 4256.00"},
    {key:"Gross Weight",value:"1.308g"},
    {key:"GST",value:"₹ 536.66"},
]
const totalGoldValue = [
    {key:"Weight",value:"1.297g"},
    {key:"Rate",value:"₹ 5768.64/g"},
]
const generalContent = product ? [
    {head : "Design Code" , value : "3023FCM"},
    {head : "Gross Weight" , value : product.weight},
]:[]
const goldDetails = [
    {key : "Purity" , value : "14 KT"},
    {key : "Weight" , value : "1.297g"},
    {key : "Colour" , value : "Yellow"},
]
const diamondDetails = [
    {key : "Clarity" , value : "I2"},
    {key : "Weight" , value : "0.057 Ct"},
    {key : "Count" , value : "9"},
    {key : "Shape" , value : "Round"},
    {key : "Colour" , value : "GH"},
]
const header = [
  { image: detailsImage, text: "Product Details" },
  { image: priceBreakImage, text: "Price BreakUp" },
  { image: reviewImage, text: "Reviews" },
];
  return (
    <div className='product-details-container'>
      <div className='header-content-logo'>
        {header.map((list, index) => (
          <div
            key={index}
            className={`header-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {activeIndex === index && <img src={list.image} alt={list.text} className='product-details-logo'/>}
            <p>{list.text}</p>
          </div>
        ))}
      </div>
      <hr />
      {/* Conditional content rendering */}
      {activeIndex === 0 && 
      <div>
      <p>Joyfully embrace everyday elegance with the Whispering Waves Diamond Ring, a 14 Kt gold treasure with pav diamonds. With its delicate curves studded with light-catching pav diamonds, the ring captures the serene grace of oceanic rhythms.</p>
        <div className='general-image-header'>
            <img src={generalImage} className='general-logo'/>
            <h5>General</h5>
        </div>
        <div className='general-list'>
            {generalContent.map((content,index)=>(
                <div >
                    <div className='general-table'>
                        <p>{content.head}</p>
                        <p>{content.value}</p>
                    </div>
                    <div className='hr-line'></div>
                </div>
            ))}
        </div>

        <div>
        <div className='general-image-header'>
            <img src={goldImage} className='general-logo'/>
            <h5>Gold</h5>
        </div>
        <div className='general-list'>
            {goldDetails.map((content,index)=>(
                <div >
                    <div className='general-table'>
                        <p>{content.key}</p>
                        <p>{content.value}</p>
                    </div>
                    <div className='hr-line'></div>
                </div>
            ))}
        </div>
        </div>

        <div>
        <div className='general-image-header'>
            <img src={diamondImage} className='general-logo'/>
            <h5>Diamond</h5>
        </div>
        <div className='general-list'>
            {diamondDetails.map((content,index)=>(
                <div >
                    <div className='general-table'>
                        <p>{content.key}</p>
                        <p>{content.value}</p>
                    </div>
                    <div className='hr-line'></div>
                </div>
            ))}
        </div>
        </div>
        </div>
      }
      {activeIndex === 1 && 
      <div>
        <div className='general-image-header'>
            <img src={goldImage} className='general-logo'/>
            <h5>Total Gold Value</h5>
        </div>
        <div className='general-list'>
            {totalGoldValue.map((content,index)=>(
                <div >
                    <div className='general-table'>
                        <p>{content.key}</p>
                        <p>{content.value}</p>
                    </div>
                    <div className='hr-line'></div>
                </div>
            ))}
        </div>
        <div className='general-image-header'>
            <img src={diamondImage} className='general-logo'/>
            <h5>Stone Detail</h5>
        </div>
        <div className='general-list'>
            {stoneDetails.map((content,index)=>(
                <div >
                    <div className='general-table'>
                        <p>{content.key}</p>
                        <p>{content.value}</p>
                    </div>
                    <div className='hr-line'></div>
                </div>
            ))}
        </div>
        </div>}
      {activeIndex === 2 && <div className="review-section-wrapper">
      <div className="top-review-box d-flex justify-content-between align-items-center">
        <div className="left-review">
          <div className="stars text-secondary">
            {[...Array(5)].map((_, i) => (
              <i key={i} className="bi bi-star-fill mx-1"></i>
            ))}
          </div>
          <p className="review-count mt-2">0 Reviews</p>
        </div>
        <div className="right-review">
          <button className="btn btn-outline-danger rounded-pill">
            ✍️ Write A Review
          </button>
        </div>
      </div>

      <div className="bottom-review-box text-center mt-4">
        <div className="stars text-warning mb-3">
          {[...Array(5)].map((_, i) => (
            <i key={i} className="bi bi-star-fill mx-1"></i>
          ))}
        </div>
        <button className="btn btn-danger rounded-pill px-4">
          BE THE FIRST TO WRITE A REVIEW
        </button>
      </div>
    </div>}
    </div>
  );
}

export default ProductDetails;
