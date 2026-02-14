  import React, { useState, useEffect } from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import { Navbar } from './components/Navbar';
  import { Footer } from './components/Footer';
  import { Home } from './pages/Home';
  import { Catalogo } from './pages/Catalogo';
  import { Carrinho } from './pages/Carrinho';
  import { Usuario } from './pages/Usuario';

 function App() {
  const [temaEscuro, setTemaEscuro] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', temaEscuro ? 'dark' : 'light');
  }, [temaEscuro]);

  return (
    <Router>
      <div 
        className="app-main-wrapper"
        style={{ 
          fontSize: `${fontSize}px`, 
          minHeight: '100vh', 
          transition: 'background-color 0.5s ease', // Transição suave de cor
          backgroundColor: temaEscuro ? '#0a0a0a' : '#ffffff', // CORREÇÃO AQUI
          color: temaEscuro ? '#ffffff' : '#000000'
        }}
      >
        <Navbar temaEscuro={temaEscuro} /> 
        
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

        <Footer temaEscuro={temaEscuro} />
      </div>
    </Router>
  );
}

  export default App;