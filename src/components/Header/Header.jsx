import React, { useEffect, useRef, useState } from "react";
import "./header.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import useMobileNav from "../../hooks/useMobileNav";

const Header = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const userIconRef = useRef(null);
  const profilePopupRef = useRef(null);
  const { toggleMobileNav, isMobileNavOpen } = useMobileNav();

  // Toggle popup khi click vào user icon
  const togglePopup = (e) => {
    e.preventDefault();
    setIsPopupVisible((prev) => !prev);
    // let value = !isPopupVisible;
    // setIsPopupVisible(value)
  };

  // Ẩn popup khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userIconRef.current &&
        profilePopupRef.current &&
        !userIconRef.current.contains(e.target) &&
        !profilePopupRef.current.contains(e.target)
      ) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header>
        <img src={assets.logo} className="logo" />
        <input type="text" placeholder="Search..." className="search-input" />

        {!isMobileNavOpen && (
          <i className="bx bx-menu menu-icon" onClick={toggleMobileNav}></i>
        )}
        {/* <!-- Desktop menu --> */}
        <div className="desktop-menu">
          <i className="bx bx-sun" id="theme-toggle" title="Toggle Theme"></i>
          <a onClick={() => navigate("/reset-password")}>
            <i className="bx bx-lock" title="Password and Security"></i>
          </a>
          <a href="#">
            <i
              className="bx bx-user"
              id="user-icon"
              title="My Profile"
              onClick={(e) => togglePopup(e)}
              ref={userIconRef}
            ></i>
          </a>

          {/* Profile popup */}
          {isPopupVisible && (
            <div
              className="profile-popup"
              id="profile-popup"
              ref={profilePopupRef}
            >
              <a onClick={() => navigate("/profile")}>My Profile</a>
              <a href="#" id="logout-btn">
                Logout
              </a>
            </div>
          )}
        </div>
      </header>

      {isMobileNavOpen && (
        <>
          {/* <!-- Close mobile menu --> */}
          <div className="close-icon">
            <i className="bx bx-x" onClick={() => toggleMobileNav()}></i>
          </div>

          {/* <!-- Mobile Menu --> */}
          <div id="mobile-menu" className="mobile-menu">
            <div className="menu-content">
              <a href="Profile.html">My Profile</a>
              <a href="reset-password.html">Password and Security</a>
              <hr />
              <div className="toggle-theme">
                <i className="bx bx-sun" id="theme-icon"></i>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
