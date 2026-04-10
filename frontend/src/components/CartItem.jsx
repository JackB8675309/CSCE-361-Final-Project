import '../styles/cart.css';

export default function CartItem({ item }) {
  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="item-info">
        <h4>{item.name}</h4>
        <p>SKU: {item.sku}</p>
      </div>
      <div className="item-qty">
        <input type="number" defaultValue={item.quantity} min="1" />
      </div>
      <div className="item-price">${item.price.toFixed(2)}</div>
      <button className="btn-remove">×</button>
    </article>
  );
}