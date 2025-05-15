import React, { useEffect, useRef } from 'react';
import './Benifits.css';
import environmentImage from '../../assets/environment.jpeg'
import qualityImage from '../../assets/qualityImage.jpeg'
import trustImage from '../../assets/trust.jpg'
function Benifits() {
  const ref = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    ref.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
       <> <div className="text-center mt-">
       <h1>Our Benifits</h1>
        <p className="my-3">What we Provide</p>
    </div>
    <div className='Benifits'>
      <div className='Benifits-experience'>
      <img src={trustImage} alt="Image" className='rotate' />
        <div className='text-befits'>
          <h1 className='fade-slide-up' ref={el => ref.current.push(el)}>25 years of experience and trust</h1>
          <p className='fade-slide-up' ref={el => ref.current.push(el)} style={{ transitionDelay: "0.2s" }}>
          Jewelry enhances personal style, symbolizes special moments, and can hold emotional or cultural significance...
          </p>
        </div>
      </div>
      <div className='Benifits-experience'>
        <div className='text-befits'>
          <h1 className='fade-slide-up' ref={el => ref.current.push(el)}>Quality and materials</h1>
          <p className='fade-slide-up' ref={el => ref.current.push(el)} style={{ transitionDelay: "0.2s" }}>
          Quality and materials refer to the craftsmanship and the type of metals, stones, or gems used in jewelry...
          </p>
        </div>
        <img src={qualityImage} alt="Image" className='rotate' />
      </div>
      <div className='Benifits-experience'>
      <img src={environmentImage} alt="Image" className='rotate' />
        <div className='text-befits'>
          <h1 className='fade-slide-up' ref={el => ref.current.push(el)}>Environmental responsibilities</h1>
          <p className='fade-slide-up' ref={el => ref.current.push(el)} style={{ transitionDelay: "0.2s" }}>
          Environmental responsibilities involve using sustainable practices and ethically sourced materials...
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Benifits;
