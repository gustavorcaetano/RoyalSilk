import React from 'react';
import '../componentsCss/Hero.css';
import perfumeSalto2 from '../assets/perfume-salto2.png';

export const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        
        {/* Parte superior: "DE MELHOR" fica atrás, "PARA UMA PESSOA" fica na frente */}
        <h1 className="hero-title-base">
          <span className="behind">O QUE HÁ DE MELHOR.</span> <br />
          <span className="front-row">PARA UMA PESSOA</span>
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