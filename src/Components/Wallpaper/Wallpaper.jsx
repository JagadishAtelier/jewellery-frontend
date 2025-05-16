import React, { useRef, useState, useEffect } from 'react';
import './Wallpaper.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import video1 from '../../assets/9328448-uhd_4096_2160_25fps.webm';
import video2 from '../../assets/12113525_1920_1080_50fps.webm';
import video3 from '../../assets/9328448-uhd_4096_2160_25fps.webm';

function Wallpaper() {
  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  const [paused, setPaused] = useState([false, false, false]);
  
  const titleRefs = useRef([]);
  const descRefs = useRef([]);

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

    titleRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    descRefs.current.forEach(el => {
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
    setPaused(prev => prev.map((val, i) => i === index ? !val : val));
  };

  const videos = [video1, video2, video3];
  const captions = [
    { title: "Forever Begins Here", desc: "Capturing the essence of eternal love" },
    { title: "Timeless Tales of Togetherness", desc: "For the Moments that last a lifetime" },
    { title: "Elegance in Every Frame", desc: "Highlighting the beauty of your special day" },
  ];

  function splitTitle(title) {
    const words = title.trim().split(" ");
    const len = words.length;
    if (len < 3) return { first: title, middle: "", last: "" };

    const midStart = Math.floor(len / 3);
    const midEnd = midStart * 2;

    const first = words.slice(0, midStart).join(" ");
    const middle = words.slice(midStart, midEnd).join(" ");
    const last = words.slice(midEnd).join(" ");

    return { first, middle, last };
  }

  return (
    <div id="wallpaperCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
      <div className="carousel-inner">
        {videos.map((vid, i) => {
          const { first, middle, last } = splitTitle(captions[i].title);
          return (
            <div key={i} className={`carousel-item position-relative ${i === 0 ? 'active' : ''}`}>
              <video
                ref={videoRefs[i]}
                className="d-block w-100 wallpaper-video"
                autoPlay
                loop
                muted
              >
                <source src={vid} type="video/webm" />
                Your browser does not support the video tag.
              </video>

              <div className="carousel-caption d-none d-md-block d-sm-block">
                <h1
                  className="text-capitalize mb-2 fade-slide-up"
                  ref={el => (titleRefs.current[i] = el)}
                >
                  {first && <>{first} </>}
                  {middle && <span className="italic">{middle}</span>}
                  {last && <> {last}</>}
                </h1>
                <p
                  className="mt-3 fade-slide-up"
                  ref={el => (descRefs.current[i] = el)}
                >
                  {captions[i].desc}
                </p>
              </div>

              <button
                onClick={() => togglePlayback(i)}
                className="text-light border-0 bg-transparent position-absolute play-pause-btn"
                style={{ bottom: '20px', right: '30px', zIndex: 99 }}
              >
                <i className={`bi ${paused[i] ? 'bi-play-fill' : 'bi-pause-fill'} fs-3`}></i>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Wallpaper;
