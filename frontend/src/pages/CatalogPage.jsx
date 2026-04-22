import { useState, useEffect } from 'react';
import '../styles/homepage.css';
import ProductCard from '../components/ProductCard';

export default function CatalogPage({ setPage, setSelectedProduct, initialCategoryId }) {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch categories
        fetch('http://localhost:5000/product/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    useEffect(() => {
        setLoading(true);
        let url = 'http://localhost:5000/product/sortByCategory';
        if (selectedCategoryId) {
            url = `http://localhost:5000/product/category/${selectedCategoryId}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const formatted = data.map(p => ({
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
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, [selectedCategoryId]);

    return (
        <main className="main-content">
            <section className="catalog" style={{ paddingTop: '40px' }}>
                <h3 className="catalog__title">PRODUCT CATALOG</h3>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
                    <button 
                        className={`btn--category ${!selectedCategoryId ? 'active' : ''}`}
                        onClick={() => setSelectedCategoryId(null)}
                        style={filterButtonStyle(!selectedCategoryId)}
                    >
                        ALL PRODUCTS
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat.categoryID}
                            className={`btn--category ${selectedCategoryId === cat.categoryID ? 'active' : ''}`}
                            onClick={() => setSelectedCategoryId(cat.categoryID)}
                            style={filterButtonStyle(selectedCategoryId === cat.categoryID)}
                        >
                            {cat.name.toUpperCase()}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center' }}>Loading products...</p>
                ) : (
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

const filterButtonStyle = (isActive) => ({
    padding: '10px 20px',
    border: '1px solid #333',
    background: isActive ? '#333' : 'white',
    color: isActive ? 'white' : '#333',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '4px',
    transition: 'all 0.3s ease'
});
