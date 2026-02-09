// 1. Verifique se os imports estão no topo e com o caminho correto
import batomImg from '../assets/batom-premium.png'; 
import sombralImg from '../assets/sombra-premium.png';

// 2. Garante que a exportação está limpa
export const produtosCatalogo = [
  {
    id: 1,
    nome: "BATOM PREMIUM",
    preco: 229.90,
    colecao: "Lançamentos",
    categoria: "Batom",
    img: batomImg // Variável que importamos acima
  }, // <--- Verifique esta vírgula!
  {
    id: 2,
    nome: "RÍMEL TUBING",
    preco: 259.90,
    colecao: "Lançamentos",
    categoria: "Rímel",
    img: sombralImg
  } // <--- O último item não precisa de vírgula, mas não tem problema se tiver
];