import './BestSellersPage.css';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import SortFilterButtons from '../SortFilterButtons/SortFilterButtons';
import { useLikedItems } from '../LikedItemsContext/LikedItemsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts } from '../../api/productApi';
import notFoundImage from '../../assets/Not-found.png';

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

function BestSellersPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const { likedItems, toggleLike } = useLikedItems();
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
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchData();
  }, [id]);

  const getFilteredSortedProducts = () => {
    let result = [...products];

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

  return (
    <div className='jewellery-type-container'>
      <Navbar />
      <div className='pink-color-div'>
        <h5 className='animated-text'>{pinkDivText[currentIndex].text}</h5>
      </div>

      {getFilteredSortedProducts().length === 0 ? (
        <div className='not-found-wrapper'>
          <img src={notFoundImage} alt='Not Found' className='not-found-img' />
          <h2>No jewellery items found for this category</h2>
          <p>Please check another category or explore all items.</p>
        </div>
      ) : (
        <div className='jewel-grid'>
          {getFilteredSortedProducts().map((data, index) => {
            const isLiked = likedItems.some((item) => item._id === data._id);
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
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(data);
                    }}
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

      <div style={{ textAlign: 'center' }}>
        <button className='view-all-btn' onClick={() => navigate('/products')}>
          View All Products
        </button>
      </div>

      <SortFilterButtons
        onSortChange={(sortOption) => {
          if (sortOption === 'open') setShowSortModal(true);
        }}
        onFilterChange={(filterOption) => {
          if (filterOption === 'open') setShowFilterModal(true);
        }}
      />

      {/* Sort Modal */}
      {showSortModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3>Sort Options</h3>
            <div className='modal-btns'>
              {sortButtonList.map((sort, index) => (
                <button
                  key={index}
                  className='modal-filter-btn'
                  onClick={() => {
                    setSortOption(sort);
                    setShowSortModal(false);
                  }}
                >
                  {sort}
                </button>
              ))}
              <button
                className='modal-filter-btn reset-btn'
                onClick={() => {
                  setSortOption(null);
                  setShowSortModal(false);
                }}
              >
                Reset Sort
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

      {/* Filter Modal */}
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
                    setFilterOption(filter);
                    setShowFilterModal(false);
                  }}
                >
                  {filter}
                </button>
              ))}
              <button
                className='modal-filter-btn reset-btn'
                onClick={() => {
                  setFilterOption(null);
                  setShowFilterModal(false);
                }}
              >
                Reset Filter
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
  );
}

export default BestSellersPage;
