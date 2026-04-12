import '../styles/cart.css';
import CartItem from '../components/CartItem';

export default function CartPage({ setPage }) {
  const cartData = [
    { id: 1, name: "Sample Product", sku: "PROD-12345", price: 120.0, quantity: 1, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Sample Product 2", sku: "PROD-67890", price: 250.0, quantity: 1, image: "https://via.placeholder.com/100" }
  ];

  const subtotal = cartData.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <main className="cart-container">
      <h1>Your Shopping Cart</h1>
      <div className="cart-wrapper">
        <div className="cart-items">
          {cartData.map(item => <CartItem key={item.id} item={item} />)}
        </div>
        <aside className="cart-summary">
          <h3>Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>Free</span></div>
          <hr />
          <div className="summary-row total"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
          <button className="btn-checkout" onClick={() => setPage('checkout')}>Go to Checkout</button>
        </aside>
      </div>
    </main>
  );
}