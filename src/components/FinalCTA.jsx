import React from 'react';
import '../componentsCss/FinalCTA.css';
import logoIcon from '../assets/logo.png';

export const FinalCTA = () => {
  return (
    <section className="final-cta-section">
      <div className="cta-content">
        {/* Logo acima de tudo */}
        <img src={logoIcon} alt="Royal Silk Logo" className="cta-logo-top" />

        {/* Nome da Marca Empilhado */}
        <div className="brand-name-stacked">
          <span>ROYAL</span>
          <span>SILK</span>
        </div>

        {/* Slogan */}
        <p className="cta-slogan">O QUE SUA PELE PRECISA</p>

        {/* Botão Ver Produtos */}
        <button className="cta-button-final">VER PRODUTOS</button>
      </div>
    </section>
  );
};