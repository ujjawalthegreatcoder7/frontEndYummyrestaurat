import * as React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./pages.css";

/* Cart Context */
import { CartContext } from "../Context/context";
import CartSkeleton from "./skeleton";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className="menu-tab-panel"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Menu() {
  const [value, setValue] = useState(0);
  const [menuItems, setMenuItems] = useState([]);

  /* Cart Context */
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("https://final-restaurant-backend-1.onrender.com/menu")
      .then((res) => {
        setMenuItems(res.data);
        console.log("Menu Data Loaded:", res.data);
      })
      .catch((err) => {
        console.log("Error fetching menu:", err);
      });
  }, []);

  /* CATEGORY CHANGE + AUTO SCROLL TOP */
  const handleChange = (event, newValue) => {
    setValue(newValue);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ONLY 4 MAIN UI CATEGORIES */
  const categories = ["Chinese", "Main Course", "Beverages", "Desserts"];

  /* FILTERING */
  const filterItems = (category) => {
    switch (category) {
      case "Chinese":
        return menuItems.filter((item) =>
          ["Pizza", "Burger", "Pasta", "Starters", "Chinese"].includes(
            item.category
          )
        );

      case "Main Course":
        return menuItems.filter((item) =>
          ["Main Course", "Salads"].includes(item.category)
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

  /* RENDER ITEMS */
  const renderMenuItems = (items) => (
    <div className="menu-grid">
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item._id} className="menu-card">
            <img
              src={item.image}
              alt={item.name}
              className="menu-img"
            />

            <h3>{item.name}</h3>

            <p className="menu-description">
              {item.description}
            </p>

            <p className="price">₹{item.price}</p>

            <button
              className="add-cart-btn"
              onClick={() => {
                console.log("Button Clicked:", item);
                addToCart(item);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <div className="skeleton">
          <CartSkeleton />
        </div>
      )}
    </div>
  );

  return (
    <div className="menu-page">
      <div className="menu-header">
        <p className="menu-subtitle">Our Delicious Menu</p>
        <h1 className="menu-title">
          Choose Your Favorite Dish
        </h1>
      </div>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "#ffffff",
          display: "flex",
          minHeight: 700,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Menu Categories"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            minWidth: 220,
            backgroundColor: "#f8f9fa",
          }}
        >
          {categories.map((category, index) => (
            <Tab
              key={index}
              label={category}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>

        {categories.map((category, index) => (
          <TabPanel
            key={index}
            value={value}
            index={index}
          >
            {renderMenuItems(filterItems(category))}
          </TabPanel>
        ))}
      </Box>
    </div>
  );
}