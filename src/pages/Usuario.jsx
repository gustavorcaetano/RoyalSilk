// service_be82pnn -> Service ID
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import "../componentsCss/Usuario.css";

export const Usuario = ({ temaEscuro, setTemaEscuro, fontSize, setFontSize }) => {
  const [estaLogado, setEstaLogado] = useState(false);
  const [abaAtual, setAbaAtual] = useState("login"); // login, cadastro, perfil, config
  const [user, setUser] = useState({ nome: "", email: "", cep: "", nascimento: "", cartao: "" });

  // Função para disparar o e-mail que configuramos
  const enviarBoasVindas = (nome, email) => {
    const templateParams = {
      user_name: nome,
      user_email: email,
      date: new Date().toLocaleDateString('pt-BR')
    };

    emailjs.send(
      'service_be82pnn', 
      'template_4bochio', 
      templateParams, 
      'y3Tnpbz2zKLZfn-G7'
    ).then(() => console.log("E-mail de boas-vindas enviado!"));
  };

  const handleCadastro = (e) => {
    e.preventDefault();
    setEstaLogado(true);
    setAbaAtual("perfil");
    enviarBoasVindas(user.nome, user.email);
  };

  if (!estaLogado) {
    return (
      <div className="usuario-container">
        <div className="auth-card">
          <div className="auth-tabs">
            <span onClick={() => setAbaAtual("login")} className={abaAtual === "login" ? "active" : ""}>LOGIN</span>
            <span onClick={() => setAbaAtual("cadastro")} className={abaAtual === "cadastro" ? "active" : ""}>CADASTRO</span>
          </div>

          <form className="auth-form" onSubmit={handleCadastro}>
            {abaAtual === "cadastro" && (
              <>
                <input type="text" placeholder="NOME COMPLETO" required onChange={(e) => setUser({...user, nome: e.target.value})} />
                <input type="text" placeholder="DATA DE NASCIMENTO" required onChange={(e) => setUser({...user, nascimento: e.target.value})} />
                <input type="text" placeholder="CEP" required onChange={(e) => setUser({...user, cep: e.target.value})} />
              </>
            )}
            <input type="email" placeholder="E-MAIL" required onChange={(e) => setUser({...user, email: e.target.value})} />
            <input type="password" placeholder="SENHA" required />
            
            <button type="submit" className="btn-gold-silk">
              {abaAtual === "login" ? "ENTRAR" : "CRIAR CONTA"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-layout">
      <aside className="sidebar-perfil">
        <p onClick={() => setAbaAtual("perfil")} className={abaAtual === "perfil" ? "active" : ""}>MEU PERFIL</p>
        <p onClick={() => setAbaAtual("pagamento")} className={abaAtual === "pagamento" ? "active" : ""}>PAGAMENTO</p>
        <p onClick={() => setAbaAtual("config")} className={abaAtual === "config" ? "active" : ""}>CONFIGURAÇÕES</p>
        <button onClick={() => setEstaLogado(false)} className="btn-sair">SAIR</button>
      </aside>

      <main className="content-perfil">
        {abaAtual === "perfil" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>BEM-VINDO, {user.nome.toUpperCase()}</h2>
            <div className="info-box">
              <p><strong>E-MAIL:</strong> {user.email}</p>
              <p><strong>CEP:</strong> {user.cep}</p>
              <p><strong>NASCIMENTO:</strong> {user.nascimento}</p>
            </div>
          </motion.div>
        )}

        {abaAtual === "pagamento" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>MÉTODOS DE PAGAMENTO</h2>
            <div className="card-box">
              <p>CARTÃO ATUAL: {user.cartao || "NENHUM CADASTRADO"}</p>
              <input type="text" placeholder="NÚMERO DO CARTÃO" onChange={(e) => setUser({...user, cartao: e.target.value})} />
              <p className="pix-label">OPÇÃO PIX ATIVA ✓</p>
            </div>
          </motion.div>
        )}

        {abaAtual === "config" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>ACESSIBILIDADE E TEMA</h2>
            <div className="config-item">
              <p>TAMANHO DA FONTE</p>
              <button onClick={() => setFontSize(fontSize + 2)}>+</button>
              <button onClick={() => setFontSize(fontSize - 2)}>-</button>
            </div>
            <div className="config-item">
              <p>TEMA DO SITE</p>
              <button onClick={() => setTemaEscuro(!temaEscuro)}>
                MUDAR PARA MODO {temaEscuro ? "CLARO" : "ESCURO"}
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};