import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Context/context";
import "./productdetail.css"
import Skeleton from "@mui/material/Skeleton";
import CartSkeleton from "./skeleton";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

    axios
      .get(`https://final-restaurant-backend-1.onrender.com/menu/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
})
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="product-page">
        <h2>Loading your design...</h2>

        <CartSkeleton/>

      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/menu")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="product-page">

      {/* LEFT SIDE IMAGE */}
<div className="product-image-section">

  <div className="image-slider">

    {
      [
        product.image,
        product.image,
        product.image,
        product.image,
        product.image,
        product.image
      ].map((img, index) => (

        <div 
          className="image-card"
          key={index}
        >

          <img
            src={img}
            alt={`${product.name}-${index}`}
            className="product-main-image"
          />

        </div>

      ))
    }

  </div>

</div>

      {/* RIGHT SIDE DETAILS */}
      <div className="product-info-section">

        <h1 className="product-title">{product.name}</h1>

        <p className="product-category">
          Category: {product.category}
        </p>

        <h2 className="product-price">₹{product.price}</h2>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-badges">
          {product.available ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-stock">Out of Stock</span>
          )}
        </div>

        <div className="product-buttons">

          <button
            className="add-cart-btn"
            disabled={!product.available}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <button
            className="back-btn"
            onClick={() => navigate("/menu")}
          >
            ← Back to Collection
          </button>

        </div>

        {/* EXTRA BRAND INFO */}
        <div className="product-extra">
          <p>✨ Designed by Karigar Labs</p>
          <p>♻️ Eco-friendly 3D Printed Design</p>
          <p>🇮🇳 Made in India</p>
        </div>

      </div>
    </div>
  );
}