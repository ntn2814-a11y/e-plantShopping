import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);

const getUnitPrice = (item) =>
  item.price ?? Number.parseFloat(String(item.cost).replace('$', ''));

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () =>
    cart.reduce(
      (total, item) => total + getUnitPrice(item) * item.quantity,
      0,
    );

  const calculateTotalCost = (item) => getUnitPrice(item) * item.quantity;

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        name: item.name,
        quantity: item.quantity + 1,
      }),
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          name: item.name,
          quantity: item.quantity - 1,
        }),
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (event) => {
    event.preventDefault();
    onContinueShopping(event);
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <main className="cart-page cart-container" id="cart">
      <section className="cart-heading" aria-labelledby="cart-heading">
        <div>
          <p className="eyebrow">Your green collection</p>
          <h1 id="cart-heading">Shopping Cart</h1>
        </div>
        <p>
          {totalItems} {totalItems === 1 ? 'plant' : 'plants'} ready to make
          your space feel more alive.
        </p>
      </section>

      {cart.length === 0 ? (
        <section className="empty-cart" aria-live="polite">
          <span className="empty-icon" aria-hidden="true">☘</span>
          <h2>Your cart is ready for something green.</h2>
          <p>Browse the collection and choose a plant that feels like you.</p>
          <button
            className="dark-button"
            type="button"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Plants in your cart">
            {cart.map((item) => (
              <article className="cart-item" key={item.name}>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />
                <div className="cart-item-info cart-item-details">
                  <p className="item-category">{item.category}</p>
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="unit-price cart-item-cost">
                    Unit price: {formatCurrency(getUnitPrice(item))}
                  </p>
                  <button
                    className="cart-item-delete"
                    type="button"
                    onClick={() => handleRemove(item)}
                  >
                    Delete
                  </button>
                </div>

                <div className="quantity-area cart-item-quantity">
                  <span className="quantity-label">Quantity</span>
                  <div className="quantity-control">
                    <button
                      className="cart-item-button cart-item-button-dec"
                      type="button"
                      onClick={() => handleDecrement(item)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      className="cart-item-button cart-item-button-inc"
                      type="button"
                      onClick={() => handleIncrement(item)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="item-total cart-item-total">
                  <span>Item total</span>
                  <strong>{formatCurrency(calculateTotalCost(item))}</strong>
                </div>
              </article>
            ))}
          </section>

          <aside className="order-summary" aria-labelledby="summary-heading">
            <p className="summary-kicker">Order summary</p>
            <h2 id="summary-heading">
              Total Cart Amount: {formatCurrency(calculateTotalAmount())}
            </h2>
            <dl>
              <div>
                <dt>Total plants</dt>
                <dd>{totalItems}</dd>
              </div>
              <div className="grand-total total_cart_amount">
                <dt>Total</dt>
                <dd>{formatCurrency(calculateTotalAmount())}</dd>
              </div>
            </dl>

            <button
              className="checkout-button get-started-button1"
              type="button"
              onClick={handleCheckout}
            >
              Checkout
            </button>
            <button
              className="continue-button get-started-button"
              type="button"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}

export default CartItem;
