import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import "../pagesCss/Usuario.css";

// --- COMPONENTE DO OLHO ANIMADO ---
const IconeOlhoAnimado = ({ visivel, toggle }) => (
  <button
    type="button"
    className="btn-toggle-senha"
    onClick={toggle}
    aria-label={visivel ? "Ocultar senha" : "Exibir senha"}
  >
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#D4AF37" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <motion.path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        animate={{ scaleY: visivel ? 1 : 0.4 }}
        transition={{ duration: 0.2 }}
      />
      <motion.circle 
        cx="12" 
        cy="12" 
        r="3" 
        animate={{ scale: visivel ? 1 : 0.6 }} 
        transition={{ duration: 0.2 }}
      />
      {!visivel && (
        <motion.line
          x1="3"
          y1="3"
          x2="21"
          y2="21"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </svg>
  </button>
);

export const Usuario = ({ temaEscuro, setTemaEscuro, fontSize, setFontSize }) => {
  const { usuarioLogado, login, logout } = useAuth();
  const [abaAtual, setAbaAtual] = useState("login");
  const [loadingCep, setLoadingCep] = useState(false);
  const [lembrar, setLembrar] = useState(true);

  // ESTADO DE EDIÇÃO DO PERFIL
  const [editando, setEditando] = useState(false);

  // ESTADOS DE VISIBILIDADE DAS SENHAS
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmaSenha, setMostrarConfirmaSenha] = useState(false);
  
  const [user, setUser] = useState({
    nome: "", email: "", senha: "", confirmaSenha: "", nascimento: "", cartao: "",
    cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", estado: ""
  });

  // PREENCHE O FORMULÁRIO QUANDO O USUÁRIO LOGA OU ALTERA DADOS
  useEffect(() => {
    if (usuarioLogado) {
      setUser(prev => ({
        ...prev,
        nome: usuarioLogado.nome || "",
        email: usuarioLogado.email || "",
        rua: usuarioLogado.rua || "",
        numero: usuarioLogado.numero || "",
        complemento: usuarioLogado.complemento || "",
        bairro: usuarioLogado.bairro || "",
        cidade: usuarioLogado.cidade || "",
        estado: usuarioLogado.estado || "",
        nascimento: usuarioLogado.nascimento || "",
        cartao: usuarioLogado.cartao || ""
      }));
    }
  }, [usuarioLogado]);

  // --- BUSCA E LIMPEZA AUTOMÁTICA DE CEP ---
  useEffect(() => {
    const cepLimpo = user.cep.replace(/\D/g, "");

    if (cepLimpo.length === 0) {
      setUser(prev => ({
        ...prev, rua: "", bairro: "", cidade: "", estado: "", numero: "", complemento: ""
      }));
      return;
    }

    if (cepLimpo.length === 8) {
      setLoadingCep(true);
      fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            setUser(prev => ({
              ...prev,
              rua: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf
            }));
          }
          setLoadingCep(false);
        })
        .catch(() => setLoadingCep(false));
    }
  }, [user.cep]);

  // --- MÁSCARAS E HANDLERS ---
  const handleCepChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 8) val = val.slice(0, 8);
    if (val.length > 5) val = val.replace(/^(\d{5})(\d)/, "$1-$2");
    setUser({ ...user, cep: val });
  };

  const handleDataChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 8) val = val.slice(0, 8);

    if (val.length > 4) {
      val = val.replace(/^(\d{2})(\d{2})(\d{1,4})$/, "$1/$2/$3");
    } else if (val.length > 2) {
      val = val.replace(/^(\d{2})(\d{1,2})$/, "$1/$2");
    }

    setUser({ ...user, nascimento: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (abaAtual === "cadastro" && user.senha !== user.confirmaSenha) {
      alert("As senhas informadas não coincidem.");
      return;
    }

    login({ 
      nome: user.nome || "Membro Royal", 
      email: user.email,
      rua: user.rua,
      numero: user.numero,
      complemento: user.complemento,
      bairro: user.bairro,
      cidade: user.cidade,
      estado: user.estado,
      nascimento: user.nascimento,
      cartao: user.cartao
    }, lembrar);
    
    setAbaAtual("perfil");
  };

  const handleSalvarPerfil = (e) => {
    e.preventDefault();
    login({
      ...usuarioLogado,
      nome: user.nome,
      email: user.email,
      rua: user.rua,
      numero: user.numero,
      complemento: user.complemento,
      bairro: user.bairro,
      cidade: user.cidade,
      estado: user.estado,
      nascimento: user.nascimento
    }, lembrar);

    setEditando(false);
  };

  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  // --- TELA DE LOGIN / CADASTRO ---
  if (!usuarioLogado) {
    return (
      <div className="usuario-container">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="logo-container">
          <img src="https://raw.githubusercontent.com/gustavorcaetano/RoyalSilk/main/src/assets/ROYALSILK.png" alt="Logo" className="logo-auth" />
          <h1 className="logo-text">Royal Silk</h1>
          <p className="logo-subtitle">O PODER DA BELEZA REAL</p>
        </motion.div>

        <motion.div className="auth-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="auth-tabs">
            <span onClick={() => setAbaAtual("login")} className={abaAtual === "login" ? "active" : ""}>LOGIN</span>
            <span onClick={() => setAbaAtual("cadastro")} className={abaAtual === "cadastro" ? "active" : ""}>CADASTRO</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {abaAtual === "cadastro" ? (
              <div className="form-scroll-area">
                <input 
                  type="text" 
                  placeholder="NOME COMPLETO" 
                  value={user.nome} 
                  required 
                  onChange={(e) => setUser({...user, nome: e.target.value})} 
                />
                
                <input 
                  type="email" 
                  placeholder="E-MAIL" 
                  value={user.email} 
                  required 
                  onChange={(e) => setUser({...user, email: e.target.value})} 
                />
                
                <div className="input-group">
                  <div className="input-senha-wrapper">
                    <input 
                      type={mostrarSenha ? "text" : "password"} 
                      placeholder="SENHA" 
                      value={user.senha} 
                      required 
                      onChange={(e) => setUser({...user, senha: e.target.value})} 
                    />
                    <IconeOlhoAnimado 
                      visivel={mostrarSenha} 
                      toggle={() => setMostrarSenha(!mostrarSenha)} 
                    />
                  </div>

                  <div className="input-senha-wrapper">
                    <input 
                      type={mostrarConfirmaSenha ? "text" : "password"} 
                      placeholder="CONFIRMAR SENHA" 
                      value={user.confirmaSenha} 
                      required 
                      onChange={(e) => setUser({...user, confirmaSenha: e.target.value})} 
                    />
                    <IconeOlhoAnimado 
                      visivel={mostrarConfirmaSenha} 
                      toggle={() => setMostrarConfirmaSenha(!mostrarConfirmaSenha)} 
                    />
                  </div>
                </div>

                <div className="input-group">
                  <input 
                    type="text" 
                    placeholder="NASCIMENTO (DD/MM/AAAA)" 
                    value={user.nascimento} 
                    onChange={handleDataChange} 
                    inputMode="numeric" 
                    maxLength={10} 
                    required 
                  />
                  <input type="text" placeholder="CEP" value={user.cep} onChange={handleCepChange} inputMode="numeric" required />
                </div>
                
                {loadingCep && <p className="loading-text" style={{color: '#D4AF37'}}>Buscando realeza...</p>}
                
                <input type="text" placeholder="RUA / LOGRADOURO" value={user.rua} required onChange={(e) => setUser({...user, rua: e.target.value})} />
                
                <div className="input-group">
                  <input type="text" placeholder="Nº" value={user.numero} required onChange={(e) => setUser({...user, numero: e.target.value})} />
                  <input type="text" placeholder="COMPLEMENTO" value={user.complemento} onChange={(e) => setUser({...user, complemento: e.target.value})} />
                </div>

                <div className="input-group">
                  <input type="text" placeholder="BAIRRO" value={user.bairro} required onChange={(e) => setUser({...user, bairro: e.target.value})} />
                  <input type="text" placeholder="CIDADE" value={user.cidade} required readOnly />
                </div>
              </div>
            ) : (
              <>
                <input 
                  type="email" 
                  placeholder="E-MAIL" 
                  value={user.email} 
                  required 
                  onChange={(e) => setUser({...user, email: e.target.value})} 
                />
                
                <div className="input-senha-wrapper">
                  <input 
                    type={mostrarSenha ? "text" : "password"} 
                    placeholder="SENHA" 
                    value={user.senha} 
                    required 
                    onChange={(e) => setUser({...user, senha: e.target.value})} 
                  />
                  <IconeOlhoAnimado 
                    visivel={mostrarSenha} 
                    toggle={() => setMostrarSenha(!mostrarSenha)} 
                  />
                </div>
              </>
            )}

            <div className="lembrar-box" style={{display: 'flex', gap: '10px', alignItems: 'center', margin: '10px 0'}}>
              <input type="checkbox" id="lembrar" checked={lembrar} onChange={() => setLembrar(!lembrar)} />
              <label htmlFor="lembrar" style={{fontSize: '0.8rem', color: '#D4AF37'}}>MANTER-ME NA REALEZA</label>
            </div>
            
            <button type="submit" className="btn-gold-silk">
              {abaAtual === "login" ? "ENTRAR NA REALEZA" : "CRIAR CONTA REAL"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- TELA DE PERFIL LOGADO ---
  return (
    <div className="perfil-layout">
      <aside className="sidebar-perfil">
        <p onClick={() => setAbaAtual("perfil")} className={abaAtual === "perfil" ? "active" : ""}>MEU PERFIL</p>
        <p onClick={() => setAbaAtual("pagamento")} className={abaAtual === "pagamento" ? "active" : ""}>PAGAMENTO</p>
        <p onClick={() => setAbaAtual("config")} className={abaAtual === "config" ? "active" : ""}>CONFIGURAÇÕES</p>
        <button onClick={logout} className="btn-sair">SAIR</button>
      </aside>

      <main className="content-perfil">
        <AnimatePresence mode="wait">
          <motion.div key={abaAtual} variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            
            {/* ABA PERFIL (MODO VISUALIZAÇÃO E EDIÇÃO) */}
            {abaAtual === "perfil" && (
              <div className="perfil-content-box">
                <h2 className="perfil-title">BEM-VINDO, {usuarioLogado.nome.toUpperCase()}</h2>

                {!editando ? (
                  <div className="info-box">
                    <p><strong>NOME:</strong> {usuarioLogado.nome}</p>
                    <p><strong>E-MAIL:</strong> {usuarioLogado.email}</p>
                    <p><strong>ENDEREÇO:</strong> {usuarioLogado.rua}{usuarioLogado.numero ? `, ${usuarioLogado.numero}` : ""} {usuarioLogado.complemento && `(${usuarioLogado.complemento})`}</p>
                    <p><strong>LOCALIDADE:</strong> {usuarioLogado.bairro}{usuarioLogado.cidade ? ` - ${usuarioLogado.cidade}/${usuarioLogado.estado}` : ""}</p>
                    <p><strong>NASCIMENTO:</strong> {usuarioLogado.nascimento}</p>
                    
                    <button 
                      type="button" 
                      className="btn-gold-silk" 
                      style={{ marginTop: '20px', width: 'auto', padding: '10px 25px' }}
                      onClick={() => setEditando(true)}
                    >
                      EDITAR INFORMAÇÕES
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSalvarPerfil} className="form-editar-perfil" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px', marginTop: '20px' }}>
                    <input 
                      type="text" 
                      placeholder="NOME COMPLETO" 
                      value={user.nome} 
                      onChange={(e) => setUser({...user, nome: e.target.value})} 
                      required 
                    />
                    <input 
                      type="email" 
                      placeholder="E-MAIL" 
                      value={user.email} 
                      onChange={(e) => setUser({...user, email: e.target.value})} 
                      required 
                    />
                    <div className="input-group">
                      <input 
                        type="text" 
                        placeholder="NASCIMENTO (DD/MM/AAAA)" 
                        value={user.nascimento} 
                        onChange={handleDataChange} 
                        inputMode="numeric" 
                        maxLength={10} 
                      />
                      <input 
                        type="text" 
                        placeholder="BUSCAR CEP" 
                        value={user.cep} 
                        onChange={handleCepChange} 
                        inputMode="numeric" 
                      />
                    </div>

                    {loadingCep && <p style={{ color: '#D4AF37', fontSize: '0.85rem' }}>Buscando endereço...</p>}

                    <input 
                      type="text" 
                      placeholder="RUA / LOGRADOURO" 
                      value={user.rua} 
                      onChange={(e) => setUser({...user, rua: e.target.value})} 
                    />
                    
                    <div className="input-group">
                      <input 
                        type="text" 
                        placeholder="Nº" 
                        value={user.numero} 
                        onChange={(e) => setUser({...user, numero: e.target.value})} 
                      />
                      <input 
                        type="text" 
                        placeholder="COMPLEMENTO" 
                        value={user.complemento} 
                        onChange={(e) => setUser({...user, complemento: e.target.value})} 
                      />
                    </div>

                    <div className="input-group">
                      <input 
                        type="text" 
                        placeholder="BAIRRO" 
                        value={user.bairro} 
                        onChange={(e) => setUser({...user, bairro: e.target.value})} 
                      />
                      <input 
                        type="text" 
                        placeholder="CIDADE" 
                        value={user.cidade} 
                        readOnly 
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button type="submit" className="btn-gold-silk">SALVAR ALTERAÇÕES</button>
                      <button 
                        type="button" 
                        className="btn-gold-silk" 
                        style={{ backgroundColor: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37' }}
                        onClick={() => setEditando(false)}
                      >
                        CANCELAR
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ABA PAGAMENTO */}
            {abaAtual === "pagamento" && (
              <div className="perfil-content-box">
                <h2 className="perfil-title">MÉTODOS DE PAGAMENTO</h2>
                <div className="card-box">
                  <p>CARTÃO ATUAL: {usuarioLogado.cartao || "NENHUM CADASTRADO"}</p>
                  <input 
                    type="text" 
                    className="input-gold" 
                    placeholder="NÚMERO DO CARTÃO" 
                    onChange={(e) => setUser({...user, cartao: e.target.value})} 
                  />
                  <p className="pix-label" style={{marginTop: '15px', color: '#D4AF37'}}>OPÇÃO PIX ATIVA ✓</p>
                </div>
              </div>
            )}

            {/* ABA CONFIGURAÇÕES / ACESSIBILIDADE */}
            {abaAtual === "config" && (
              <div className="perfil-content-box">
                <h2 className="perfil-title">ACESSIBILIDADE & TEMA</h2>
                <div className="config-container">
                  <div className="config-item">
                    <p>TAMANHO DA FONTE: {fontSize}px</p>
                    <div className="btn-group-acessibilidade">
                      <button className="btn-acess" onClick={() => setFontSize(fontSize + 2)}>+</button>
                      <button className="btn-acess" onClick={() => setFontSize(fontSize - 2)}>-</button>
                    </div>
                  </div>
                  <div className="config-item" style={{marginTop: '20px'}}>
                    <p>TEMA DO AMBIENTE</p>
                    <button className="btn-gold-silk" onClick={() => setTemaEscuro(!temaEscuro)}>
                      MODO {temaEscuro ? "CLARO" : "ESCURO"}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};