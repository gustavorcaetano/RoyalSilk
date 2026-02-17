import React from 'react';
import '../componentsCss/Hero.css';
import perfumeSalto2 from '../assets/perfume-salto3.png';

export const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        
        {/* Parte superior: "DE MELHOR" fica atrás, "PARA UMA PESSOA" fica na frente */}
        <h1 className="hero-title-base">
          <div className="behind">O QUE HÁ <span className="behind-right">DE MELHOR.</span></div> <br />
          <div className="front-row"><span className="front-row-left">PARA UMA</span>  PESSOA</div>
        </h1>

        {/* Container da sobreposição para a última palavra */}
        <div className="overlap-wrapper">
          <img src={perfumeSalto2} alt="Perfume" className="perfume-img" />
          <h1 className="hero-title-front">MELHOR.</h1>
        </div>

      </div>
    </section>
  );
};