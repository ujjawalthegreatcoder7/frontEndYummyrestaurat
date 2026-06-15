import * as React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./pages.css";
import { CartContext } from "../Context/context";
import CartSkeleton from "./skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

import { useNavigate } from "react-router-dom";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Menu() {
  const [value, setValue] = useState(0);
  const [menuItems, setMenuItems] = useState([]);



  /* ✅ FLASH STATE */
  const [flashMsg, setFlashMsg] = useState("");
  const [timer, setTimer] = useState(null);

  // const { addToCart } = useContext(CartContext);
  const { addToCart, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const totalItems = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

  useEffect(() => {
    axios
      .get("https://final-restaurant-backend-1.onrender.com/menu")
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);
  };
  const categories = ["southindian", "Chinese", "Main Course", "Beverages", "Desserts"];

  const filterItems = (category) => {
    switch (category) {
      case "Chinese":
        return menuItems.filter((item) =>
          ["Pizza", "Burger", "Pasta", "Starters"].includes(item.category)
        );

      case "Main Course":
        return menuItems.filter((item) =>
          ["Main Course", "Salads"].includes(item.category)
        );

      case "southindian":
        return menuItems.filter((item) =>
          ["southindian"].includes(item.category)
        );
      case "Beverages":
        return menuItems.filter((item) =>
          ["Beverages"].includes(item.category)
        );

      case "Desserts":
        return menuItems.filter((item) =>
          ["Desserts"].includes(item.category)
        );

      default:
        return [];
    }
  };

  /* ✅ FLASH HANDLER SAFE */
  const showFlash = (message) => {
    setFlashMsg(message);

    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(() => {
      setFlashMsg("");
    }, 2000);

    setTimer(newTimer);
  };

  const renderMenuItems = (items) => (
    <div className="menu-grid">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div
            key={item._id}
            className="menu-card"
            data-aos="zoom-in-up"
            data-aos-delay={index * 100}
          >
            <img src={item.image} alt={item.name} className="menu-img" />

            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p className="price">₹{item.price}</p>

            <button
              className="add-cart-btn"
              onClick={() => {
                addToCart(item);
                showFlash("Added to cart successfully!");
              }}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <CartSkeleton />
      )}
    </div>
  );
  return (
    <div className="menu-page">

      {/* 🔥 FLASH MESSAGE */}
      {flashMsg && (
        <div className="flash-message">
          {flashMsg}
        </div>
      )}

      <div className="menu-header">
        <p className="menu-subtitle">Our Delicious Menu</p>
        <h1 className="menu-title">Choose Your Favorite Dish</h1>
      </div>

      <Box sx={{
        display: "flex",

      }}>
        <Tabs
          style={{
            backgroundColor: "#ffffff", // ✅ ALL WHITE
          }}


          orientation="vertical"
          value={value}
          onChange={handleChange}
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </Tabs>

        {categories.map((category, index) => (
          <TabPanel key={index} value={value} index={index}>
            {renderMenuItems(filterItems(category))}
          </TabPanel>
        ))}
      </Box>

      {totalItems > 0 && (
        <button
          className="place-order-btn"
          onClick={() => navigate("/cart")}
        >
          🛒 Place Order ({totalItems})
        </button>
      )}
    </div>
  );
}