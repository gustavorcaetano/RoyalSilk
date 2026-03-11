import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import logoIcon from "../assets/logo.png";
import "../componentsCss/FinalCTA.css"; 

export const PageWrapper = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div key={pathname} style={{ position: "relative" }}>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.8, ease: "easeInOut" }}
        onAnimationComplete={() => {
          document.body.style.overflow = "auto";
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "#1a1a1a", // Alterado para preto para destacar o dourado
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          
          <motion.img 
            src={logoIcon} 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }} 
            transition={{ duration: 0.8 }}
            style={{ width: "110px", marginBottom: "-15px", zIndex: 10 }} 
          />

          <div className="brand-name-stacked" style={{ fontSize: "6rem", lineHeight: "0.85" }}> 
            <motion.span 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ color: "#d4af37", display: "block" }}
            >
              ROYAL
            </motion.span>
            <motion.span
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ color: "#d4af37", display: "block" }}
            >
              SILK
            </motion.span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};