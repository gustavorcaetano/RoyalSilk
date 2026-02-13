import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { Carrinho } from './pages/Carrinho';
import { Usuario } from './pages/Usuario'; // Importando a nova página

function App() {
  // Estados globais de Acessibilidade e Tema
  const [temaEscuro, setTemaEscuro] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  return (
    <Router>
      {/* A div abaixo controla o estilo visual de todo o site */}
      <div 
        className={temaEscuro ? "app-tema-escuro" : "app-tema-claro"} 
        style={{ 
          fontSize: `${fontSize}px`, 
          minHeight: '100vh', 
          transition: 'all 0.3s ease',
          backgroundColor: temaEscuro ? '#1a1a1a' : '#fff',
          color: temaEscuro ? '#fff' : '#1a1a1a'
        }}
      >
        <Navbar temaEscuro={temaEscuro} /> 
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/carrinho" element={<Carrinho />} />
          
          {/* Rota do Usuário passando as funções de controle */}
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