import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { produtosCatalogo } from "../data/produtos";
import { useCart } from '../context/CartContext';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../pagesCss/Catalogo.css";

export const Catalogo = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  
  // Estados principais
  const [produtos] = useState(produtosCatalogo);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  
  // Inicializa o filtro: Prioridade para o estado da rota, se não, 'todos'
  const [filtroAtivo, setFiltroAtivo] = useState(location.state?.filterId || 'todos');

  // Sincroniza o filtro caso o usuário mude de coleção enquanto já está no catálogo
  useEffect(() => {
    if (location.state?.filterId) {
      setFiltroAtivo(location.state.filterId);
    }
  }, [location.state]);

  // LÓGICA DE FILTRAGEM REFORÇADA
  const produtosFiltrados = (filtroAtivo === 'todos' || !filtroAtivo)
    ? produtos 
    : produtos.filter(p => String(p.colecaoId) === String(filtroAtivo));

  // Dados das coleções para a roleta
  const colecoesDestaque = [
    { id: 1, titulo: "L'OR ESSENTIAL ", desc: "A pureza do minimalismo encontra a nobreza do ouro.", itens: produtos.slice(0, 3) },
    { id: 2, titulo: "HÉRITAGE DE SOIE", desc: "A essência da Royal Silk em sua forma mais pura.", itens: produtos.slice(1, 4) },
    { id: 3, titulo: "VELOURS IMPÉRIAL", desc: "Onde o conforto encontra a opulência extrema.", itens: produtos.slice(0, 2) },
  ];

  return (
    <div className="catalogo-master">
      {/* SEÇÃO DA ROLETA (SWIPER) */}
      <section className="roleta-colecoes">
        <div className="swiper-custom-wrapper">
          <Swiper
            modules={[Navigation, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }} // Evita sobreposição de texto
            navigation={{ nextEl: ".next-silk", prevEl: ".prev-silk" }}
            pagination={{ clickable: true }}
            loop={true}
            className="mySwiper"
          >
            {colecoesDestaque.map((col) => (
              <SwiperSlide key={col.id}>
                <div className="colecao-slide-content">
                  <h2 className="slide-title">{col.titulo}</h2>
                  <p className="slide-desc">{col.desc}</p>
                  
                  <div className="slide-products-row">
                    {col.itens.map((p) => (
                      <div key={p.id} className="mini-card-silk" onClick={() => setProdutoSelecionado(p)}>
                        <img src={p.img} alt={p.nome} />
                        <span className="text-link-silk">VER DETALHES</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="silk-controls">
            <span className="prev-silk silk-nav-text">ANTERIOR</span>
            <div className="control-separator"></div>
            <span className="next-silk silk-nav-text">PRÓXIMO</span>
          </div>
        </div>
      </section>

      {/* GRID DE PRODUTOS E SIDEBAR */}
      <div className="amazon-layout-container">
        <aside className="filters-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">FILTRAR POR</h3>
            <div className="filter-group">
              <h4>CATEGORIA</h4>
              <ul>
                <li 
                  className={filtroAtivo === 'todos' ? 'active' : ''} 
                  onClick={() => setFiltroAtivo('todos')}
                >
                  Todos
                </li>
                <li onClick={() => setFiltroAtivo('batons')}>Batons</li>
                <li onClick={() => setFiltroAtivo('pele')}>Pele</li>
              </ul>
            </div>
          </div>
        </aside>

        <main className="products-grid-main">
          <div className="grid-header-info">
            <span>{produtosFiltrados.length} produtos encontrados</span>
            <span className="sort-text-btn">ORDENAR POR ▾</span>
          </div>

          <div className="luxury-4-col-grid">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((p) => (
                <div key={p.id} className="grid-product-card">
                  <div className="img-holder-silk">
                    <img src={p.img} alt={p.nome} />
                    <div className="overlay-silk" onClick={() => setProdutoSelecionado(p)}>
                      <span className="text-link-white">DETALHES</span>
                    </div>
                  </div>
                  <div className="info-holder-silk">
                    <p className="p-brand">ROYAL SILK</p>
                    <h4>{p.nome}</h4>
                    <div className="p-footer-silk">
                      <span className="p-price">R$ {p.preco.toFixed(2)}</span>
                      <span className="add-cart-text" onClick={() => addToCart(p)}>+ ADICIONAR</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>Nenhum produto encontrado para este filtro.</p>
                <button onClick={() => setFiltroAtivo('todos')}>Ver todos os produtos</button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MODAL DE DETALHES */}
      <AnimatePresence>
        {produtoSelecionado && (
          <motion.div className="modal-overlay-silk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setProdutoSelecionado(null)}>
            <motion.div className="modal-compact-container" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()}>
              <span className="close-silk-text" onClick={() => setProdutoSelecionado(null)}>FECHAR</span>
              <div className="modal-compact-body">
                <div className="modal-compact-img">
                  <img src={produtoSelecionado.img} alt={produtoSelecionado.nome} />
                </div>
                <div className="modal-compact-info">
                  <span className="modal-tag">BOUTIQUE EXCLUSIVE</span>
                  <h2 className="modal-name">{produtoSelecionado.nome}</h2>
                  <p className="modal-text-desc">Qualidade premium Royal Silk.</p>
                  <span className="modal-price-silk">R$ {produtoSelecionado.preco.toFixed(2)}</span>
                  <div className="action-row-silk">
                    <span className="btn-text-buy">CONFIRMAR COMPRA</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};