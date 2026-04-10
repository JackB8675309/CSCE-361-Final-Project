import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  const [page, setPage] = useState('home');
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <Header page={page} setPage={setPage} cartCount={cartCount} />
      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'cart' && <CartPage setPage={setPage} />}
      {page === 'checkout' && <CheckoutPage />}
    </>
  );
}
