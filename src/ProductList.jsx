import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

export const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      {
        id: 'snake-plant',
        name: 'Snake Plant',
        category: 'Air Purifying Plants',
        price: 18,
        cost: '$18',
        description: 'Architectural leaves and a forgiving nature for effortless greenery.',
        image: '/assets/plants/snake-plant.svg',
      },
      {
        id: 'peace-lily',
        name: 'Peace Lily',
        category: 'Air Purifying Plants',
        price: 22,
        cost: '$22',
        description: 'Glossy foliage and elegant white blooms that brighten quiet corners.',
        image: '/assets/plants/peace-lily.svg',
      },
      {
        id: 'rubber-plant',
        name: 'Rubber Plant',
        category: 'Air Purifying Plants',
        price: 26,
        cost: '$26',
        description: 'Deep green leaves with a bold silhouette for modern interiors.',
        image: '/assets/plants/rubber-plant.svg',
      },
      {
        id: 'boston-fern',
        name: 'Boston Fern',
        category: 'Air Purifying Plants',
        price: 20,
        cost: '$20',
        description: 'Feathery fronds that add humidity and softness to a bright room.',
        image: '/assets/plants/boston-fern.svg',
      },
      {
        id: 'aloe-vera',
        name: 'Aloe Vera',
        category: 'Air Purifying Plants',
        price: 17,
        cost: '$17',
        description: 'A sun-loving succulent valued for its sculptural, useful leaves.',
        image: '/assets/plants/calathea.svg',
      },
      {
        id: 'spider-plant',
        name: 'Spider Plant',
        category: 'Air Purifying Plants',
        price: 15,
        cost: '$15',
        description: 'Striped arching leaves make this adaptable plant an easy favorite.',
        image: '/assets/plants/parlor-palm.svg',
      },
    ],
  },
  {
    category: 'Low Light Plants',
    plants: [
      {
        id: 'golden-pothos',
        name: 'Golden Pothos',
        category: 'Low Light Plants',
        price: 16,
        cost: '$16',
        description: 'Cascading heart-shaped leaves that stay cheerful in gentle light.',
        image: '/assets/plants/golden-pothos.svg',
      },
      {
        id: 'zz-plant',
        name: 'ZZ Plant',
        category: 'Low Light Plants',
        price: 24,
        cost: '$24',
        description: 'Polished stems, easy care, and exceptional tolerance of low light.',
        image: '/assets/plants/zz-plant.svg',
      },
      {
        id: 'cast-iron-plant',
        name: 'Cast Iron Plant',
        category: 'Low Light Plants',
        price: 28,
        cost: '$28',
        description: 'A resilient classic with graceful leaves and very modest demands.',
        image: '/assets/plants/cast-iron-plant.svg',
      },
      {
        id: 'chinese-evergreen',
        name: 'Chinese Evergreen',
        category: 'Low Light Plants',
        price: 23,
        cost: '$23',
        description: 'Patterned leaves bring dependable color to softly lit rooms.',
        image: '/assets/plants/rubber-plant.svg',
      },
      {
        id: 'heartleaf-philodendron',
        name: 'Heartleaf Philodendron',
        category: 'Low Light Plants',
        price: 19,
        cost: '$19',
        description: 'Fast-growing vines and heart-shaped foliage suit shelves and baskets.',
        image: '/assets/plants/snake-plant.svg',
      },
      {
        id: 'parlor-palm',
        name: 'Parlor Palm',
        category: 'Low Light Plants',
        price: 25,
        cost: '$25',
        description: 'Soft palm fronds bring relaxed, tropical character to small rooms.',
        image: '/assets/plants/parlor-palm.svg',
      },
    ],
  },
  {
    category: 'Pet Friendly Plants',
    plants: [
      {
        id: 'calathea-orbifolia',
        name: 'Calathea Orbifolia',
        category: 'Pet Friendly Plants',
        price: 30,
        cost: '$30',
        description: 'Silver-striped leaves turn an everyday shelf into a statement.',
        image: '/assets/plants/calathea.svg',
      },
      {
        id: 'areca-palm',
        name: 'Areca Palm',
        category: 'Pet Friendly Plants',
        price: 32,
        cost: '$32',
        description: 'Airy golden-green fronds create a bright tropical focal point.',
        image: '/assets/plants/parlor-palm.svg',
      },
      {
        id: 'birds-nest-fern',
        name: "Bird's Nest Fern",
        category: 'Pet Friendly Plants',
        price: 21,
        cost: '$21',
        description: 'Wavy apple-green leaves unfurl from a tidy central rosette.',
        image: '/assets/plants/boston-fern.svg',
      },
      {
        id: 'prayer-plant',
        name: 'Prayer Plant',
        category: 'Pet Friendly Plants',
        price: 22,
        cost: '$22',
        description: 'Decorative leaves gently lift and fold as evening arrives.',
        image: '/assets/plants/peace-lily.svg',
      },
      {
        id: 'peperomia',
        name: 'Peperomia',
        category: 'Pet Friendly Plants',
        price: 18,
        cost: '$18',
        description: 'Compact textured leaves make a charming desk-sized companion.',
        image: '/assets/plants/golden-pothos.svg',
      },
      {
        id: 'ponytail-palm',
        name: 'Ponytail Palm',
        category: 'Pet Friendly Plants',
        price: 27,
        cost: '$27',
        description: 'A sculptural trunk and playful leaves thrive with minimal watering.',
        image: '/assets/plants/zz-plant.svg',
      },
    ],
  },
];

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H7" />
      <circle cx="10" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
    </svg>
  );
}

function Navbar({ totalCartItems, currentPage, onHomeClick, onPlantsClick, onCartClick }) {
  return (
    <header className="navbar site-header">
      <a className="brand-button" href="#home" onClick={onHomeClick}>
        <span className="brand-mark" aria-hidden="true">P</span>
        <span>
          <strong>Paradise</strong>
          <small>Nursery</small>
        </span>
      </a>

      <nav className="site-nav" aria-label="Main navigation">
        <a className="nav-link" href="#home" onClick={onHomeClick}>Home</a>
        <a
          className={currentPage === 'plants' ? 'nav-link active' : 'nav-link'}
          href="#plants"
          onClick={onPlantsClick}
        >
          Plants
        </a>
        <a
          className={currentPage === 'cart' ? 'cart-link active' : 'cart-link'}
          href="#cart"
          onClick={onCartClick}
          aria-label={`Cart with ${totalCartItems} items`}
        >
          <CartIcon />
          <span>Cart</span>
          <span className="cart-count cart-badge" aria-live="polite">
            {totalCartItems}
          </span>
        </a>
      </nav>
    </header>
  );
}

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalCartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  useEffect(() => {
    setAddedToCart(
      Object.fromEntries(cart.map((item) => [item.name, true])),
    );
  }, [cart]);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((previous) => ({
      ...previous,
      [plant.name]: true,
    }));
  };

  const handleHomeClick = (event) => {
    event.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (event) => {
    event.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (event) => {
    event.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (event) => {
    event.preventDefault();
    setShowCart(false);
  };

  return (
    <div className="page-shell">
      <Navbar
        totalCartItems={totalCartItems}
        currentPage={showCart ? 'cart' : 'plants'}
        onHomeClick={handleHomeClick}
        onPlantsClick={handlePlantsClick}
        onCartClick={handleCartClick}
      />

      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <main className="products-page" id="plants">
          <section className="page-intro" aria-labelledby="collection-heading">
            <div>
              <p className="eyebrow">The houseplant collection</p>
              <h1 id="collection-heading">Find your perfect green companion.</h1>
            </div>
            <p>
              Explore three collections, each with six unique plants selected
              to make indoor growing simple and rewarding.
            </p>
          </section>

          {plantsArray.map((group, categoryIndex) => (
            <section className="product-list" key={group.category}>
              <div className="category-heading">
                <span>{String(categoryIndex + 1).padStart(2, '0')}</span>
                <h2>{group.category}</h2>
                <div aria-hidden="true" />
              </div>

              <div className="product-grid">
                {group.plants.map((plant) => (
                  <article className="product-card" key={plant.name}>
                    <div className="product-image-wrap">
                      <img src={plant.image} alt={`${plant.name} plant`} />
                      <span className="plant-care-label">Easy care</span>
                    </div>
                    <div className="product-card-body">
                      <div className="product-title-row">
                        <h3>{plant.name}</h3>
                        <strong>{formatCurrency(plant.price)}</strong>
                      </div>
                      <p>{plant.description}</p>
                      <button
                        className={addedToCart[plant.name] ? 'add-button added' : 'add-button'}
                        type="button"
                        disabled={addedToCart[plant.name]}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </main>
      )}

      <footer className="site-footer">
        <span>Paradise Nursery</span>
        <span>Plants for calmer, greener spaces.</span>
      </footer>
    </div>
  );
}

export default ProductList;
