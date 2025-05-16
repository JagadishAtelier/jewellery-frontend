import React from 'react'
import './ShopImage.css'
import ShopImg from '../../assets/ShopImage.avif'
function ShopImage() {
  return (
    <>
        <div className="mt-5 categoryheading">
        <h1 className='my-3 ' >Offline Presence</h1>
        <p className=' my-3 ' style={{ transitionDelay: "0.2s" }}>Locate your nearest</p>
      </div>
    <div className='Shop-img-div'>
      <img src={ShopImg} className='Shop-Img'/>
      <div className='Shop-Img-words'>
        <p>Locate your nearest</p>
        <h1>Offline Store</h1>
        <p>For an exquisite jewellery experience</p>
        <button>find store</button>
      </div>
    </div>
    </>
  )
}

export default ShopImage
