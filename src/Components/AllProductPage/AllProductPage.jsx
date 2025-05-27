import React, { useState, useEffect } from 'react';
import { getProducts } from '../../api/productApi';
import { useLikedItems } from '../LikedItemsContext/LikedItemsContext';
import Navbar from '../Navbar/Navbar';
import SortFilterButtons from '../SortFilterButtons/SortFilterButtons';
import { useNavigate } from 'react-router-dom';
import './AllProductPage.css';

const pinkDivText = [
  { text: 'Because She deserves the best!' },
  { text: "A Mother's Day treat!" },
  { text: 'Celebrate her sparkle with Mia!' },
];

const filterButtonList = [
  'Below 10K',
  'Below 25K',
  'Rings',
  'Earrings',
  'Pendant',
  'Diamond',
  '22 KT',
];

const sortButtonList = [
  'Price: Low to High',
  'Price: High to Low',
  'Name: A to Z',
  'Name: Z to A',
];

function AllProductPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allProductList, setAllProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { likedItems, toggleLike } = useLikedItems();

  const [sortOption, setSortOption] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        setAllProductList(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    getAllData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === pinkDivText.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filter and sort logic same as JewelleryType
  const getFilteredSortedProducts = () => {
    let result = [...allProductList];

    // Filter
    if (filterOption === 'Below 10K') {
      result = result.filter((item) => item.price < 10000);
    } else if (filterOption === 'Below 25K') {
      result = result.filter((item) => item.price < 25000);
    } else if (['Rings', 'Earrings', 'Pendant'].includes(filterOption)) {
      result = result.filter((item) => item.category === filterOption);
    } else if (filterOption === 'Diamond') {
      result = result.filter((item) =>
        item.material?.toLowerCase().includes('diamond')
      );
    } else if (filterOption === '22 KT') {
      result = result.filter((item) =>
        item.material?.toLowerCase().includes('22 kt')
      );
    }

    // Sort
    if (sortOption === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Name: A to Z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'Name: Z to A') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center py-3">
        <div
          className="spinner-border text-warning"
          role="status"
          style={{ width: '1.5rem', height: '1.5rem' }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-2 small text-muted">Fetching Product Data...</span>
      </div>
    );

  const filteredSortedProducts = getFilteredSortedProducts();

  return (
    <div className="jewellery-type-container">
      <Navbar />
      <div className="pink-color-div">
        <h5 className="animated-text">{pinkDivText[currentIndex].text}</h5>
      </div>

      {filteredSortedProducts.length === 0 ? (
        <div className="not-found-wrapper">
          <h2>No jewellery items found for this filter/sort</h2>
          <p>Please try another filter or reset the filters.</p>
        </div>
      ) : (
        <div className="jewel-grid">
          {filteredSortedProducts.map((data, index) => {
            const isLiked = likedItems.some((item) => item._id === data._id);
            return (
              <div
                className="jewel-card"
                key={index}
                onClick={() => navigate(`/product/${data._id}`, { state: data })}
              >
                <div className="image-container">
                  <img src={data.images[0]} alt={data.name} />
                  <i
                    className={`bi bi-heart${isLiked ? '-fill' : ''} heart-icon`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(data);
                    }}
                    style={{ color: isLiked ? 'red' : 'white' }}
                  ></i>
                </div>
                <div className="jewel-card-details">
                  <h2 className="price-btn">₹ {data.price}</h2>
                  <h3>{data.name}</h3>
                  <p className="description">{data.shortdiscription}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <SortFilterButtons
        onSortChange={(option) => {
          if (option === 'open') setShowSortModal(true);
        }}
        onFilterChange={(option) => {
          if (option === 'open') setShowFilterModal(true);
        }}
      />

      {/* Sort Modal */}
      {showSortModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Sort Options</h3>
            <div className="modal-btns">
              {sortButtonList.map((sort, index) => (
                <button
                  key={index}
                  className="modal-filter-btn"
                  onClick={() => {
                    setSortOption(sort);
                    setShowSortModal(false);
                  }}
                >
                  {sort}
                </button>
              ))}
              <button
                className="modal-filter-btn reset-btn"
                onClick={() => {
                  setSortOption(null);
                  setShowSortModal(false);
                }}
              >
                Reset Sort
              </button>
              <button
                className="modal-close-btn"
                onClick={() => setShowSortModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Filter Options</h3>
            <div className="modal-btns">
              {filterButtonList.map((filter, index) => (
                <button
                  key={index}
                  className="modal-filter-btn"
                  onClick={() => {
                    setFilterOption(filter);
                    setShowFilterModal(false);
                  }}
                >
                  {filter}
                </button>
              ))}
              <button
                className="modal-filter-btn reset-btn"
                onClick={() => {
                  setFilterOption(null);
                  setShowFilterModal(false);
                }}
              >
                Reset Filter
              </button>
              <button
                className="modal-close-btn"
                onClick={() => setShowFilterModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProductPage;
