import { useState, useEffect } from 'react';
import '../styles/homepage.css'; 
import ProductCard from '../components/ProductCard';

export default function SearchPage({ setPage, setSelectedProduct, searchQuery }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('category');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/product/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const sortProducts = (list, criteria) => {
    const sorted = [...list];
    if (criteria === 'category') {
        sorted.sort((a, b) => a.category.localeCompare(b.category));
    } else if (criteria === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'price-low') {
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (criteria === 'price-high') {
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    return sorted;
  };

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
        const formattedData = data.map(p => ({
            id: p.productID,
            productID: p.productID,
            name: p.name,
            manufacturer: p.details?.manufactuer || "N/A",
            category: categories.find(c => c.categoryID === p.details?.categoryID)?.name || "Other",
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
        setProducts(sortProducts(formattedData, sortBy));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Could not load search results.");
        setLoading(false);
      });
    // sortBy is intentionally excluded; a dedicated effect re-sorts when it changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, categories]);

  useEffect(() => {
    setProducts(prev => sortProducts(prev, sortBy));
  }, [sortBy]);


  return (
    <main className="main-content">
      <section className="catalog" style={{ paddingTop: '40px', minHeight: '60vh' }}>
        <h3 className="catalog__title">Search Results for "{searchQuery}"</h3>
        
        {products.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', maxWidth: '1200px', margin: '0 auto 20px auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f9f9f9', padding: '10px 15px', borderRadius: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '800', color: '#555' }}>SORT BY:</label>
                  <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{ padding: '6px 12px', border: '1px solid #ddd', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', outline: 'none' }}
                  >
                      <option value="category">Category</option>
                      <option value="name">Name (A-Z)</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                  </select>
              </div>
          </div>
        )}

        
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
