import React from 'react';
import '../componentsCss/Hero.css';
import perfumeSalto2 from '../assets/perfume-salto3.png';

export const Hero = () => {
  return (
   <section className="hero-container">
      <div className="hero-layout">
        
        {/* LADO ESQUERDO: 3 LINHAS */}
        <div className="hero-side left">
          <h1 className="hero-text">O QUE</h1>
          <h1 className="hero-text">HÁ DE</h1>
          <h1 className="hero-text text-gray">MELHOR.</h1>
        </div>

        <div className="hero-center">
          <img src={perfumeSalto2} className="perfume-img-new" alt="Perfume" />
        </div>

        {/* LADO DIREITO: 3 LINHAS */}
        <div className="hero-side right">
          <h1 className="hero-text text-gray">PARA</h1>
          <h1 className="hero-text">UMA PESSOA</h1>
          <h1 className="hero-text">MELHOR.</h1>
        </div>

      </div>
    </section>
  );
};