import { useEffect, useState } from 'react';
import 'modern-css-reset/dist/reset.min.css';
import './App.css'
import HomePage from './Components/HomePage/HomePage'
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import ProductPageHome from './Components/ProductPage/ProductPageHome/ProductPageHome';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import JewelleryType from './Components/JewelleryType/JewelleryType';
import { LikedItemsProvider } from './Components/LikedItemsContext/LikedItemsContext';
import LikesPage from './Components/LikesPage/LikesPage';
import CartPage from './Components/CartPage/CartPage';
import CheckoutPage from './Components/CheckoutPage/CheckoutPage';
import PaymentPage from './Components/PaymentPage/PaymentPage';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import { ModalProvider } from './Components/ModalContext/ModalContext';
import PaymentSuccess from './Components/PaymentSuccess/PaymentSuccess';
import Footer from './Components/Footer/Footer';
import AllProductPage from './Components/AllProductPage/AllProductPage';

function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show Navbar after scrolling 100px (adjust as needed)
      if (window.scrollY > 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div>
      <ModalProvider>
      <LikedItemsProvider>
      <Router>
       {showNavbar && <Navbar />}
       <LoginPopup />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
        <Route path="/product/:id" element={<ProductPageHome/>} />
        <Route path='/products' element={<AllProductPage/>}/>
        <Route path="/products/:id" element={<JewelleryType/>} />
        <Route path="/likes" element={<LikesPage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/payment-page" element={<PaymentPage/>} />
        <Route path="/payment-success" element={<PaymentSuccess/>} />
        </Routes>
        
      </Router>
      </LikedItemsProvider>
      <Footer/>
      </ModalProvider>
    </div>
  )
}

export default App
