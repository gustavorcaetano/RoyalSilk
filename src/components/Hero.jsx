import React from 'react';
import '../componentsCss/Hero.css';
// import perfumeSalto from '../assets/perfume-salto.png'; 
import perfumeSalto2 from '../assets/perfume-salto2.png';

export const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        
        {/* Parte superior do texto */}
        <h1 className="hero-title-base">
          O QUE HÁ DE MELHOR. <br />
          PARA UMA PESSOA
        </h1>

        {/* Container da sobreposição */}
        <div className="overlap-wrapper">
          <img src={perfumeSalto2} alt="Perfume" className="perfume-img" />
          <h1 className="hero-title-front">MELHOR.</h1>
        </div>

      </div>
    </section>
  );
};