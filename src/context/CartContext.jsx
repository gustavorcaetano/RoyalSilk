import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { usuarioLogado } = useAuth();
  const [cart, setCart] = useState([]);

  // 1. CARREGAR: Sempre que o usuário logar, busca o carrinho específico dele
  useEffect(() => {
    if (usuarioLogado && usuarioLogado.email) {
      const savedCart = localStorage.getItem(`cart_${usuarioLogado.email}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]); // Se o usuário não tiver carrinho salvo, inicia vazio
      }
    } else {
      setCart([]); // Se deslogar, limpa o estado do carrinho imediatamente
    }
  }, [usuarioLogado]);

  // 2. SALVAR: Sempre que o carrinho mudar, salva na chave do usuário logado
  useEffect(() => {
    if (usuarioLogado && usuarioLogado.email) {
      localStorage.setItem(`cart_${usuarioLogado.email}`, JSON.stringify(cart));
    }
  }, [cart, usuarioLogado]);

  // 3. ADICIONAR: Verifica se existe e incrementa ou adiciona novo
  const addToCart = (product) => {
    // Trava de segurança extra (opcional, já que você bloqueia no botão do catálogo)
    if (!usuarioLogado) return;

    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // 4. REMOVER: Filtra o ID selecionado
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // 5. ATUALIZAR QUANTIDADE: Garante que nunca seja menor que 1
  const updateQuantity = (id, amount) => {
    setCart(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + amount) } 
        : item
    ));
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para facilitar o uso nos componentes
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};