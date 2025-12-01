import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateCartItem, removeFromCart, getCartTotal, loading } = useCart();

  if (loading) {
    return <div className="cart-container">Loading...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <p className="empty-cart">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.productId} className="cart-item">
            <div className="cart-item-info">
              <h3>{item.product?.name || 'Product'}</h3>
              <p className="cart-item-price">
                ${item.product?.price?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="cart-item-controls">
              <button
                onClick={() => updateCartItem(item.productId, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="btn-quantity"
              >
                -
              </button>
              <span className="cart-item-quantity">{item.quantity}</span>
              <button
                onClick={() => updateCartItem(item.productId, item.quantity + 1)}
                className="btn-quantity"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.productId)}
                className="btn-remove"
              >
                Remove
              </button>
            </div>
            <div className="cart-item-total">
              ${((item.product?.price || 0) * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <strong>Total: ${getCartTotal().toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default Cart;

