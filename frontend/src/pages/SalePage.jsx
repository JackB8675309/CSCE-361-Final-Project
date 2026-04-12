import { useEffect } from 'react';
import '../styles/sale.css';
import '../styles/homepage.css';
import ProductCard from '../components/ProductCard';

// Dữ liệu tạm - sau này backend trả về từ bảng Sale trong database
const saleData = [
    {
        saleID: 1,
        category: "Summer Collection",
        discount: "20% OFF",
        startDate: "2024-06-01",
        endDate: "2024-06-30",
        products: [
            { id: 1, name: "Sample Product 1", category: "Summer Collection", price: "120.00", oldPrice: "150.00", sku: "AB12345", image: "https://via.placeholder.com/300", onSale: true },
            { id: 2, name: "Sample Product 2", category: "Summer Collection", price: "80.00", oldPrice: "100.00", sku: "AB12346", image: "https://via.placeholder.com/300", onSale: true },
            { id: 3, name: "Sample Product 3", category: "Summer Collection", price: "200.00", oldPrice: "250.00", sku: "AB12347", image: "https://via.placeholder.com/300", onSale: true },
        ]
    },
    {
        saleID: 2,
        category: "Clearance",
        discount: "$10 OFF",
        startDate: "2024-06-15",
        endDate: "2024-07-15",
        products: [
            { id: 4, name: "Sample Product 4", category: "Clearance", price: "60.00", oldPrice: "70.00", sku: "AB12348", image: "https://via.placeholder.com/300", onSale: true },
            { id: 5, name: "Sample Product 5", category: "Clearance", price: "95.00", oldPrice: "105.00", sku: "AB12349", image: "https://via.placeholder.com/300", onSale: true },
        ]
    }
];

export default function SalePage({ setPage, setSelectedProduct }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="sale-page">
            {/* Hero Banner */}
            <div className="sale-page__hero">
                <div>
                    <h1>SALE</h1>
                    <p>Limited time offers — don't miss out!</p>
                </div>
                <div className="sale-badge-big">UP TO 20% OFF</div>
            </div>

            {/* Sale theo từng category — giống bảng Sale trong database */}
            {saleData.map(sale => (
                <section key={sale.saleID} className="sale-section">
                    <h2 className="sale-section__title">{sale.category}</h2>
                    <p className="sale-section__meta">
                        <span>{sale.discount}</span> · {sale.startDate} → {sale.endDate}
                    </p>
                    <div className="sale-grid">
                        {sale.products.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                setPage={setPage}
                                setSelectedProduct={setSelectedProduct}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}