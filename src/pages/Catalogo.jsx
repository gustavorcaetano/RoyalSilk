import React, { useState, useEffect, useMemo } from "react";
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
  
  const [produtos] = useState(produtosCatalogo);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filtros e Ordenação
  const [filtroAtivo, setFiltroAtivo] = useState(location.state?.filterId || 'todos');
  const [ordem, setOrdem] = useState('default');

  useEffect(() => {
    if (location.state?.filterId) {
      setFiltroAtivo(location.state.filterId);
    }
  }, [location.state]);

  // LÓGICA DE FILTRAGEM E ORDENAÇÃO (USEMEMO PARA PERFORMANCE)
  const produtosProcessados = useMemo(() => {
    // 1. Filtrar
    let resultado = (filtroAtivo === 'todos' || !filtroAtivo)
      ? [...produtos]
      : produtos.filter(p => 
          String(p.colecaoId) === String(filtroAtivo) || 
          p.categoria === filtroAtivo ||
          p.colecaoNome === filtroAtivo
        );

    // 2. Ordenar
    if (ordem === 'preco-crescente') resultado.sort((a, b) => a.preco - b.preco);
    if (ordem === 'preco-decrescente') resultado.sort((a, b) => b.preco - a.preco);
    if (ordem === 'alfabetica') resultado.sort((a, b) => a.nome.localeCompare(b.nome));

    return resultado;
  }, [produtos, filtroAtivo, ordem]);

  const colecoesDestaque = [
    { id: 1, titulo: "L'OR ESSENTIAL ", desc: "A pureza do minimalismo encontra a nobreza do ouro.", itens: produtos.slice(0, 3) },
    { id: 2, titulo: "HÉRITAGE DE SOIE", desc: "A essência da Royal Silk em sua forma mais pura.", itens: produtos.slice(1, 4) },
    { id: 3, titulo: "VELOURS IMPÉRIAL", desc: "Onde o conforto encontra a opulência extrema.", itens: produtos.slice(0, 2) },
  ];

  return (
    <div className="catalogo-master">
      <section className="roleta-colecoes">
        <div className="swiper-custom-wrapper">
          <Swiper
            modules={[Navigation, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
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
                    {col.itens.slice(0, 3).map((p) => (
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

      <div className="mobile-filter-trigger-container">
        <button className="mobile-filter-btn" onClick={() => setIsFilterOpen(true)}>
          FILTRAR E ORDENAR ▾
        </button>
      </div>

      <div className="amazon-layout-container">
        <aside className={`filters-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="sidebar-content">
            <div className="mobile-only sidebar-header-mobile">
              <span>FILTROS</span>
              <span className="close-filters" onClick={() => setIsFilterOpen(false)}>X</span>
            </div>

            {/* SEÇÃO DE CATEGORIAS */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">CATEGORIAS</h3>
              <ul className="filter-list">
                <li className={filtroAtivo === 'todos' ? 'active' : ''} onClick={() => { setFiltroAtivo('todos'); setIsFilterOpen(false); }}>Todos os Produtos</li>
                <li className={filtroAtivo === 'batons' ? 'active' : ''} onClick={() => { setFiltroAtivo('batons'); setIsFilterOpen(false); }}>Batons</li>
                <li className={filtroAtivo === 'pele' ? 'active' : ''} onClick={() => { setFiltroAtivo('pele'); setIsFilterOpen(false); }}>Pele & Cuidados</li>
              </ul>
            </div>

            {/* SEÇÃO DE COLEÇÕES */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">COLEÇÕES</h3>
              <ul className="filter-list">
                <li className={filtroAtivo === '1' ? 'active' : ''} onClick={() => { setFiltroAtivo('1'); setIsFilterOpen(false); }}>L'Or Essential</li>
                <li className={filtroAtivo === '2' ? 'active' : ''} onClick={() => { setFiltroAtivo('2'); setIsFilterOpen(false); }}>Héritage de Soie</li>
                <li className={filtroAtivo === '3' ? 'active' : ''} onClick={() => { setFiltroAtivo('3'); setIsFilterOpen(false); }}>Velours Impérial</li>
              </ul>
            </div>

            {/* ORDENAÇÃO MOBILE (Dentro da sidebar para melhor UX) */}
            <div className="sidebar-section mobile-only">
              <h3 className="sidebar-title">ORDENAR POR</h3>
              <select className="mobile-sort-select" value={ordem} onChange={(e) => {setOrdem(e.target.value); setIsFilterOpen(false);}}>
                <option value="default">Relevância</option>
                <option value="preco-crescente">Menor Preço</option>
                <option value="preco-decrescente">Maior Preço</option>
                <option value="alfabetica">A - Z</option>
              </select>
            </div>
          </div>
        </aside>

        <main className="products-grid-main">
          <div className="grid-header-info">
            <span className="count-info">{produtosProcessados.length} produtos encontrados</span>
            <div className="sort-container hide-on-mobile">
              <label>ORDENAR POR:</label>
              <select className="silk-select" value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                <option value="default">Destaques</option>
                <option value="preco-crescente">Menor Preço</option>
                <option value="preco-decrescente">Maior Preço</option>
                <option value="alfabetica">Nome (A - Z)</option>
              </select>
            </div>
          </div>

          <div className="luxury-4-col-grid">
            {produtosProcessados.length > 0 ? (
              produtosProcessados.map((p) => (
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
                <p>Nenhum produto encontrado.</p>
                <button onClick={() => setFiltroAtivo('todos')}>Limpar Filtros</button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MODAL (Mantido igual) */}
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
                  <p className="modal-text-desc">Qualidade premium Royal Silk feita para quem busca o extraordinário.</p>
                  <span className="modal-price-silk">R$ {produtoSelecionado.preco.toFixed(2)}</span>
                  <div className="action-row-silk">
                    <button className="btn-text-buy" onClick={() => { addToCart(produtoSelecionado); setProdutoSelecionado(null); }}>ADICIONAR AO CARRINHO</button>
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