import { useState, useEffect } from 'react';
import '../styles/global.css';
import '../styles/homepage.css';
import ProductCard from '../components/ProductCard';

export default function HomePage({ setPage, setSelectedProduct, setInitialCategoryId }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/product/sortByCategory')
      .then(res => res.json())
      .then(data => {
        const formatted = data.slice(0, 6).map(p => ({
          id: p.productID,
          productID: p.productID,
          name: p.name,
          manufacturer: p.details?.manufactuer || "N/A",
          category: p.details?.categoryID === 1 ? "New Arrivals" : p.details?.categoryID === 2 ? "On Sale" : "Summer Collection",
          price: p.isOnSale && p.activePrice != null ? p.activePrice.toFixed(2) : p.price.toFixed(2),
          oldPrice: p.isOnSale ? p.price.toFixed(2) : null,
          sku: p.details?.sku || "N/A",
          image: p.details?.imageUrl || "https://via.placeholder.com/300",
          description: p.details?.description || "",
          dimensions: p.details?.dimensions || "N/A",
          weight: p.details?.weight ? `${p.details.weight} lbs` : "N/A",
          rating: p.details?.rating ? `${p.details.rating}/5` : "N/A",
          onSale: p.isOnSale
        }));
        setProducts(formatted);
      })
      .catch(console.error);

    // Fetch actual categories (catalogs)
    fetch('http://localhost:5000/product/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error);
  }, []);

  const goToCatalog = (catId) => {
    setInitialCategoryId(catId);
    setPage('catalog');
  };

  return (
    <main className="main-content">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__container">
          <h2 className="hero__title">SUMMER COLLECTION</h2>
          <p className="hero__subtitle">Discover our catalogs below</p>
          <div className="hero__actions">
            {categories.map(cat => (
              <button
                key={cat.categoryID}
                className="btn--hero--shop-action"
                onClick={() => goToCatalog(cat.categoryID)}
              >
                SHOP {cat.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section className="catalog">
        <h3 className="catalog__title">FEATURED PRODUCTS</h3>
        <div className="catalog__grid">
          {products.map(product => (
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