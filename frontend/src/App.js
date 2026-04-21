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


  const [currentUserId, setCurrentUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    if (currentUserId) {
      fetch(`http://localhost:5000/Cart/${currentUserId}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setCartItems(data);
        })
        .catch(console.error);
    } else {
      setCartItems([]);
    }
  }, [currentUserId]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);


  const syncCartWithDatabase = (productId, quantity) => {
    if (!currentUserId) return;

    fetch('http://localhost:5000/Cart/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: parseInt(currentUserId),
        productId: productId,
        quantity: quantity
      })
    }).catch(console.error);
  };

  const addToCart = (product, quantity = 1) => {
    if (!currentUserId) {
      alert("Please login to add to cart!");
      setPage('auth');
      return;
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.productID === product.productID || item.sku === product.sku);
      const newQuantity = existing ? existing.quantity + parseInt(quantity, 10) : parseInt(quantity, 10);
      const productIDToUse = existing?.productID || product.productID || 1; // Fallback if missing

      syncCartWithDatabase(productIDToUse, newQuantity);

      if (existing) {
        return prev.map(item => (item.productID === product.productID || item.sku === product.sku) ? { ...item, quantity: newQuantity } : item);
      }
      return [...prev, { ...product, quantity: newQuantity, productID: productIDToUse }];
    });
  };

  const updateQuantity = (skuOrId, quantity) => {
    const qty = parseInt(quantity, 10);
    const itemToUpdate = cartItems.find(item => item.productID === skuOrId || item.sku === skuOrId);
    if (!itemToUpdate) return;

    if (qty <= 0) {
      removeFromCart(skuOrId);
      return;
    }

    syncCartWithDatabase(itemToUpdate.productID, qty);
    setCartItems(prev => prev.map(item => (item.productID === skuOrId || item.sku === skuOrId) ? { ...item, quantity: qty } : item));
  };

  const removeFromCart = (skuOrId) => {
    const itemToRemove = cartItems.find(item => item.productID === skuOrId || item.sku === skuOrId);
    if (itemToRemove) {
      syncCartWithDatabase(itemToRemove.productID, 0);
    }
    setCartItems(prev => prev.filter(item => item.productID !== skuOrId && item.sku !== skuOrId));
  };

  const clearCart = () => {
    if (currentUserId) {
      fetch(`http://localhost:5000/Cart/clear/${currentUserId}`, { method: 'DELETE' }).catch(console.error);
    }
    setCartItems([]);
  };

  return (
    <>
      <Header page={page} setPage={setPage} cartCount={cartCount} />
      {page === 'home' && <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} />}
      {page === 'cart' && <CartPage setPage={setPage} cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />}
      {page === 'auth' && <AuthPage setPage={setPage} setCurrentUserId={setCurrentUserId} />}
      {page === 'sale' && <SalePage setPage={setPage} setSelectedProduct={setSelectedProduct} />}
      {page === 'product' && <ProductDetailPage product={selectedProduct} setPage={setPage} addToCart={addToCart} />}
      {page === 'checkout' && <CheckoutPage setPage={setPage} clearCart={clearCart} />}
      {page !== 'checkout' && <Footer />}
    </>
  );
}
