import { useState } from 'react';
import '../componentsCss/ColecaoModal.css';



export const ColecoesSection = () => {
  // Estado para saber qual modal abrir (null = fechado)
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const colecoes = [
    { id: 'lumina', title: 'Coleção Lumina', desc: 'Inspirada no brilho das estrelas para peles radiantes.', img: '../assets/modelo1.png' },
    { id: 'velvet', title: 'Toque de Veludo', desc: 'Texturas suaves e acabamento matte profissional.', img: '../assets/modelo2.png' },
  ];

  return (
    <section className="colecoes-container">
      <div className="grid-modelos">
        {colecoes.map((col) => (
          <div key={col.id} className="modelo-card" onClick={() => setActiveModal(col.id)}>
            <img src={col.img} alt={col.title} />
          </div>
        ))}
      </div>

      {/* O Modal (Só aparece se activeModal não for null) */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setActiveModal(null)}>×</button>
            <div className="modal-glass">
              <span className="modal-icon">⚜</span>
              <h2 className="modal-title">
                {colecoes.find(c => c.id === activeModal)?.title}
              </h2>
              <p className="modal-text">
                {colecoes.find(c => c.id === activeModal)?.desc}
              </p>
              <button className="modal-action">Explorar Coleção</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
