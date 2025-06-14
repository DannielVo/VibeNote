import React, { useEffect, useRef, useState } from "react";
import "./header.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import useMobileNav from "../../hooks/useMobileNav";
import useDarkMode from "../../hooks/useDarkMode";
import API from "../../hooks/api";
import { useNote } from "../../context/NoteContext";

const Header = () => {
  const navigate = useNavigate();
  const { logout, noteSearchTerm, setNoteSearchTerm } = useNote();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const userIconRef = useRef(null);
  const profilePopupRef = useRef(null);
  const { toggleMobileNav, isMobileNavOpen } = useMobileNav();
  const { themeIconMobile, themeToggleDesktop, toggleTheme } = useDarkMode();
  const [loadingLogout, setLoadingLogout] = useState(false);

  // Toggle popup khi click vào user icon
  const togglePopup = (e) => {
    e.preventDefault();
    setIsPopupVisible((prev) => !prev);
    // let value = !isPopupVisible;
    // setIsPopupVisible(value)
  };

  const handleLogout = async () => {
    try {
      setLoadingLogout(true);
      await API.post("/logout");
      logout();
      // alert("Đã đăng xuất");
      setLoadingLogout(false);
      navigate("/login");
    } catch (error) {
      setLoadingLogout(false);
      alert("Logout lỗi", error);
    }
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
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={noteSearchTerm}
          onChange={(e) => setNoteSearchTerm(e.target.value)}
        />

        {!isMobileNavOpen && (
          <i className="bx bx-menu menu-icon" onClick={toggleMobileNav}></i>
        )}
        {/* <!-- Desktop menu --> */}
        <div className="desktop-menu">
          <i
            className="bx bx-moon"
            id="theme-desktop-icon"
            title="Toggle Theme"
            ref={themeToggleDesktop}
            onClick={toggleTheme}
          ></i>
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
              <a href="#" id="logout-btn" onClick={handleLogout}>
                {loadingLogout ? "Logout..." : "Logout"}
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
              <a onClick={() => navigate("/profile")}>My Profile</a>
              <a onClick={() => navigate("/reset-password")}>
                Password and Security
              </a>
              <a onClick={handleLogout}>
                {loadingLogout ? "Logout..." : "Logout"}
              </a>
              <hr />
              <div className="toggle-theme">
                <i
                  className="bx bx-moon"
                  id="theme-mobile-icon"
                  ref={themeIconMobile}
                  onClick={toggleTheme}
                ></i>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
