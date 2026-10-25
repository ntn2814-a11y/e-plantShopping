import { useState } from 'react';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };

  if (showProductList) {
    return <ProductList onHomeClick={handleHomeClick} />;
  }

  return (
    <main className="landing-page">
      <div className="background-image" aria-hidden="true" />
      <div className="landing-overlay" aria-hidden="true" />
      <div className="landing-shell">
        <section className="hero-copy" aria-labelledby="main-heading">
          <p className="eyebrow light">Welcome to your indoor oasis</p>
          <h1 id="main-heading">Welcome To Paradise Nursery</h1>
          <p className="hero-tagline">Where green meets serenity.</p>
          <p className="hero-intro">
            Discover living accents that refresh your rooms, lift your mood,
            and make every corner feel like home.
          </p>
          <button
            className="primary-button get-started-button"
            type="button"
            onClick={handleGetStartedClick}
          >
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
