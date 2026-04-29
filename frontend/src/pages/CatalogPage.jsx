import { useState, useEffect } from 'react';
import '../styles/homepage.css';
import ProductCard from '../components/ProductCard';

export default function CatalogPage({ setPage, setSelectedProduct, initialCategoryId }) {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId || null);
    const [loading, setLoading] = useState(true);
    const [saleInfo, setSaleInfo] = useState(null);
    const [sortBy, setSortBy] = useState('category');

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
        setLoading(true);
        setSaleInfo(null);
        let url = 'http://localhost:5000/product/sortByCategory';
        if (selectedCategoryId) {
            url = `http://localhost:5000/product/category/${selectedCategoryId}`;


            fetch(`http://localhost:5000/product/saleDetails/${selectedCategoryId}`)
                .then(res => res.ok ? res.json() : null)
                .then(data => setSaleInfo(data))
                .catch(() => setSaleInfo(null));
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const formatted = data.map(p => ({
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
                setProducts(sortProducts(formatted, sortBy));
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
        // sortBy is intentionally excluded; a dedicated effect re-sorts when it changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategoryId, categories]);

    useEffect(() => {
        setProducts(prev => sortProducts(prev, sortBy));
    }, [sortBy]);


    return (
        <main className="main-content">
            <section className="catalog" style={{ paddingTop: '40px' }}>
                <h3 className="catalog__title">PRODUCT CATALOG</h3>
                {saleInfo && (
                    <div className="sale-info-banner" style={{ textAlign: 'center', marginBottom: '20px', color: '#ff3e3e', fontWeight: '800' }}>
                        SALE ACTIVE: {saleInfo.startDate} — {saleInfo.endDate}
                    </div>
                )}


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
