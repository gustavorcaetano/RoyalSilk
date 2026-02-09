
import ProductCard from './ProductCard';

export const Catalog = () => {
  const products = [
    { id: 1, name: "PALETA DE SOMBRAS", price: "259,99", img: "paleta.png" },
    { id: 2, name: "BATOM PREMIUM", price: "229,99", img: "batom.png" },
    { id: 3, name: "RÍMEL TUBING", price: "179,99", img: "rimel.png" },
  ];

  return (
    <section className="catalog-container">
      <h2 className="catalog-title">CATÁLOGO</h2>
      <div className="product-grid">
        {products.map(p => (
          <ProductCard key={p.id} name={p.name} price={p.price} image={p.img} />
        ))}
      </div>
    </section>
  );
};