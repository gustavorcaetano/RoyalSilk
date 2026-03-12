import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // 1. Recuperar sessão ao iniciar o app
  useEffect(() => {
    const recuperarSessao = () => {
      try {
        const salvo = localStorage.getItem("royal_silk_session");
        if (salvo) {
          setUsuarioLogado(JSON.parse(salvo));
        }
      } catch (error) {
        console.error("Erro ao recuperar sessão:", error);
        localStorage.removeItem("royal_silk_session");
      } finally {
        setCarregando(false);
      }
    };

    recuperarSessao();
  }, []);

  // 2. Função de Login
  const login = (userData, lembrar) => {
    setUsuarioLogado(userData);
    
    // Se o usuário marcar "Lembrar de mim", salvos no localStorage
    // Caso contrário, os dados ficam apenas no estado (somem ao fechar a aba)
    if (lembrar) {
      localStorage.setItem("royal_silk_session", JSON.stringify(userData));
    } else {
      localStorage.removeItem("royal_silk_session");
    }
  };

  // 3. Função de Logout
  const logout = () => {
    setUsuarioLogado(null);
    localStorage.removeItem("royal_silk_session");
  };

  return (
    <AuthContext.Provider value={{ usuarioLogado, login, logout, carregando }}>
      {!carregando && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};