import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { Carrinho } from './pages/Carrinho';

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;