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
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`navbar-container ${isScrolled ? "nav-compact" : "nav-full"} ${isMenuOpen ? "mobile-menu-active" : ""}`}>
      
      {/* Botão Hambúrguer - Visível apenas no Mobile */}
      <button className="hamburger-btn mobile-only" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
        <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
        <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
      </button>

      <div className={`nav-capsule ${isMenuOpen ? "mobile-open" : ""}`}>
        
        {/* Estrutura Desktop (Mantida) */}
        <div className="nav-text-container hide-on-mobile">
          <Link to="/catalogo" className="nav-link-text">CATÁLOGO</Link>
        </div>
        
        <Link to="/carrinho" className="nav-icon-link hide-on-mobile">
          <div className="nav-icon-wrapper">
            <img src={storeIcon} className="nav-icons" alt="Carrinho" />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>
        </Link>

        {/* Logo Central */}
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logoIcon} alt="Logo" className="logo-img-inside" />
          </Link>
        </div>

        <Link to="/usuario" className="nav-icon-link hide-on-mobile">
          <img src={userIcon} className="nav-icons" alt="Minha Conta" />
        </Link>
        
        <div className="nav-text-container hide-on-mobile">
          <Link to="/ofertas" className="nav-link-text">OFERTAS</Link>
        </div>

        {/* OVERLAY MOBILE - Estilo da Imagem */}
        {isMenuOpen && (
          <div className="mobile-menu-content mobile-only">
            <div className="mobile-links-wrapper">
              <Link to="/" onClick={closeMenu}>INÍCIO</Link>
              <Link to="/catalogo" onClick={closeMenu}>CATÁLOGO</Link>
              <Link to="/ofertas" onClick={closeMenu}>OFERTAS</Link>
              <Link to="/usuario" onClick={closeMenu}>MINHA CONTA</Link>
              
              <Link to="/carrinho" onClick={closeMenu} className="mobile-cart-btn">
                CARRINHO ({totalItems})
              </Link>
            </div>
            <p className="mobile-footer-brand">ROYAL SILK</p>
          </div>
        )}
      </div>

      {!isScrolled && !isMenuOpen && (
        <h2 className="royal-silk-text-under">ROYAL SILK</h2>
      )}
    </nav>
  );
};