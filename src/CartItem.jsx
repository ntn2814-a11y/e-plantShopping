import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import Header from './Header';
import './CartItem.css';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);

function CartItem({ totalItems, onHomeClick, onProductsClick, onCartClick }) {
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalCost = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    setCheckoutMessage('Checkout is coming soon — your plants are saved in the cart.');
  };

  return (
    <div className="page-shell cart-page-shell">
      <Header
        currentPage="cart"
        totalItems={totalItems}
        onHomeClick={onHomeClick}
        onProductsClick={onProductsClick}
        onCartClick={onCartClick}
      />

      <main className="cart-page">
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
            <button className="dark-button" type="button" onClick={onProductsClick}>
              Explore Plants <span aria-hidden="true">→</span>
            </button>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-items" aria-label="Plants in your cart">
              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={`${item.name} houseplant`} />
                  <div className="cart-item-info">
                    <p className="item-category">{item.category}</p>
                    <h2>{item.name}</h2>
                    <p className="unit-price">{formatCurrency(item.price)} each</p>
                    <button
                      className="remove-button"
                      type="button"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="quantity-area">
                    <span className="quantity-label">Quantity</span>
                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() => handleDecrement(item)}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleIncrement(item)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    <span>Subtotal</span>
                    <strong>{formatCurrency(item.price * item.quantity)}</strong>
                  </div>
                </article>
              ))}
            </section>

            <aside className="order-summary" aria-labelledby="summary-heading">
              <p className="summary-kicker">Order summary</p>
              <h2 id="summary-heading">A greener space awaits.</h2>
              <dl>
                <div>
                  <dt>Total plants</dt>
                  <dd>{totalItems}</dd>
                </div>
                <div>
                  <dt>Plant total</dt>
                  <dd>{formatCurrency(totalCost)}</dd>
                </div>
                <div>
                  <dt>Delivery</dt>
                  <dd>Free</dd>
                </div>
                <div className="grand-total">
                  <dt>Total</dt>
                  <dd>{formatCurrency(totalCost)}</dd>
                </div>
              </dl>

              <button className="checkout-button" type="button" onClick={handleCheckout}>
                Checkout <span aria-hidden="true">→</span>
              </button>
              <button className="continue-button" type="button" onClick={onProductsClick}>
                ← Continue Shopping
              </button>
              <p className="checkout-message" role="status" aria-live="polite">
                {checkoutMessage}
              </p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartItem;
