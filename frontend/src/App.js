import { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SalePage from './pages/SalePage';
import SearchPage from './pages/SearchPage';
import CatalogPage from './pages/CatalogPage';


export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [initialCategoryId, setInitialCategoryId] = useState(null);

  const [currentUserId, setCurrentUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (currentUserId) {
      fetch('http://localhost:5000/Cart', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setCartItems(data);
        })
        .catch(console.error);
    } else {
      setCartItems([]);
    }
  }, [currentUserId]);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const syncCartWithDatabase = (productId, quantity) => {
    if (!currentUserId) return;

    fetch('http://localhost:5000/Cart/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        productId: productId,
        quantity: quantity
      })
    }).catch(console.error);
  };

  const addToCart = (product, quantity = 1) => {
    if (!currentUserId) {
      showNotification("Please login to add to cart!");
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
    showNotification(`${quantity} ${product.name} added to cart!`, "success");
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
      fetch('http://localhost:5000/Cart/clear', { method: 'DELETE', credentials: 'include' }).catch(console.error);
    }
    setCartItems([]);
  };

  return (
    <>
      <Header 
        page={page} 
        setPage={setPage} 
        cartCount={cartCount} 
        setSearchQuery={setSearchQuery} 
        setInitialCategoryId={setInitialCategoryId}
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
      />

      {notification && (
        <div className={`notification-toast ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {page === 'home' && <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} setInitialCategoryId={setInitialCategoryId} />}
      {page === 'cart' && <CartPage setPage={setPage} cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />}
      {page === 'auth' && <AuthPage setPage={setPage} setCurrentUserId={setCurrentUserId} showNotification={showNotification} />}
      {page === 'sale' && <SalePage setPage={setPage} setSelectedProduct={setSelectedProduct} />}
      {page === 'search' && <SearchPage setPage={setPage} setSelectedProduct={setSelectedProduct} searchQuery={searchQuery} />}
      {page === 'catalog' && <CatalogPage setPage={setPage} setSelectedProduct={setSelectedProduct} initialCategoryId={initialCategoryId} />}
      {page === 'product' && <ProductDetailPage product={selectedProduct} setPage={setPage} addToCart={addToCart} />}
      {page === 'checkout' && <CheckoutPage setPage={setPage} clearCart={clearCart} showNotification={showNotification} />}
    </>
  );
}

