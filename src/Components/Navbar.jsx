import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/context";
import "./component.css"

export default function Navbar() {
  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">Yummy.</Link>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/contact">Details</Link>
        <Link to="/Admin">Admin</Link>
      </div>

      {/* Cart */}
      <div className="navbar-cart">
        <Link to="/cart" className="cart-link">
          🛒
          {totalItems > 0 && (
            <span className="cart-badge">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}