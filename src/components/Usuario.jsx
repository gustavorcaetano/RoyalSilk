// service_be82pnn -> Service ID

import React, { useState } from "react";
import { motion } from "framer-motion";
import "../componentsCss/Usuario.css";

export const Usuario = ({ temaEscuro, setTemaEscuro, fontSize, setFontSize }) => {
  const [estaLogado, setEstaLogado] = useState(false);
  const [abaAtual, setAbaAtual] = useState("login"); // login, cadastro, perfil, config

  // Mock de dados do usuário
  const [user, setUser] = useState({
    nome: "Gustavo Caetano",
    nascimento: "1995-05-10",
    cep: "01001-000",
    cartao: null
  });

  if (!estaLogado) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-tabs">
            <span onClick={() => setAbaAtual("login")} className={abaAtual === "login" ? "active" : ""}>LOGIN</span>
            <span onClick={() => setAbaAtual("cadastro")} className={abaAtual === "cadastro" ? "active" : ""}>CADASTRO</span>
          </div>

          {abaAtual === "login" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="auth-form">
              <input type="email" placeholder="E-MAIL" />
              <input type="password" placeholder="SENHA" />
              <span className="btn-gold-text" onClick={() => setEstaLogado(true)}>ENTRAR</span>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="auth-form">
              <input type="text" placeholder="NOME COMPLETO" />
              <input type="text" placeholder="CEP" />
              <input type="date" placeholder="DATA DE NASCIMENTO" />
              <input type="email" placeholder="E-MAIL" />
              <input type="password" placeholder="CRIAR SENHA" />
              <p className="opcional-text">Cartão de crédito (Opcional)</p>
              <input type="text" placeholder="NÚMERO DO CARTÃO" />
              <span className="btn-gold-text" onClick={() => setEstaLogado(true)}>CRIAR CONTA</span>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <aside className="perfil-sidebar">
        <h3 onClick={() => setAbaAtual("perfil")}>MEU PERFIL</h3>
        <h3 onClick={() => setAbaAtual("pagamento")}>PAGAMENTO</h3>
        <h3 onClick={() => setAbaAtual("config")}>CONFIGURAÇÕES</h3>
        <span className="logout-text" onClick={() => setEstaLogado(false)}>SAIR</span>
      </aside>

      <main className="perfil-content">
        {abaAtual === "perfil" && (
          <div className="user-info">
            <h2>BEM-VINDO, {user.nome.toUpperCase()}</h2>
            <p><strong>NASCIMENTO:</strong> {user.nascimento}</p>
            <p><strong>CEP DE ENTREGA:</strong> {user.cep}</p>
          </div>
        )}

        {abaAtual === "pagamento" && (
          <div className="payment-info">
            <h2>MÉTODOS DE PAGAMENTO</h2>
            {user.cartao ? <p>Cartão final XXXX</p> : <p className="add-card-btn">+ ADICIONAR CARTÃO</p>}
            <p className="pix-info">PAGAMENTO VIA PIX HABILITADO ▾</p>
          </div>
        )}

        {abaAtual === "config" && (
          <div className="config-info">
            <h2>ACESSIBILIDADE</h2>
            <div className="config-item">
              <p>TAMANHO DA FONTE</p>
              <button onClick={() => setFontSize(fontSize + 2)}>+</button>
              <button onClick={() => setFontSize(fontSize - 2)}>-</button>
            </div>
            <div className="config-item">
              <p>TEMA DO SITE</p>
              <span className="btn-outline" onClick={() => setTemaEscuro(!temaEscuro)}>
                {temaEscuro ? "MUDAR PARA TEMA CLARO" : "MUDAR PARA TEMA ESCURO"}
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};