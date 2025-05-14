import React, { useEffect, useRef } from 'react';
import './Benifits.css';
import img from "../../assets/Ringspng.png";

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
        <img src={img} alt="Image" className='rotate' />
        <h3 className='fade-slide-up' ref={el => ref.current.push(el)}>25 years of experience and trust</h3>
        <p className='fade-slide-up' ref={el => ref.current.push(el)} style={{ transitionDelay: "0.2s" }}>
          Jewelry enhances personal style, symbolizes special moments, and can hold emotional or cultural significance...
        </p>
      </div>

      <div className='Benifites-left' style={{ width: "100%" }}>
        <div className='Benifits-quality'>
          <h3 className='fade-slide-up' ref={el => ref.current.push(el)}>Quality and materials</h3>
          <p className='fade-slide-up' ref={el => ref.current.push(el)} style={{ transitionDelay: "0.2s" }}>
            Quality and materials refer to the craftsmanship and the type of metals, stones, or gems used in jewelry...
          </p>
        </div>
        <div className='Benifits-environmental'>
          <h3 className='fade-slide-up' ref={el => ref.current.push(el)}>Environmental responsibilities</h3>
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
