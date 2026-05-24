// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../Context/context";
// import "./pages.css";

// export default function Cart() {
//   const {
//     cartItems,
//     removeFromCart,
//     increaseQuantity,
//     decreaseQuantity,
//   } = useContext(CartContext);

//   /* Navigation */
//   const navigate = useNavigate();

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="cart-page">
//       <h1>Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <div className="cart-grid">
//             {cartItems.map((item) => (
//               <div key={item._id} className="cart-card">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="cart-img"
//                 />

//                 <h3>{item.name}</h3>

//                 <p>Price: ₹{item.price}</p>

//                 {/* Quantity Controls */}
//                 <div className="quantity-controls">
//                   <button
//                     className="qty-btn"
//                     onClick={() => decreaseQuantity(item._id)}
//                   >
//                     -
//                   </button>

//                   <span className="quantity">{item.quantity}</span>

//                   <button
//                     className="qty-btn"
//                     onClick={() => increaseQuantity(item._id)}
//                   >
//                     +
//                   </button>
//                 </div>

//                 <p>Total: ₹{item.price * item.quantity}</p>

//                 <button
//                   className="remove-btn"
//                   onClick={() => removeFromCart(item._id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="cart-summary">
//             <h2>Total Bill: ₹{totalPrice}</h2>

//             <button
//               className="checkout-btn"
//               onClick={() => navigate("/checkout")}
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import { useContext } from "react";
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

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 🔥 CHECKOUT WITH GOOGLE LOGIN + SAVE USER
  const handleCheckout = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // 🔥 FULL USER DATA
      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      };

      console.log("USER DATA:", userData);

      // 🔥 SAVE TO BACKEND
      await fetch("http://localhost:5000/saveuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("User saved to backend ✔");

      // 👉 redirect after save
      navigate("/checkout");

    } catch (error) {
      console.log("Google login failed:", error);
    }
  };

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
                <img src={item.image} alt={item.name} className="cart-img" />

                <h3>{item.name}</h3>

                <p>Price: ₹{item.price}</p>

                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => increaseQuantity(item._id)}>+</button>
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

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}