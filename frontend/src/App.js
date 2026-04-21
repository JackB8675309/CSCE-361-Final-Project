import { useState, useEffect } from 'react';
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
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.sku === product.sku);
      if (existing) {
        return prev.map(item => item.sku === product.sku ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity: parseInt(quantity, 10) }];
    });
  };

  const updateQuantity = (sku, quantity) => {
    const qty = parseInt(quantity, 10);
    if (qty <= 0) {
      removeFromCart(sku);
      return;
    }
    setCartItems(prev => prev.map(item => item.sku === sku ? { ...item, quantity: qty } : item));
  };

  const removeFromCart = (sku) => {
    setCartItems(prev => prev.filter(item => item.sku !== sku));
  };

  const clearCart = () => setCartItems([]);

  return (
    <>
      <Header page={page} setPage={setPage} cartCount={cartCount} />
      {page === 'home' && <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} />}
      {page === 'cart' && <CartPage setPage={setPage} cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />}
      {page === 'auth' && <AuthPage setPage={setPage} />}
      {page === 'sale' && <SalePage setPage={setPage} setSelectedProduct={setSelectedProduct} />}
      {page === 'product' && <ProductDetailPage product={selectedProduct} setPage={setPage} addToCart={addToCart} />}
      {page === 'checkout' && <CheckoutPage setPage={setPage} clearCart={clearCart} />}
      {page !== 'checkout' && <Footer />}
    </>
  );
}
