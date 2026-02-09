import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colecoes } from '../data/colecoes';
import '../componentsCss/ColecaoModal.css'; 
import '../componentsCss/ModelGrid.css';

export const ModelGrid = () => {
  const [activeModal, setActiveModal] = useState(null);

  // Variantes para a animação de entrada dos cards (Cascata)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="model-grid-section">
      <motion.div 
        className="model-card-wrapper"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {colecoes.map((col, index) => (
          <motion.div 
            key={col.id} 
            className={`model-container pos-${index}`}
            variants={itemVariants}
          >
            <motion.div 
              className="model-card" 
              onClick={() => setActiveModal(col)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={col.img} alt={col.gridTitle} className="model-image" />
              <div className="modelo-info-overlay">
                <span className="modelo-label">Explorar</span>
              </div>
            </motion.div>
            <h3 className="model-caption">{col.gridTitle}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* AnimatePresence gerencia a saída do modal da árvore do DOM */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            className="modal-overlay" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div 
              className="modal-content-glass" 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setActiveModal(null)}>×</button>
              
              <div className="modal-body-content">
                <h4 className="modal-subtitle">{activeModal.subTitle}</h4>
                <h2 className="modal-title">{activeModal.modalTitle}</h2>
                <p className="modal-text">{activeModal.desc}</p>
                <motion.button 
                  className="modal-action-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explorar Coleção
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};