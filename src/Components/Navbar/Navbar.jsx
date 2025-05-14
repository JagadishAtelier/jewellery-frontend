import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Atelierlogo from '../../assets/Atelier-logo-nav.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Divisions from '../Divisions/Divisions';
import { useModal } from '../ModalContext/ModalContext';

function Navbar() {
  const { setIsLoginOpen } = useModal();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const openLoginModal = () => setIsLoginOpen(true);
  const toggleSearchInput = () => setIsSearchVisible(prev => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen(prev => !prev);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-mobile">
        <a className="navbar-logo-mobile" href="/">
          <img src={Atelierlogo} alt="Atelier" height="50px" />
        </a>
        <button className="hamburger-menu">
          <i className="bi bi-list fs-3"></i>
        </button>
      </div>

      <div className="navbar-desktop">
        <div className="navbar-logo-desktop">
          <img src={Atelierlogo} alt="Atelier" height="60px" />
          <p>Jewellery</p>
        </div>

        <Divisions />

        <div className="navbar-right-icons d-flex align-items-center">
          <div className="search-icon-wrapper">
            <i className="bi bi-search fs-4" onClick={toggleSearchInput} style={{ cursor: 'pointer' }}></i>
            {isSearchVisible && (
              <input type="text" className="search-input" placeholder="Search..." autoFocus />
            )}
          </div>

          <a href="/likes"><i className="bi bi-heart fs-4 ms-3"></i></a>
          <a href="/cart"><i className="bi bi-bag fs-4 ms-3"></i></a>

          <div className="profile-dropdown ms-3 position-relative">
            <div className="profile-trigger" onClick={toggleProfileMenu} style={{ cursor: 'pointer' }}>
              <i className="bi bi-person-circle fs-4"></i>
            </div>
            {isProfileMenuOpen && (
              <div className="profile-menu">
                {user ? (
                  <>
                    <div className="profile-name">👤 {user.name}</div>
                    <a onClick={logout} style={{ cursor: 'pointer' }}>Logout</a>
                  </>
                ) : (
                  <>
                    <a onClick={openLoginModal}>Sign In</a>
                    <a onClick={openLoginModal}>Sign Up</a>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
