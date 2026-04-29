import { useState, useEffect } from 'react';
import '../styles/sale.css';
import '../styles/homepage.css';
import ProductCard from '../components/ProductCard';

const Countdown = ({ endDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(endDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];
    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) return;
        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <div className="countdown">
            {timerComponents.length ? (
                <>Ends in: {timerComponents}</>
            ) : (
                <span>Sale Ended!</span>
            )}
        </div>
    );
};

export default function SalePage({ setPage, setSelectedProduct }) {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);


        fetch('http://localhost:5000/product/categories')
            .then(res => res.json())
            .then(catData => {
                return fetch('http://localhost:5000/product/onSale')
                    .then(res => res.json())
                    .then(data => {
                        const grouped = data.reduce((acc, item) => {
                            const saleID = item.saleID;
                            if (!acc[saleID]) {
                                acc[saleID] = {
                                    saleID: saleID,
                                    startDate: item.startDate,
                                    endDate: item.endDate,
                                    discount: item.discountPercentage ? `${item.discountPercentage}% OFF` : `$${item.discountAmount} OFF`,
                                    products: []
                                };
                            }
                            acc[saleID].products.push({
                                id: item.product.productID,
                                productID: item.product.productID,
                                name: item.product.name,
                                price: item.salePrice.toFixed(2),
                                oldPrice: item.product.price.toFixed(2),
                                image: item.product.details.imageUrl,
                                onSale: true,
                                category: catData.find(c => c.categoryID === item.product.details.categoryID)?.name || "Sale Item",
                                sku: item.product.details.sku,
                                manufacturer: item.product.details.manufacturer,
                                description: item.product.details.description,
                                dimensions: item.product.details.dimensions,
                                weight: `${item.product.details.weight} lbs`,
                                rating: `${item.product.details.rating}/5`
                            });
                            return acc;
                        }, {});
                        setSales(Object.values(grouped));
                        setLoading(false);
                    });
            })
            .catch(err => {
                console.error("Error fetching sales:", err);
                setLoading(false);
            });
    }, []);


    return (
        <div className="sale-page">
            {/* Hero Banner */}
            <div className="sale-page__hero">
                <div>
                    <h1>SALE</h1>
                    <p>Limited time offers — don't miss out!</p>
                </div>
                <div className="sale-badge-big">SAVE BIG</div>
            </div>

            {loading ? (
                <p style={{ textAlign: 'center', padding: '50px' }}>Loading sales...</p>
            ) : sales.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '50px' }}>No active sales right now. Check back soon!</p>
            ) : (
                sales.map(sale => (
                    <section key={sale.saleID} className="sale-section">
                        <div className="sale-section__header">
                            <h2 className="sale-section__title">Sale #{sale.saleID} - {sale.discount}</h2>
                            <div className="sale-section__dates">
                                <span>{new Date(sale.startDate).toLocaleDateString()} → {new Date(sale.endDate).toLocaleDateString()}</span>
                                <Countdown endDate={sale.endDate} />
                            </div>
                        </div>
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
                ))
            )}
        </div>
    );
}
