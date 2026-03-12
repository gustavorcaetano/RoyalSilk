import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const WelcomeOverlay = ({ nome, onComplete }) => {
  const overlayRef = useRef();
  const textRef = useRef();
  const goldBarRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    // Animação de entrada
    tl.to(overlayRef.current, { opacity: 1, duration: 0.5 })
      .fromTo(textRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      )
      // Efeito de brilho dourado passando pela tela
      .fromTo(goldBarRef.current, 
        { x: "-100%" }, 
        { x: "200%", duration: 1.5, ease: "slow(0.7, 0.7, false)" }, 
        "-=0.5"
      )
      // Saída luxuosa
      .to(overlayRef.current, { 
        clipPath: "circle(0% at 50% 50%)", 
        duration: 1, 
        delay: 0.8, 
        ease: "expo.inOut" 
      });
  }, [onComplete]);

  return (
    <div ref={overlayRef} style={overlayStyle}>
      <div ref={goldBarRef} style={goldBarStyle} />
      <div ref={textRef} style={{ textAlign: 'center', zIndex: 2 }}>
        <h2 style={titleStyle}>BEM-VINDO À REALEZA</h2>
        <h1 style={nameStyle}>{nome.toUpperCase()}</h1>
        <div style={lineStyle} />
      </div>
    </div>
  );
};

// Estilos inline para garantir o visual de luxo
const overlayStyle = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: '#0a0a0a', color: '#D4AF37',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  zIndex: 9999, opacity: 0, clipPath: "circle(150% at 50% 50%)"
};

const goldBarStyle = {
  position: 'absolute', width: '40%', height: '100%',
  background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)',
  transform: 'skewX(-20deg)', pointerEvents: 'none'
};

const titleStyle = { letterSpacing: '8px', fontSize: '1rem', fontWeight: '300' };
const nameStyle = { fontSize: '3.5rem', fontFamily: 'serif', margin: '10px 0' };
const lineStyle = { width: '80px', height: '2px', backgroundColor: '#D4AF37', margin: '20px auto' };