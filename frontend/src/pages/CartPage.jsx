import '../styles/cart.css';
import CartItem from '../components/CartItem';

export default function CartPage({ setPage, cartItems, updateQuantity, removeFromCart }) {
  const subtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

  return (
    <main className="cart-container">
      <h1>Your Shopping Cart</h1>
      <div className="cart-wrapper">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map(item => (
              <CartItem 
                key={item.sku} 
                item={item} 
                updateQuantity={updateQuantity} 
                removeFromCart={removeFromCart} 
              />
            ))
          )}
        </div>
        <aside className="cart-summary">
          <h3>Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>Free</span></div>
          <hr />
          <div className="summary-row total"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
          {cartItems.length > 0 && (
            <button className="btn-checkout" onClick={() => setPage('checkout')}>Go to Checkout</button>
          )}
        </aside>
      </div>
    </main>
  );
}