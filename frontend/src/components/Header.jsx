import { useState } from 'react';
import '../styles/global.css';

export default function Header({ page, setPage, cartCount, setSearchQuery }) {
  const [localQuery, setLocalQuery] = useState('');

  const handleSearch = () => {
    if (localQuery.trim()) {
      setSearchQuery(localQuery);
      setPage('search');
    }
  };

  return (
    <header className="header">
      <div className="header__top-bar">
        <span>FREE SHIPPING FOR MEMBERS</span>
      </div>
      <nav className="header__navbar">
        <div className="header__logo">
          <span style={{ fontWeight: '900', fontSize: '24px' }} onClick={() => setPage('home')}>STORE</span>
        </div>
        <ul className="header__nav-menu">
          <li><a href="#" className="header__nav-link" onClick={(e) => { e.preventDefault(); setPage('catalog'); }}>OUR PRODUCTS</a></li>
          <li><a href="#" className="header__nav-link header__nav-link--sale" onClick={(e) => { e.preventDefault(); setPage('sale'); }}>SALE</a></li>
        </ul>
        <div className="header__actions">
          <div className="search-bar">
            <input 
              type="text" 
              className="search-bar__input" 
              placeholder="Search..." 
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>🔍</button>
          </div>
          <span className="header__icon" onClick={() => setPage('auth')} style={{ cursor: 'pointer' }}>👤</span>
          <div className="cart-status" onClick={() => setPage('cart')} style={{ cursor: 'pointer' }}>
            <span className="header__icon">🛒</span>
            <span className="cart-status__badge">{cartCount}</span>
          </div>
        </div>
      </nav>
    </header>
  );
}