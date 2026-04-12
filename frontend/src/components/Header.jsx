import '../styles/global.css';

export default function Header({ page, setPage, cartCount }) {
  return (
    <header className="header">
      <div className="header__top-bar">
        <span>FREE SHIPPING FOR MEMBERS</span>
      </div>
      <nav className="header__navbar">
        <div className="header__logo">
          <span style={{ fontWeight: '900', fontSize: '24px' }}>STORE</span>
        </div>
        <ul className="header__nav-menu">
          <li><a href="#" className="header__nav-link" onClick={() => setPage('home')}>OUR PRODUCTS</a></li>
          <li><a href="#" className="header__nav-link header__nav-link--sale" onClick={(e) => { e.preventDefault(); setPage('sale'); }}>SALE</a></li>
        </ul>
        <div className="header__actions">
          <div className="search-bar">
            <input type="text" className="search-bar__input" placeholder="Search..." />
            <button>🔍</button>
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