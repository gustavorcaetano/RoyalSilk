import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCINumlkRcOqxNPZUr-Gp8vuMDVa1BnQ-I",
  authDomain: "royal-silk-cosmetics.firebaseapp.com",
  projectId: "royal-silk-cosmetics",
  storageBucket: "royal-silk-cosmetics.firebasestorage.app",
  messagingSenderId: "1072485065771",
  appId: "1:1072485065771:web:e2e747a4208e23ade6f66e",
  measurementId: "G-GJXCP2TYXR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Exportando o banco de dados
export default app;