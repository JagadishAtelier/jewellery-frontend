import React from 'react'
import './AboutPage.css'
import Navbar from '../Navbar/Navbar'
import aboutImage1 from '../../assets/about1.webp'
import aboutImage2 from '../../assets/about2.webp'
import aboutImage3 from '../../assets/about3.jpg'
import aboutImage4 from '../../assets/about4.webp'
const aboutContent = [
    {image : aboutImage1 , heading : "Self-Expressive" , para : "Always stand up for wha we believe is right"},
    {image : aboutImage2 , heading : "Earthphillic" , para : "We are lively, bold and a little feisty"},
    {image : aboutImage3 , heading : "Ingenious" , para : "Original designs and well suited for the purpose"},
    {image : aboutImage4 , heading : "Earthphillic" , para : "Because we have just thi one planet to live in"},
]
function AboutPage() {
  return (
    <div className='about-page-container'>
        <Navbar/>
        <div className='about-page-text'>
      <h1>Mia was created to boost her confidence and allow her to express her individuality through her choice of jewellery.</h1>
      </div>

        <div>
            <div className='about-brand'>
                <p>Our</p>
                <h1>Big Brand Idea</h1>
            </div>
            <div className="card-container">
      <div className="about-card card-left">
        <h2>01</h2>
        <p>Reflecting the attitude of our customers</p>
      </div>
      <div className="about-card card-center">
        <h2>02</h2>
        <p>Match an individuals need to<br />express herself unabashedly</p>
      </div>
      <div className="about-card card-right">
        <h2>03</h2>
        <p>Journey of self discovery<br />and self expression</p>
      </div>
    </div>
        </div>

        <div className='about-personality-conatiner'>
            <div className='personality-heading'>
                <p>Our</p>
                <h1>Personality</h1>
            </div>
            <div className='about-personality-images-container'>
                {aboutContent.map((content)=>(
                    <div>
                        <img src={content.image}/>
                        <div className='heading-and-para'>
                        <h4>{content.heading}</h4>
                        <p>{content.para}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AboutPage
