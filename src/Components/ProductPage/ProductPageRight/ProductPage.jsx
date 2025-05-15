import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import useWindowWidth from './useWindowWidth';
import { getProductbyid } from '../../../api/productApi';

import './ProductPage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductPage() {
  const { id } = useParams();
  const [productimages, setProductimages] = useState(null);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 768;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductbyid(id);
        setProductimages(res.data.images);
        console.log(res);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    if (id) fetchData();
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  if (!productimages || productimages.length === 0) {
    return <div>Loading...</div>;
  }

  // Always show the media at index 1 as the big image/video
  const bigMediaIndex = 1;
  const bigMedia = productimages[bigMediaIndex];

  // Filter out the big media for the thumbnails
  const otherMedia = productimages.filter((_, index) => index !== bigMediaIndex);

  const renderMedia = (media, index, className) => {
    const isVideo = media.endsWith('.mp4');
    return isVideo ? (
      <video controls className={className} key={index}>
        <source src={media} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <img
        key={index}
        src={media}
        alt={`Product ${index}`}
        className={className}
      />
    );
  };

  return (
    <div>
      {isMobile ? (
        <Slider {...settings} className="mobile-carousel">
          {productimages.map((media, index) => (
            <div key={index} className="carousel-item">
              {renderMedia(media, index, 'product-page-image')}
            </div>
          ))}
        </Slider>
      ) : (
        <div className="product-media-container">
          {/* Big image/video at index 1 */}
          <div className="full-width-image">
            {renderMedia(bigMedia, bigMediaIndex, 'full-width-image')}
          </div>

          {/* Thumbnails for other media */}
          <div className="bottom-image-grid">
            {otherMedia.map((media, index) => (
              <div key={index} className="product-media-item">
                {renderMedia(media, index, 'product-page-image')}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
