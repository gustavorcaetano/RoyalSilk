import React from 'react';
import '../componentsCss/Footer.css';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'; // Instale: npm install react-icons

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Coluna 1: Sobre / Logo */}
        <div className="footer-column">
          <h3 className="footer-logo">ROYAL SILK</h3>
          <p className="footer-description">
            Sua dose diária de luxo e cuidado. <br />
            Cosméticos pensados para realçar <br />
            a sua essência real.
          </p>
        </div>

        {/* Coluna 2: Links Rápidos */}
        <div className="footer-column">
          <h4>EXPLORE</h4>
          <ul>
            <li><a href="#catalogo">Catálogo</a></li>
            <li><a href="#ofertas">Ofertas</a></li>
            <li><a href="#sobre">Nossa História</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div>

        {/* Coluna 3: Atendimento / Loja */}
        <div className="footer-column">
          <h4>LOJA</h4>
          <p>📍 Av. Principal, 973 - São Paulo</p>
          <p>✉️ contato@royalsilk.com.br</p>
          <p>📞 (11) 4002-8922</p>
        </div>

        {/* Coluna 4: Redes Sociais */}
        <div className="footer-column">
          <h4>SIGA-NOS</h4>
          <div className="social-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaWhatsapp /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Royal Silk Cosmetics. Todos os direitos reservados.</p>
        <p>Desenvolvido com elegância.</p>
      </div>
    </footer>
  );
};