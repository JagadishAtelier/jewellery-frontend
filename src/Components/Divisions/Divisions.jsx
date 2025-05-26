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
  const[allProductList,setAllProductList] = useState([])
  const  [loading, SetLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
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
        setCategories(res.data); // full array with columnClass & items
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchJewelleryItems();
  }, []);
  useEffect(()=>{
    const getAllData = async() =>{
      SetLoading(true)
      try {
        const res = await getProducts();
        setAllProductList(res.data);
        console.log(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }finally{
         SetLoading(false)
      }
    }
    getAllData()
  },[SetLoading])
  return (
    <>
    <div className="division-heading">
      {items.map((data, index) => {
        if (data.name === "Jewellery") {
          return (
            <div
              className="jewellery-wrapper"
              key={index}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <a
                href={data.href}
                className="fw-semibold"
                onClick={(e) => e.preventDefault()}
              >
                {data.name}
              </a>

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
                          <i class="bi bi-arrow-right"></i>
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
