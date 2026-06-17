import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/context";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

import "./pages.css";

export default function Cart() {

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    try {

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      };

      console.log("USER DATA:", userData);

      const response = await fetch(
        "https://final-restaurant-backend-1.onrender.com/saveuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      console.log("BACKEND RESPONSE:", data);

      if (response.ok) {

        console.log("User saved successfully ✔");

        localStorage.setItem(
          "restaurantUser",
          JSON.stringify(userData)
        );

        navigate("/checkout");

      } else {

        console.log("Failed to save user");

      }

    } catch (error) {

      console.log("Google Login Error:", error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="south-loading">

        <img
          src="https://cdn.dribbble.com/userupload/41870803/file/original-97410e04c492679fff3e75505987f89a.gif"
          alt="South Indian Food"
          className="loading-food"
        />

        {/* <h2>🍛 Preparing Your South Indian Feast...</h2> */}

        {/* <p>
          🥞 Making Crispy Dosa...
          <br />
          ☕ Brewing Filter Coffee...
          <br />
          🍚 Steaming Soft Idlis...
        </p> */}

      </div>
    );
  }

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

                <div className="quantity-controls">

                  <button
                    className="qty-btn"
                    onClick={() => decreaseQuantity(item._id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

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
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>

          </div>
        </>
      )}

    </div>
  );
}