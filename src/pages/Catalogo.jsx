import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { produtosCatalogo } from "../data/produtos";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../pagesCss/Catalogo.css";

export const Catalogo = () => {
  const [produtos] = useState(produtosCatalogo);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const colecoesDestaque = [
    { id: 1, titulo: "COLEÇÃO LUMINA", desc: "A luz que sua pele merece.", produtos: produtos.slice(0, 3) },
    { id: 2, titulo: "TOQUE DE VELUDO", desc: "Texturas que abraçam o rosto.", produtos: produtos.slice(1, 4) },
    { id: 3, titulo: "ESSÊNCIA REAL", desc: "O segredo da beleza eterna.", produtos: produtos.slice(0, 2) },
  ];

  return (
    <div className="catalogo-master">
      {/* 1. ROLETA DE COLEÇÕES REFINADA */}
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
                  <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="slide-title">
                    {col.titulo}
                  </motion.h2>
                  <p className="slide-desc">{col.desc}</p>
                  
                  {/* Fileira horizontal de produtos na roleta */}
                  <div className="slide-products-row">
                    {col.produtos.map((p) => (
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
          
          {/* Controles de texto minimalistas e próximos */}
          <div className="silk-controls">
            <span className="prev-silk silk-nav-text">ANTERIOR</span>
            <div className="control-separator"></div>
            <span className="next-silk silk-nav-text">PRÓXIMO</span>
          </div>
        </div>
      </section>

      {/* ... restante do código anterior (Roleta e Header) ... */}

<div className="amazon-layout-container">
  {/* SIDEBAR RESTAURADA AO NORMAL */}
  <aside className="filters-sidebar">
    <div className="sidebar-section">
      <h3 className="sidebar-title">FILTRAR POR</h3>
      
      <div className="filter-group">
        <h4>CATEGORIA</h4>
        <ul>
          <li className="active">Todos</li>
          <li>Batons</li>
          <li>Olhos</li>
          <li>Pele</li>
          <li>Skin Care</li>
        </ul>
      </div>

      <div className="filter-group">
        <h4>PREÇO</h4>
        <ul>
          <li>Até R$ 150</li>
          <li>R$ 150 - R$ 300</li>
          <li>Acima de R$ 300</li>
        </ul>
      </div>

      <div className="filter-group">
        <h4>CORES</h4>
        <div className="color-options-grid">
          <span className="color-circle red"></span>
          <span className="color-circle nude"></span>
          <span className="color-circle gold"></span>
        </div>
      </div>
    </div>
  </aside>

  {/* CONTEÚDO PRINCIPAL (GRID) */}
  <main className="products-grid-main">
    <div className="grid-header-info">
      <span>{produtos.length} produtos encontrados</span>
      <span className="sort-text-btn">ORDENAR POR ▾</span>
    </div>

    <div className="luxury-4-col-grid">
      {produtos.map((p) => (
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
              {/* Mantendo seu botão favorito */}
              <span className="add-cart-text" onClick={() => setProdutoSelecionado(p)}>+ ADICIONAR</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </main>
</div>

{/* ... Modal mantido sem alterações ... */}

      {/* MODAL DE COMPRA MASTER (RECALIBRADO) */}
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
                  <p className="modal-text-desc">Acabamento impecável e textura ultra-leve. Um ícone da maquiagem moderna.</p>
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