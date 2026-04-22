import { useState, useEffect } from 'react';
import '../styles/homepage.css'; 
import ProductCard from '../components/ProductCard';

export default function SearchPage({ setPage, setSelectedProduct, searchQuery }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!searchQuery) {
        setProducts([]);
        setLoading(false);
        return;
    }

    setLoading(true);
    fetch(`http://localhost:5000/product/search?q=${encodeURIComponent(searchQuery)}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch search results");
        return res.json();
      })
      .then(data => {
        // Map backend product data to match frontend component expectations
        const formattedData = data.map(p => ({
            id: p.productID,
            productID: p.productID,
            name: p.name,
            manufacturer: p.details?.manufactuer || "N/A",
            category: "Search Results", // Defaulting for search results
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
        setProducts(formattedData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Could not load search results.");
        setLoading(false);
      });
  }, [searchQuery]);

  return (
    <main className="main-content">
      <section className="catalog" style={{ paddingTop: '40px', minHeight: '60vh' }}>
        <h3 className="catalog__title">Search Results for "{searchQuery}"</h3>
        
        {loading && <p style={{textAlign: 'center', marginTop: '20px'}}>Loading...</p>}
        {error && <p style={{textAlign: 'center', color: 'red', marginTop: '20px'}}>{error}</p>}
        
        {!loading && !error && products.length === 0 && (
            <p style={{textAlign: 'center', marginTop: '20px', fontSize: '18px'}}>No products found matching your search.</p>
        )}

        {!loading && !error && products.length > 0 && (
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
        )}
      </section>
    </main>
  );
}
