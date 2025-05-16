import React, { useEffect, useRef } from 'react';
import './Benifits.css';
import environmentImage from '../../assets/Environmental.avif'
import qualityImage from '../../assets/QualityImage.avif'
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
          For over 25 years, we have been crafting not just jewelry—but memories, milestones, and moments of beauty that last a lifetime. With decades of trusted craftsmanship, we have built a legacy of elegance, precision, and authenticity that continues to inspire generations.

Jewelry is more than an accessory. It is a reflection of personal style, a symbol of love and celebration, and a cherished token of life's most meaningful occasions. From engagements and weddings to anniversaries, birthdays, and heirlooms passed through generations—each piece tells a story.
          </p>
        </div>
      </div>
      <div className='Benifits-experience'>
        <div className='text-befits'>
          <h1 className='fade-slide-up' ref={el => ref.current.push(el)}>Quality and materials</h1>
          <p className='fade-slide-up' ref={el => ref.current.push(el)} style={{ transitionDelay: "0.2s" }}>
          Quality and materials refer to the craftsmanship and the type of metals, stones, or gems used in jewelry Whether it’s the strength of platinum, the warmth of rose gold, or the timeless appeal of classic yellow gold—every metal we use is carefully tested for purity and lasting value. Our gemstones are not just beautiful; they are responsibly sourced, ensuring ethical practices and sustainability from mine to masterpiece.
          </p>
        </div>
        <img src={qualityImage} alt="Image" className='rotate' />
      </div>
      <div className='Benifits-experience'>
      <img src={environmentImage} alt="Image" className='rotate' />
        <div className='text-befits'>
          <h1 className='fade-slide-up' ref={el => ref.current.push(el)}>Environmental responsibilities</h1>
          <p className='fade-slide-up' ref={el => ref.current.push(el)} style={{ transitionDelay: "0.2s" }}>
          In a world where conscious choices matter more than ever, we believe luxury should never come at the cost of the planet. Our commitment to environmental responsibility is deeply rooted in every step of our craftsmanship—from sourcing to production and packaging.

We prioritize sustainable practices by using ethically sourced materials, such as conflict-free diamonds, recycled metals, and responsibly mined gemstones. By partnering with trusted suppliers who uphold strict environmental and labor standards, we ensure that each piece of jewelry reflects not just beauty, but integrity.


          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Benifits;
