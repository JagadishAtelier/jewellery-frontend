import React, { useRef, useState, useEffect } from 'react';
import './Wallpaper.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import video1 from '../../assets/9328448-uhd_4096_2160_25fps.webm';
import video2 from '../../assets/12113525_1920_1080_50fps.webm';
import video3 from '../../assets/9328448-uhd_4096_2160_25fps.webm';

function Wallpaper() {
  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  const [paused, setPaused] = useState([false, false, false]);
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

  const togglePlayback = (index) => {
    const video = videoRefs[index].current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    setPaused(prev => {
      const newState = prev.map((p, i) => (i === index ? !p : p));
      return newState;
    });
  };

  const videos = [video1, video2, video3];
  const captions = [
    { title: "Forever Begins Here", desc: "Capturing the essence of eternal love" },
    { title: "Timeless Tales of Togetherness", desc: "For the Moments that last a lifetime" },
    { title: "Elegance in Every Frame", desc: "Highlighting the beauty of your special day" },
  ];

  return (
    <div id="wallpaperCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
      <div className="carousel-inner">
        {videos.map((vid, i) => (
          <div key={i} className={`carousel-item position-relative ${i === 0 ? 'active' : ''}`}>
            <video ref={videoRefs[i]} className="d-block w-100 wallpaper-video" autoPlay loop muted>
              <source src={vid} type="video/webm" />
              Your browser does not support the video tag.
            </video>

            <div className="carousel-caption d-none d-md-block d-sm-block">
              <h1
                className='text-capitalize mb-2 fade-slide-up'
                ref={el => ref.current.push(el)}
              >
                {captions[i].title}
              </h1>
              <p
                className='mt-3 fade-slide-up'
                ref={el => ref.current.push(el)}
              >
                {captions[i].desc}
              </p>
            </div>
            <button
              onClick={() => togglePlayback(i)}
              className="text-light border-none position-absolute play-pause-btn"
              style={{ bottom: '20px', right: '30px', zIndex: 99 }}
            >
              <i className={`bi ${paused[i] ? 'bi-play-fill' : 'bi-pause-fill'}`}></i>
            </button>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#wallpaperCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#wallpaperCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Wallpaper;