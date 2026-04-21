import '../styles/cart.css';

export default function CartItem({ item, updateQuantity, removeFromCart }) {
  const handleQuantityChange = (e) => {
    updateQuantity(item.sku, e.target.value);
  };

  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="item-info">
        <h4>{item.name}</h4>
        <p>SKU: {item.sku}</p>
      </div>
      <div className="item-qty">
        <input 
          type="number" 
          value={item.quantity} 
          min="1" 
          onChange={handleQuantityChange} 
        />
      </div>
      <div className="item-price">${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
      <button className="btn-remove" onClick={() => removeFromCart(item.sku)}>×</button>
    </article>
  );
}