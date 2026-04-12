import { useEffect } from 'react';
import '../styles/product-detail.css';

export default function ProductDetailPage({ product, setPage }) {

    useEffect(() => {
        window.scrollTo(0, 0);  
    }, []);

    // Dữ liệu tạm - sau này backend sẽ truyền vào
    const sampleProduct = product || {
        name: "Sample Product",
        manufacturer: "Sample Company",
        price: "120.00",
        oldPrice: "150.00",
        onSale: true,
        saleAmount: "20% OFF",
        description: "This is a sample product description. It provides details about the product, its features, and benefits.",
        sku: "AB12345",
        dimensions: "12x5x4 inches",
        weight: "1.5 lbs",
        rating: "4.5/5 ⭐",
        image: "https://via.placeholder.com/500"
    };

    return (
        <main className="container">
            <div className="product-display">
                <div className="product-image">
                    <img src={sampleProduct.image} alt={sampleProduct.name} />
                </div>

                <div className="product-info">
                    <h1>{sampleProduct.name}</h1>
                    <p className="manufacturer">By: <span>{sampleProduct.manufacturer}</span></p>

                    <div className="price-section">
                        <span className="price-current">${sampleProduct.price}</span>
                        {sampleProduct.onSale && (
                            <span className="badge badge--sale">{sampleProduct.saleAmount}</span>
                        )}
                    </div>

                    <p className="description">{sampleProduct.description}</p>

                    <div className="specs">
                        <h3>Specifications</h3>
                        <ul>
                            <li><strong>SKU:</strong> {sampleProduct.sku}</li>
                            <li><strong>Dimensions:</strong> {sampleProduct.dimensions}</li>
                            <li><strong>Weight:</strong> {sampleProduct.weight}</li>
                            <li><strong>Rating:</strong> {sampleProduct.rating}</li>
                        </ul>
                    </div>

                    <div className="actions">
                        <input type="number" defaultValue="1" min="1" />
                        <button className="btn-add-cart">Add to Cart</button>
                    </div>

                    <button 
                        onClick={() => setPage('home')} 
                        style={{ marginTop: '20px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                        ← Back to Products
                    </button>
                </div>
            </div>
        </main>
    );
}