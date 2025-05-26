import React, { useState, useEffect } from 'react';
import './Navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Divisions from '../Divisions/Divisions';
import { useModal } from '../ModalContext/ModalContext';

function Navbar() {
  const { setIsLoginOpen } = useModal();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="navbar-container">
      {/* Mobile Navbar */}
      <div className="navbar-mobile">
        <div className="navbar-logo-mobile">
          <a href='/' className="logo-text-mobile">Jewellery</a>
        </div>
        <button className="hamburger-menu" onClick={toggleMobileMenu}>
          <i className="bi bi-list fs-3"></i>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <a href="/">Home</a>
          <a href="/about-us">About</a>
          <a href="/find-us">Find us</a>
          {user ? (
            <>
              <div className="profile-name"> {user.name}</div>
              <a onClick={logout} style={{ cursor: 'pointer' }}>Logout</a>
            </>
          ) : (
            <>
              <a onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }}>Sign In</a>
              <a onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }}>Sign Up</a>
            </>
          )}
        </div>
      )}

      {/* Desktop Navbar */}
      <div className="navbar-desktop">
        <div className="navbar-logo-desktop">
          <a href='/' className="logo-text-mobile">Jewellery</a>
        </div>

        <Divisions />

        <div className="navbar-right-icons d-flex align-items-baseline !mportant">

          <a href="/likes"><i className="bi bi-heart fs-4 ms-3"></i></a>
          <a href="/cart"><i className="bi bi-bag fs-4 ms-3"></i></a>

          <div className="profile-dropdown ms-3 position-relative">
            <div className="profile-trigger" onClick={toggleProfileMenu}>
              <i className="bi bi-person-circle fs-4"></i>
            </div>
            {isProfileMenuOpen && (
              <div className="profile-menu">
                {user ? (
                  <>
                    <div className="profile-name"> {user.name}</div>
                    <a onClick={logout}>Logout</a>
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
