import { useState } from 'react';
import '../styles/global.css';

export default function Header({ page, setPage, cartCount, setSearchQuery, setInitialCategoryId, currentUserId, setCurrentUserId }) {
  const [localQuery, setLocalQuery] = useState('');

  const handleSearch = () => {
    if (localQuery.trim()) {
      setSearchQuery(localQuery);
      setPage('search');
    }
  };

  const handleLogout = () => {
    fetch('http://localhost:5000/User/logout', {
      method: 'POST',
      credentials: 'include'
    })
      .then(() => {
        setCurrentUserId(null);
        setPage('home');
      })
      .catch(console.error);
  };

  return (
    <header className="header">
      <nav className="header__navbar">
        <div className="header__logo">
          <span style={{ fontWeight: '900', fontSize: '24px', cursor: 'pointer' }} onClick={() => setPage('home')}>STORE</span>
        </div>
        <ul className="header__nav-menu">
          <li>
            <button
              type="button"
              className="header__nav-link"
              onClick={() => setPage('catalog')}
              style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' }}
            >
              ALL PRODUCTS
            </button>
          </li>
          <li>
            <button
              type="button"
              className="header__nav-link header__nav-link--sale"
              onClick={() => { setInitialCategoryId(2); setPage('catalog'); }}
              style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}
            >
              SALE
            </button>
          </li>
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

          {currentUserId ? (
            <div className="user-logged-in" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="header__icon" title="Logged In">👤</span>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: '1px solid #333',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderRadius: '4px'
                }}
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <span className="header__icon" onClick={() => setPage('auth')} style={{ cursor: 'pointer' }} title="Login">👤</span>
          )}

          <div className="cart-status" onClick={() => setPage('cart')} style={{ cursor: 'pointer' }}>
            <span className="header__icon">🛒</span>
            <span className="cart-status__badge">{cartCount}</span>
          </div>
        </div>
      </nav>
    </header>
  );
}