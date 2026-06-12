import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Hero.css";

const Header = () => {

  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".site-header");

      if (window.scrollY > 50) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    document.querySelector(".mobile-nav")?.classList.toggle("open");
  };

  return (
    <header className={`site-header ${isHome ? "home-header" : ""}`}>
      <div className="container header-container">

        {/* Logo */}
        <div className="header-logo">
          <img
            src="/Images/logo.png"
            alt="Crown Dental"
            className="logo-img"
          />
        </div>

        {/* Navigation */}
        <nav className="header-nav desktop-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/treatments" className="nav-link">Treatments</Link>
          <Link to="/doctors" className="nav-link">Doctors</Link>
          <Link to="/Gallery" className="nav-link">Gallery</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          ☰
        </div>
      </div>

      {/* Mobile Nav */}
      <nav className="mobile-nav">
        <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>Home</Link>
        <Link to="/treatments" className="mobile-nav-link" onClick={toggleMobileMenu}>Treatments</Link>
        <Link to="/doctors" className="mobile-nav-link" onClick={toggleMobileMenu}>Doctors</Link>
        <Link to="/Gallery" className="mobile-nav-link" onClick={toggleMobileMenu}>Gallery</Link>
        <Link to="/about" className="mobile-nav-link" onClick={toggleMobileMenu}>About</Link>
        <Link to="/contact" className="mobile-nav-link" onClick={toggleMobileMenu}>Contact</Link>
      </nav>
    </header>
  );
};

export default Header;

