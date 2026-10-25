import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import Header from './Header';
import './ProductList.css';

export const plants = [
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    category: 'Air-Purifying Plants',
    price: 18,
    description: 'Architectural leaves and a forgiving nature for effortless greenery.',
    image: '/assets/plants/snake-plant.svg',
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    category: 'Air-Purifying Plants',
    price: 22,
    description: 'Glossy foliage and elegant white blooms that brighten quiet corners.',
    image: '/assets/plants/peace-lily.svg',
  },
  {
    id: 'rubber-plant',
    name: 'Rubber Plant',
    category: 'Air-Purifying Plants',
    price: 26,
    description: 'Deep green leaves with a bold silhouette for modern interiors.',
    image: '/assets/plants/rubber-plant.svg',
  },
  {
    id: 'golden-pothos',
    name: 'Golden Pothos',
    category: 'Low-Light Favorites',
    price: 16,
    description: 'Cascading heart-shaped leaves that stay cheerful in gentle light.',
    image: '/assets/plants/golden-pothos.svg',
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    category: 'Low-Light Favorites',
    price: 24,
    description: 'Polished stems, easy care, and exceptional tolerance of low light.',
    image: '/assets/plants/zz-plant.svg',
  },
  {
    id: 'cast-iron-plant',
    name: 'Cast Iron Plant',
    category: 'Low-Light Favorites',
    price: 28,
    description: 'A resilient classic with graceful leaves and very modest demands.',
    image: '/assets/plants/cast-iron-plant.svg',
  },
  {
    id: 'calathea',
    name: 'Calathea Orbifolia',
    category: 'Pet-Friendly Plants',
    price: 30,
    description: 'Silver-striped leaves that turn everyday shelves into a statement.',
    image: '/assets/plants/calathea.svg',
  },
  {
    id: 'parlor-palm',
    name: 'Parlor Palm',
    category: 'Pet-Friendly Plants',
    price: 25,
    description: 'Soft palm fronds bring relaxed, tropical character to smaller rooms.',
    image: '/assets/plants/parlor-palm.svg',
  },
  {
    id: 'boston-fern',
    name: 'Boston Fern',
    category: 'Pet-Friendly Plants',
    price: 20,
    description: 'A cloud of feathery fronds that loves bright, humid spaces.',
    image: '/assets/plants/boston-fern.svg',
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);

function ProductList({ totalItems, onHomeClick, onProductsClick, onCartClick }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const categories = [...new Set(plants.map((plant) => plant.category))];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="page-shell">
      <Header
        currentPage="products"
        totalItems={totalItems}
        onHomeClick={onHomeClick}
        onProductsClick={onProductsClick}
        onCartClick={onCartClick}
      />

      <main className="products-page">
        <section className="page-intro" aria-labelledby="collection-heading">
          <div>
            <p className="eyebrow">The houseplant collection</p>
            <h1 id="collection-heading">Find your perfect green companion.</h1>
          </div>
          <p>
            From resilient desk plants to soft, pet-friendly foliage, each
            plant is selected to make indoor growing feel wonderfully simple.
          </p>
        </section>

        {categories.map((category, categoryIndex) => (
          <section className="category-section" key={category} aria-labelledby={`category-${categoryIndex}`}>
            <div className="category-heading">
              <span>{String(categoryIndex + 1).padStart(2, '0')}</span>
              <h2 id={`category-${categoryIndex}`}>{category}</h2>
              <div aria-hidden="true" />
            </div>

            <div className="product-grid">
              {plants
                .filter((plant) => plant.category === category)
                .map((plant) => {
                  const isInCart = cart.some((item) => item.id === plant.id);

                  return (
                    <article className="product-card" key={plant.id}>
                      <div className="product-image-wrap">
                        <img src={plant.image} alt={`${plant.name} houseplant`} />
                        <span className="plant-care-label">Easy care</span>
                      </div>
                      <div className="product-card-body">
                        <div className="product-title-row">
                          <h3>{plant.name}</h3>
                          <strong>{formatCurrency(plant.price)}</strong>
                        </div>
                        <p>{plant.description}</p>
                        <button
                          className={isInCart ? 'add-button added' : 'add-button'}
                          type="button"
                          disabled={isInCart}
                          onClick={() => handleAddToCart(plant)}
                        >
                          {isInCart ? (
                            <>
                              <span aria-hidden="true">✓</span> Added to Cart
                            </>
                          ) : (
                            <>
                              Add to Cart <span aria-hidden="true">＋</span>
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>
        ))}
      </main>

      <footer className="site-footer">
        <span>Paradise Nursery</span>
        <span>Plants for calmer, greener spaces.</span>
      </footer>
    </div>
  );
}

export default ProductList;
