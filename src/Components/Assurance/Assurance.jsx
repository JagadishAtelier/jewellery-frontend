import React from 'react'
import './Assurance.css'
import assuranceImage1 from '../../assets/assurance-tq-logo.webp'
import assuranceImage2 from '../../assets/assurance-replacement-logo.webp'
import assuranceImage3 from '../../assets/assurance-bis-logo.webp'
import assuranceImage4 from '../../assets/assurance-maintainence-logo.webp'
const data = [
    {image : assuranceImage1 , text : "Jewellery Exchange"},
    {image : assuranceImage2 , text : "Easy Replacements"},
    {image : assuranceImage3 , text : "Purity Guarantee"},
    {image : assuranceImage4 , text : "Lifetime Maintenance"}
]
function Assurance() {
  return (
    <div className='Assurance-container'>
      <h1>Our Assurance</h1>
      <br/>
      <h4>Crafted by experts, cherished by you.</h4>
      <div className='Assurance-data-div'>
        {data.map((items,index)=>(
          <div key={index} className='Assurance-image-text'>
          <img src={items.image}/>
          <h5>{items.text}</h5>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Assurance
