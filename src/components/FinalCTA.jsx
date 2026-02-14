import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../componentsCss/FinalCTA.css';
import logoIcon from '../assets/logo.png';

export const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="final-cta-section">
      <motion.div 
        className="cta-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Logo */}
        <img src={logoIcon} alt="Royal Silk Logo" className="cta-logo-top" />

        {/* Nome da Marca Empilhado */}
        <div className="brand-name-stacked">
          <motion.span 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ROYAL
          </motion.span>
          <motion.span
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            SILK
          </motion.span>
        </div>

        {/* Slogan */}
        <p className="cta-slogan">O QUE SUA PELE PRECISA</p>

        {/* Botão Ver Produtos */}
        <motion.button 
          className="cta-button-final"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/catalogo')}
        >
          VER PRODUTOS
        </motion.button>
      </motion.div>
    </section>
  );
};