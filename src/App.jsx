import { useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs';
import CartItem from './CartItem';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const showHome = () => setCurrentPage('home');
  const showProducts = () => setCurrentPage('products');
  const showCart = () => setCurrentPage('cart');

  if (currentPage === 'products') {
    return (
      <ProductList
        totalItems={totalItems}
        onHomeClick={showHome}
        onProductsClick={showProducts}
        onCartClick={showCart}
      />
    );
  }

  if (currentPage === 'cart') {
    return (
      <CartItem
        totalItems={totalItems}
        onHomeClick={showHome}
        onProductsClick={showProducts}
        onCartClick={showCart}
      />
    );
  }

  return (
    <main className="landing-page">
      <div className="landing-overlay" aria-hidden="true" />
      <div className="landing-shell">
        <section className="hero-copy" aria-labelledby="main-heading">
          <p className="eyebrow light">Welcome to your indoor oasis</p>
          <h1 id="main-heading">Paradise Nursery</h1>
          <p className="hero-tagline">Where green meets serenity.</p>
          <p className="hero-intro">
            Discover living accents that refresh your rooms, lift your mood,
            and make every corner feel like home.
          </p>
          <button className="primary-button" type="button" onClick={showProducts}>
            Get Started
            <span aria-hidden="true">→</span>
          </button>
        </section>

        <AboutUs />
      </div>
      <p className="landing-note">Thoughtfully grown · Carefully delivered</p>
    </main>
  );
}

export default App;
