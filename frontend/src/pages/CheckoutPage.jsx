import '../styles/checkout.css';

export default function CheckoutPage() {
  return (
    <main className="checkout-container">
      <div className="checkout-section">
        <h2>Shipping Information</h2>
        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="Address" />
        <div className="form-row">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="ZIP Code" />
        </div>
      </div>
      <div className="checkout-section">
        <h2>Payment Details</h2>
        <input type="text" placeholder="Name on Card" />
        <input type="text" placeholder="Card Number" />
        <div className="form-row">
          <input type="text" placeholder="MM/YY" />
          <input type="text" placeholder="CVV" />
        </div>
      </div>
      <button className="btn-submit-order">Place Order</button>
    </main>
  );
}