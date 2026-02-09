import React from 'react';
import '../componentsCss/ProductCard.css';

const ProductCard = ({ name, price, image }) => {
  return (
    <div className="product-card">
      {/* Título do Produto em Dourado */}
      <h3 className="product-name">{name}</h3>
      
      {/* Imagem do Produto */}
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
      </div>

      {/* Botão de Preço Oval */}
      <button className="price-button">
        R$ {price}
      </button>
    </div>
  );
};

export default ProductCard;