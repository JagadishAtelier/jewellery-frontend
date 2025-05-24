import React,{useState,useEffect} from 'react'
import { getProducts } from '../../api/productApi';
import { useLikedItems } from '../LikedItemsContext/LikedItemsContext';
import Navbar from '../Navbar/Navbar';
import SortFilterButtons from '../SortFilterButtons/SortFilterButtons';
import { useNavigate } from "react-router-dom";
import './AllProductPage.css'
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
function AllProductPage() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState(null);
    const { likedItems, toggleLike } = useLikedItems();
    const  [loading, SetLoading] = useState(false);
    const [showSortModal, setShowSortModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const[allProductList,setAllProductList] = useState([])
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
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === pinkDivText.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }, []);

if (loading) return (
        <div className="d-flex justify-content-center align-items-center py-3">
      <div className="spinner-border text-warning" role="status" style={{ width: "1.5rem", height: "1.5rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <span className="ms-2 small text-muted">Fetching Category Data...</span>
    </div>
    );

  return (
    <div className='jewellery-type-container'>
      <Navbar />
      <div className='pink-color-div'>
        <h5 className='animated-text'>{pinkDivText[currentIndex].text}</h5>
      </div>
<div className='jewel-grid'>
          {allProductList.map((data, index) => {
            const isLiked = likedItems.some((item) => item.text === data.text);
            return (
              <div
                className='jewel-card'
                key={index}
                 onClick={() =>
                  navigate(`/product/${data?._id}`, { state: data })
                }
              >
                <div className='image-container'>
                  <img src={data.images[0]} alt={data.name} />
                  <i
                    className={`bi bi-heart-fill`}
                    style={{color:isLiked ? 'red' : 'white'}}
                    onClick={() => toggleLike(data)}
                  ></i>
                </div>
                <div className='jewel-card-details'>
                  <h2 className='price-btn'>₹ {data.price}</h2>
                 
                  <h4 className='product-card-name'>{data.name}</h4>
                  <p className='description'>{data.shortdiscription}</p>
                 
                </div>
              </div>
            );
          })}
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

export default AllProductPage
