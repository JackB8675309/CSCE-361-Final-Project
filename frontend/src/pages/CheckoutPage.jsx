import '../styles/checkout.css';
import { useState } from 'react';

export default function CheckoutPage({ setPage }) {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCheckoutSubmit = async (event) => {
    event.preventDefault();

    const currentUserId = 1;
    const checkoutPayLoad = {
      userId: currentUserId,
      shippingDetails: JSON.stringify({
        addressLine1: address,
        addressLine2: "",
        city: city,
        state: "",
        zipCode: zipCode,
        country: "USA"
      }),
      paymentDetails: JSON.stringify({
        cardName: cardName,
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvv: cvv
      })
    };

    try {
      const response = await fetch('http://localhost:5000/Checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutPayLoad),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        setPage('home');
      } else {
        console.error("Failed to Checkout");
        alert('Checkout process failed, please double check your information')
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <main className="checkout-container">
      <form onSubmit={handleCheckoutSubmit}>

        <div className="checkout-section">
          <h2>Shipping Information</h2>
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <div className="form-row">
            <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <input type="text" placeholder="ZIP Code" maxLength="10" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          </div>
        </div>

        <div className="checkout-section">
          <h2>Payment Details</h2>
          <input type="text" placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} />
          <input type="text" placeholder="Card Number" maxLength="19" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          <div className="form-row">
            <input type="text" placeholder="MM/YY" maxLength="5" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
            <input type="text" placeholder="CVV" maxLength="4" value={cvv} onChange={(e) => setCvv(e.target.value)} />
          </div>
        </div>

        <button type="submit" className="btn-submit-order">Place Order</button>

      </form>
    </main>
  );
}