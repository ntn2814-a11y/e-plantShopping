function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H7" />
      <circle cx="10" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
    </svg>
  );
}

function Header({ currentPage, totalItems, onHomeClick, onProductsClick, onCartClick }) {
  return (
    <header className="site-header">
      <button className="brand-button" type="button" onClick={onHomeClick}>
        <span className="brand-mark" aria-hidden="true">P</span>
        <span>
          <strong>Paradise</strong>
          <small>Nursery</small>
        </span>
      </button>

      <nav className="site-nav" aria-label="Main navigation">
        <button
          type="button"
          className={currentPage === 'products' ? 'nav-link active' : 'nav-link'}
          onClick={onProductsClick}
          aria-current={currentPage === 'products' ? 'page' : undefined}
        >
          Plants
        </button>
        <button
          type="button"
          className={currentPage === 'cart' ? 'cart-link active' : 'cart-link'}
          onClick={onCartClick}
          aria-label={`Shopping cart with ${totalItems} ${totalItems === 1 ? 'plant' : 'plants'}`}
          aria-current={currentPage === 'cart' ? 'page' : undefined}
        >
          <CartIcon />
          <span>Cart</span>
          <span className="cart-badge" aria-hidden="true">{totalItems}</span>
        </button>
      </nav>
    </header>
  );
}

export default Header;
