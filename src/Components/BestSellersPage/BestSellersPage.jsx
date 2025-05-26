import './BestSellersPage.css'
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import SortFilterButtons from '../SortFilterButtons/SortFilterButtons';
import { useLikedItems } from '../LikedItemsContext/LikedItemsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts } from "../../api/productApi";
import notFoundImage from '../../assets/Not-found.png';
const pinkDivText = [
  { text: 'Because She deserves the best!' },
  { text: "A Mother's Day treat!" },
  { text: 'Celebrate her sparkle with Mia!' },
];

const filterButtonList = [
  { text: '< 10K' },
  { text: 'Rings' },
  { text: 'Earrings' },
  { text: '< 25K' },
  { text: 'Pendant' },
  { text: 'Diamond' },
  { text: '22 KT' },
];
function BestSellersPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState(null);
    const { likedItems, toggleLike } = useLikedItems();
    const [showSortModal, setShowSortModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === pinkDivText.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await getProducts();
          setProducts(res.data);
          console.log(res.data);
        } catch (err) {
          console.error('Failed to fetch products', err);
        }
      };
  
      fetchData();
    }, [id]);
  return (
    <div className='jewellery-type-container'>
      <Navbar />
      <div className='pink-color-div'>
        <h5 className='animated-text'>{pinkDivText[currentIndex].text}</h5>
      </div>

      {/* Not Found fallback or product grid */}
      {products.length === 0 ? (
        <div className="not-found-wrapper">
          <img src={notFoundImage} alt="Not Found" className="not-found-img" />
          <h2>No jewellery items found for this category</h2>
          <p>Please check another category or explore all items.</p>
        </div>
      ) : (
        <div className='jewel-grid'>
          {products.map((data, index) => {
            const isLiked = likedItems.some((item) => item.text === data.text);
            return (
              <div
                className='jewel-card'
                key={index}
                onClick={() =>
                  navigate(`/product/${data._id}`, { state: data })
                }
              >
                <div className='image-container'>
                  <img src={data.images[0]} alt={data.name} />
                  <i
                    className={`bi bi-heart${isLiked ? '-fill' : ''} heart-icon`}
                    onClick={() => toggleLike(data)}
                  ></i>
                </div>
                <div className='jewel-card-details'>
                  <h2 className='price-btn'>₹ {data.price}</h2>
                  <h3>{data.name}</h3>
                  <p className='description'>{data.shortdiscription}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div style={{textAlign:"center"}}>
        <button className='view-all-btn' onClick={()=>navigate('/products')}>View All Products</button>
      </div>
      <SortFilterButtons
        onSortChange={(sortOption) => {
          if (sortOption === 'open') setShowSortModal(true);
        }}
        onFilterChange={(filterOption) => {
          if (filterOption === 'open') setShowFilterModal(true);
        }}
      />

      {showSortModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3>Sort & Filter Options</h3>
            <div className='modal-btns'>
              {filterButtonList.map((filter, index) => (
                <button
                  key={index}
                  className='modal-filter-btn'
                  onClick={() => {
                    setActiveFilter(filter.text);
                    setShowSortModal(false);
                  }}
                >
                  {filter.text}
                </button>
              ))}
              <button
                className='modal-filter-btn reset-btn'
                onClick={() => {
                  setActiveFilter(null);
                  setShowSortModal(false);
                }}
              >
                Reset
              </button>
              <button
                className='modal-close-btn'
                onClick={() => setShowSortModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showFilterModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3>Filter Options</h3>
            <div className='modal-btns'>
              {filterButtonList.map((filter, index) => (
                <button
                  key={index}
                  className='modal-filter-btn'
                  onClick={() => {
                    setActiveFilter(filter.text);
                    setShowFilterModal(false);
                  }}
                >
                  {filter.text}
                </button>
              ))}
              <button
                className='modal-filter-btn reset-btn'
                onClick={() => {
                  setActiveFilter(null);
                  setShowFilterModal(false);
                }}
              >
                Reset
              </button>
              <button
                className='modal-close-btn'
                onClick={() => setShowFilterModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BestSellersPage
