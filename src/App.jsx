import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageWrapper } from './components/PageWrapper';

// Páginas
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { Carrinho } from './pages/Carrinho';
import { Usuario } from './pages/Usuario';

// Contextos
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Estilos globais (se houver)
import './App.css';

function App() {
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  // Sincroniza o tema com o atributo do documento para CSS
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', temaEscuro ? 'dark' : 'light');
  }, [temaEscuro]);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div 
            className="app-main-wrapper"
            style={{ 
              fontSize: `${fontSize}px`, 
              minHeight: '100vh', 
              display: 'flex',
              flexDirection: 'column',
              transition: 'background-color 0.5s ease, color 0.5s ease',
              backgroundColor: temaEscuro ? '#0a0a0a' : '#ffffff',
              color: temaEscuro ? '#ffffff' : '#000000'
            }}
          >
            {/* Passando o estado do tema para o Navbar caso ele precise mudar ícones */}
            <Navbar temaEscuro={temaEscuro} /> 
            
            {/* O PageWrapper ajuda nas transições de página e scroll ao topo */}
            <main style={{ flex: 1 }}>
              <PageWrapper>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalogo" element={<Catalogo />} />
                  <Route path="/carrinho" element={<Carrinho />} />
                  <Route path="/usuario" element={
                    <Usuario 
                      temaEscuro={temaEscuro} 
                      setTemaEscuro={setTemaEscuro} 
                      fontSize={fontSize} 
                      setFontSize={setFontSize} 
                    />
                  } />
                </Routes>
              </PageWrapper>
            </main>

            <Footer temaEscuro={temaEscuro} />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;