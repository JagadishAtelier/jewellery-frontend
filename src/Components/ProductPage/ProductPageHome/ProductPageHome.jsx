import React from 'react'
import './ProductPageHome.css'
import Navbar from '../../Navbar/Navbar'
import ProductPage from '../ProductPageRight/ProductPage'
import ProductPageLeft from '../ProductPageLeft/ProductPageLeft'
import AddToCartNav from '../AddToCartNav/AddToCartNav'
function ProductPageHome() {
  
  return (
    <div>
      <Navbar/>
      <div className='product-page-home'>
        <ProductPage/>
        <ProductPageLeft/>
      </div>
      <AddToCartNav/>
    </div>
  )
}

export default ProductPageHome
