import React, { useState, useEffect, useRef } from "react";
import "./BestSale.css";
// import image1 from "../../assets/catagories-image1.jpg";
// import image2 from "../../assets/catagories-image2.webp";
// import image3 from "../../assets/catagories-image3.webp";
// import image4 from "../../assets/catagories-image4.webp";
// import image5 from "../../assets/catagories-image11.jpg";
// import image6 from "../../assets/catagories-image6.jpg";
// import image7 from "../../assets/catagories-image7.jpg";
// import image8 from "../../assets/catagories-image8.jpg";
// import image9 from "../../assets/catagories-image9.jpg";
// import image10 from "../../assets/catagories-image10.webp";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/productApi";

// const products = [
//   {
//     id: 1,
//     name: "Elegant Charm Gold and Diamond...",
//     price: "₹1,03,065",
//     image: image1,
//   },
//   {
//     id: 2,
//     name: "Lustrous Knot Pearl & Gold Chain",
//     price: "₹31,232",
//     image: image2,
//   },
//   {
//     id: 3,
//     name: "Dazzling Chic Gold & Diamond Ho...",
//     price: "₹48,467",
//     image: image3,
//   },
//   { id: 4, name: "Floral Gold Stud Earrings", price: "₹26,359", image: image4 },
//   {
//     id: 5,
//     name: "Delicate Mangalsutra Chain",
//     price: "₹73,159",
//     image: image5,
//   },
//   {
//     id: 6,
//     name: "Shimmering Diamond Necklace",
//     price: "₹99,234",
//     image: image6,
//   },
//   { id: 7, name: "Gleaming Gold Bracelet", price: "₹45,678", image: image7 },
//   { id: 8, name: "Luxury Diamond Ring", price: "₹1,20,789", image: image8 },
//   { id: 9, name: "Opulent Gold Earrings", price: "₹55,876", image: image9 },
//   { id: 10, name: "Radiant Pearl Necklace", price: "₹68,243", image: image10 },
// ];

const BestSale = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [products, setProducts] = useState([]);
  // const [scrollDir, setScrollDir] = useState('down');
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Scroll direction detection
  useEffect(() => {
    const el = containerRef.current;

    const handleScroll = () => {
      if (el && isInViewport(el)) {
        el.classList.add("from-bottom");
      }
    };

    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom >= 0;
    };

    // Trigger once on load and then on scroll
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
        console.log(res);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      nextProduct();
    }, 4000); // scrolls every 4 seconds
  
    return () => clearInterval(interval); // cleanup
  }, [products]);
  

  const nextProduct = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300); // Match CSS duration
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  const getVisibleProducts = () => {
    const visibleProducts = [];
    const productCount = products.length;
    console.log(productCount);

    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + productCount) % productCount;
      visibleProducts.push(products[index]);
    }

    return visibleProducts;
  };

  return (
    <>
      <div className="best-sale-text">
        <h1>Our BestSeller</h1>
        <p className="my-3">Select from BestSeller</p>
      </div>

      <div className="best-sale-container" ref={containerRef}>
        <button className="slider-btn prev-btn" onClick={prevProduct}>
          <i className="bi bi-arrow-left"></i>
        </button>

        <div className={`best-sale-images ${animate ? "slide" : ""}`}>
          {getVisibleProducts().map((item, index) => (
            <div
              key={`${item?.id}-${index}`}
              className={`best-sale-img-div index-${index}`}
            >
              <img
                src={item?.images[1]}
                className="best-sale-image"
                alt={item?.name}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/product/${item?._id}`, { state: item })
                }
              />
              <div className="product-name">
                <p>{item?.name}</p>
                <h3>₹ {item?.price.toLocaleString('en-IN')}</h3>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-btn next-btn" onClick={nextProduct}>
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </>
  );
};

export default BestSale;
