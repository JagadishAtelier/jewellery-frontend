import React, { useState, useEffect, useRef } from 'react';
import './Lookbook.css';
import product from '../../assets/lookbook-7-1.jpg';

const Lookbook = ({ hotspots }) => {
  const [visiblePopups, setVisiblePopups] = useState([]);
  const popupRefs = useRef([]);
  const lookbookRef = useRef(null);

  // Show both popups when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisiblePopups([0, 1]); // Show popups at index 0 and 1
        }
      },
      { threshold: 0.3 }
    );

    if (lookbookRef.current) {
      observer.observe(lookbookRef.current);
    }

    return () => {
      if (lookbookRef.current) {
        observer.unobserve(lookbookRef.current);
      }
    };
  }, []);

  // Close a popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      popupRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(e.target) && visiblePopups.includes(index)) {
          setVisiblePopups((prev) => prev.filter((i) => i !== index));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [visiblePopups]);

  // Toggle visibility manually by clicking on spot
  const toggleSpot = (index) => {
    setVisiblePopups((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      <div className="my-5 categoryheading">
        <h1 className="my-3">Take a Look</h1>
        <p className="my-3" style={{ transitionDelay: '0.2s' }}>
          Try on the Model
        </p>
      </div>

      <div className="lookbook-item" ref={lookbookRef}>
        <div className="lookbook-container">
          <div className="lookbook-content">
            <div className="item">
              <img src={product} alt="Lookbook" />
              {hotspots.map((spot, index) => (
                <div
                  className="item-lookbook"
                  key={index}
                  style={{ left: spot.left, top: spot.top, cursor: 'pointer' }}
                  onClick={() => toggleSpot(index)}
                >
                  <span className="number-lookbook" />
                  <div
                    className={`content-lookbook ${
                      visiblePopups.includes(index) ? 'active' : ''
                    }`}
                    ref={(el) => (popupRefs.current[index] = el)}
                    style={spot.contentStyle}
                  >
                    <div className="d-flex">
                      <div className="item-thumb">
                        <a href={spot.link}>
                          <img src={spot.thumb} alt={spot.title} />
                        </a>
                      </div>
                      <div className="content-lookbook-bottom">
                        <div className="item-title">
                          <a href={spot.link}>{spot.title}</a>
                        </div>
                        <span
                          className="price"
                          dangerouslySetInnerHTML={{ __html: spot.price }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lookbook;
