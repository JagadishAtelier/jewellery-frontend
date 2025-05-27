import React, { useEffect, useState } from "react";
import "./Divisions.css";
import { useModal } from "../ModalContext/ModalContext";
import { getCategories } from "../../api/categoriesAPI";
import { getProducts } from '../../api/productApi';
const items = [
  { name: "Jewellery", href: "/jewellery" },
  { name: "Best Sellers", href: "/best-sellers" },
  { name: "About-Us", href: "/about-us" },
  { name: "Find-Us", href: "/find-us" },
];

function Divisions() {
  const { setIsLoginOpen } = useModal();
  const [allProductList, setAllProductList] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null); // 👈 new state
  const rotatingWords = ["Anniversary", "Marriage", "Gift"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchJewelleryItems = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchJewelleryItems();
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      SetLoading(true);
      try {
        const res = await getProducts();
        setAllProductList(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        SetLoading(false);
      }
    };
    getAllData();
  }, []);

  // 👇 Hover handlers with delay
  const handleMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowDropdown(false);
    }, 500); // 3 seconds delay (can increase to 5000 for 5s)
    setHideTimeout(timeout);
  };

  return (
    <>
      <div className="division-heading">
        {items.map((data, index) => {
          if (data.name === "Jewellery") {
            return (
              <div
                className="jewellery-wrapper"
                key={index}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="jewellery-link">
                  <a
                    href={data.href}
                    className="fw-semibold"
                    onClick={(e) => e.preventDefault()}
                  >
                    {data.name}
                  </a>
                </div>

                {showDropdown && (
                  <div className="jewellery-dropdown">
                    {(() => {
                      const allItems = categories.flatMap((col) => col.items);
                      const first11 = allItems.slice(0, 11);

                      return (
                        <>
                          {first11.map((item, i) => (
                            <a
                              href={`/products/${item._id}`}
                              className="dropdown-item"
                              key={i}
                            >
                              <img src={item.imageUrl} alt={item.label} />
                              <p>{item.label}</p>
                            </a>
                          ))}
                          <a
                            href="/products"
                            className="dropdown-item view-all-grid"
                          >
                            <i className="bi bi-arrow-right"></i>
                            <p>View All Products</p>
                          </a>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <a href={data.href} key={index} className="fw-semibold">
                {data.name}
              </a>
            );
          }
        })}
      </div>

      <div className="search-icon-wrapper">
        <i className="bi bi-search-heart"></i>
        <input type="text" placeholder="Shop for" />
        <span className="animated-placeholder">{rotatingWords[wordIndex]}</span>
      </div>
    </>
  );
}


export default Divisions;
