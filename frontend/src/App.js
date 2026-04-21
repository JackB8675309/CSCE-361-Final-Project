import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SalePage from './pages/SalePage';


export default function App() {
  const [page, setPage] = useState('home');
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Header page={page} setPage={setPage} cartCount={cartCount} />
      {page === 'home' && <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} />}
      {page === 'cart' && <CartPage setPage={setPage} />}
      {page === 'auth' && <AuthPage setPage={setPage} />}
      {page === 'sale' && <SalePage setPage={setPage} setSelectedProduct={setSelectedProduct} />}
      {page === 'product' && <ProductDetailPage product={selectedProduct} setPage={setPage} />}
      {page === 'checkout' && <CheckoutPage setPage={setPage} />}
      {page !== 'checkout' && <Footer />}
    </>
  );
}
