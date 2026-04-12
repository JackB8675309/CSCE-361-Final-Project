import '../styles/global.css';
import '../styles/homepage.css'; 
import ProductCard from '../components/ProductCard';



// Dữ liệu tạm thời - sau này backend sẽ cung cấp dựa theo database của bạn
const sampleProducts = [
  { id: 1, name: "Sample Product 1", category: "Product Catalog", price: "120.00", oldPrice: "150.00", sku: "AB12345", image: "https://via.placeholder.com/300", onSale: true },
  { id: 2, name: "Sample Product 2", category: "Product Catalog", price: "80.00", oldPrice: null,     sku: "AB12346", image: "https://via.placeholder.com/300", onSale: false },
  { id: 3, name: "Sample Product 3", category: "Product Catalog", price: "200.00", oldPrice: "250.00", sku: "AB12347", image: "https://via.placeholder.com/300", onSale: true },
  { id: 4, name: "Sample Product 4", category: "Product Catalog", price: "60.00", oldPrice: null,     sku: "AB12348", image: "https://via.placeholder.com/300", onSale: false },
  { id: 5, name: "Sample Product 5", category: "Product Catalog", price: "95.00", oldPrice: "110.00", sku: "AB12349", image: "https://via.placeholder.com/300", onSale: true },
  { id: 6, name: "Sample Product 6", category: "Product Catalog", price: "45.00", oldPrice: null,     sku: "AB12350", image: "https://via.placeholder.com/300", onSale: false },
];

export default function HomePage({ setPage , setSelectedProduct }) {
  return (
    <main className="main-content">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__container">
          <h2 className="hero__title">SUMMER COLLECTION</h2>
          <p className="hero__subtitle">New arrivals from our latest collection are here.</p>
          <div className="hero__actions">
            <button className="btn--hero--shop-action">SHOP CATALOG 1</button>
            <button className="btn--hero--shop-action">SHOP CATALOG 2</button>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section className="catalog">
        <h3 className="catalog__title">NEW ARRIVALS</h3>
        <div className="catalog__grid">
          {sampleProducts.map(product => (
            <ProductCard 
            key={product.id} 
            product={product}
            setPage={setPage}
            setSelectedProduct={setSelectedProduct} 
            />
          ))}
        </div>
      </section>
    </main>
  );
}