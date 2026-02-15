import React, { useState, useEffect } from "react";
import { useCart } from '../context/CartContext';
import { Link } from "react-router-dom";
import "../componentsCss/Navbar.css";

import logoIcon from "../assets/logo.png";
import userIcon from "../assets/icone-user.png";
import storeIcon from "../assets/icone-compra.png";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Dentro do seu componente Navbar:
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar-container ${isScrolled ? "nav-compact" : "nav-full"} ${isMenuOpen ? "mobile-menu-active" : ""}`}
    >
      <button
        className="hamburger-btn mobile-only"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
        <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
        <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
      </button>

      <div className={`nav-capsule ${isMenuOpen ? "mobile-open" : ""}`}>
        {isMenuOpen && (
          <div className="mobile-menu-header mobile-only">
            <img src={logoIcon} alt="Logo" className="mobile-header-logo" />
            <span className="mobile-header-text">ROYAL SILK</span>
          </div>
        )}

        {/* LADO ESQUERDO */}
        <div className="nav-text-container hide-on-mobile">
          <Link to="/catalogo" className="nav-link-text">
            CATÁLOGO
          </Link>
        </div>
        <Link to="/carrinho" className="nav-icon-link">
          <div className="nav-icon-wrapper">
            <img src={storeIcon} className="nav-icons" alt="Carrinho" />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>
        </Link>

        {/* LOGO */}
        <div className="nav-logo">
          <Link to="/">
            <img src={logoIcon} alt="Logo" className="logo-img-inside" />
          </Link>
        </div>

        {/* LADO DIREITO */}
        <Link to="/usuario" className="nav-icon-link">
          <img
            src={userIcon} className="nav-icons"
            alt="Minha Conta"
            style={{ width: "24px", cursor: "pointer" }}
          />
        </Link>
        <div className="nav-text-container hide-on-mobile">
          <Link to="/ofertas" className="nav-link-text">
            OFERTAS
          </Link>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu-content mobile-only">
            <Link to="/catalogo" onClick={() => setIsMenuOpen(false)}>
              CATÁLOGO
            </Link>
            <Link to="/ofertas" onClick={() => setIsMenuOpen(false)}>
              OFERTAS
            </Link>
            <div className="mobile-menu-icons">
              <img src={storeIcon} alt="Store" />
              <Link to="/usuario" className="nav-icon-link">
                <img
                  src={userIcon}
                  alt="Minha Conta"
                  style={{ width: "24px", cursor: "pointer" }}
                />
              </Link>
            </div>
          </div>
        )}
      </div>

      {!isScrolled && !isMenuOpen && (
        <h2 className="royal-silk-text-under">ROYAL SILK</h2>
      )}
    </nav>
  );
};
