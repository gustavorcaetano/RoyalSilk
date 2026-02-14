import React from 'react';
import { Link } from 'react-router-dom';
import '../componentsCss/Footer.css';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Coluna 1: Logo e Missão */}
        <div className="footer-column">
          <h3 className="footer-logo">ROYAL SILK</h3>
          <p className="footer-description">
            Sua dose diária de luxo e cuidado. <br />
            Cosméticos pensados para realçar <br />
            a sua essência real.
          </p>
        </div>

        {/* Coluna 2: Navegação com Link do React Router */}
        <div className="footer-column">
          <h4>EXPLORE</h4>
          <ul>
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/ofertas">Ofertas</Link></li>
            <li><Link to="/sobre">Nossa História</Link></li>
            <li><Link to="/usuario">Minha Conta</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Contato */}
        <div className="footer-column">
          <h4>ATENDIMENTO</h4>
          <p>📍 Av. Principal, 973 - São Paulo</p>
          <p>✉️ contato@royalsilk.com.br</p>
          <p>📞 (11) 4002-8922</p>
        </div>

        {/* Coluna 4: Redes Sociais */}
        <div className="footer-column">
          <h4>CONECTE-SE</h4>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
            <a href="https://whatsapp.com" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Royal Silk Cosmetics. Todos os direitos reservados.</p>
        <p style={{ marginTop: '5px', opacity: 0.6 }}>Desenvolvido com elegância real.</p>
      </div>
    </footer>
  );
};