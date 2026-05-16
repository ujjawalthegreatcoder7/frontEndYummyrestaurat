import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/context";
import "./pages.css";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  /* Navigation */
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-img"
                />

                <h3>{item.name}</h3>

                <p>Price: ₹{item.price}</p>

                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQuantity(item._id)}
                  >
                    -
                  </button>

                  <span className="quantity">{item.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() => increaseQuantity(item._id)}
                  >
                    +
                  </button>
                </div>

                <p>Total: ₹{item.price * item.quantity}</p>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total Bill: ₹{totalPrice}</h2>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}