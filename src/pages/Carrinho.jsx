import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Importação corrigida
import { useNavigate, Link } from 'react-router-dom'; // Importação corrigida
import { motion, AnimatePresence } from 'framer-motion';
import '../pagesCss/Carrinho.css';

export const Carrinho = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { usuarioLogado } = useAuth();
  const navigate = useNavigate();

  // Cálculo do subtotal dinâmico
  const subtotal = cart.reduce((acc, item) => acc + (item.preco * item.quantity), 0);

  // Se o usuário não estiver logado, exibe a trava de segurança
  if (!usuarioLogado) {
    return (
      <div className="cart-master-container forbidden-view">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="auth-needed-card"
        >
          <div className="gold-lock-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h2>ACESSO RESTRITO</h2>
          <p>Seu carrinho é um espaço pessoal e seguro. Faça login para acessar seus itens salvos.</p>
          <button className="btn-gold-silk" onClick={() => navigate("/usuario")}>
            ACESSAR MINHA CONTA
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-master-container">
      <h1 className="cart-title">SEU CARRINHO</h1>
      
      {cart.length === 0 ? (
        <motion.div 
          className="empty-cart-msg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>Sua sacola está vazia.</p>
          {/* Usando Link para navegação interna mais fluida */}
          <Link to="/catalogo" className="btn-text-buy">VOLTAR À BOUTIQUE</Link>
        </motion.div>
      ) : (
        <div className="cart-content-grid">
          <div className="cart-items-list">
            <AnimatePresence mode='popLayout'>
              {cart.map(item => (
                <motion.div 
                  key={item.id} 
                  className="cart-item-card"
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="cart-item-main">
                    <img src={item.img} alt={item.nome} />
                    <div className="item-details">
                      <h4>{item.nome}</h4>
                      <p className="item-price">R$ {item.preco.toFixed(2)}</p>
                      <div className="qty-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>REMOVER</button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div 
            className="cart-summary-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>RESUMO</h3>
            <div className="summary-info">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Frete</span>
                <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>GRÁTIS</span>
              </div>
              <div className="summary-row total">
                <span>TOTAL</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="btn-text-buy full-width">FINALIZAR COMPRA</button>
          </motion.div>
        </div>
      )}
    </div>
  );
};