export default function ProductCard({ product, setPage, setSelectedProduct }) {
    const handleClick = () => {
        setSelectedProduct(product);
        setPage('product');
    };

    return (
        <article className="product-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className="product-card__image-box">
                <img src={product.image} alt={product.name} className="product-card__img" />
                {product.onSale && <span className="badge badge--sale">SALE</span>}
            </div>
            <div className="product-card__details">
                <h4 className="product-card__name">{product.name}</h4>
                <p className="product-card__category">{product.category}</p>
                <p className="product-card__price">
                    <span className="price--current">${product.price}</span>
                    {product.oldPrice && <span className="price--old">${product.oldPrice}</span>}
                </p>
                <small className="product-card__sku">SKU: {product.sku}</small>
            </div>
        </article>
    );
}