import React from 'react';
import { useCart } from '../context/CartContext';
import '../pagesCss/Carrinho.css';

export const Carrinho = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const subtotal = cart.reduce((acc, item) => acc + (item.preco * item.quantity), 0);

  return (
    <div className="cart-master-container">
      <h1 className="cart-title">SEU CARRINHO</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart-msg">
          <p>Sua sacola está vazia.</p>
          <a href="/catalogo" className="btn-text-buy">VOLTAR À BOUTIQUE</a>
        </div>
      ) : (
        <div className="cart-content-grid">
          <div className="cart-items-list">
            {cart.map(item => (
              <div key={item.id} className="cart-item-card">
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
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>REMOVER</button>
              </div>
            ))}
          </div>

          <div className="cart-summary-card">
            <h3>RESUMO</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>TOTAL</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <button className="btn-text-buy full-width">FINALIZAR COMPRA</button>
          </div>
        </div>
      )}
    </div>
  );
};