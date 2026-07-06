import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Home from "./pages/Home";
import Footer from "./Components/Footer";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Navbar from "./Components/Navbar";
import Checkout from "./pages/CheckOut";
import Admin from "./pages/Admin";
import Availability from "./pages/Availability";
import ProductDetails from "./pages/ProductDetails";

import { CartContext } from "./Context/context";


// import FoodAvailabilityControl from "./pages/FoodAvailabilityControl";


function App() {

  const { cartItems } = useContext(CartContext);


  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );


  return (
    <BrowserRouter>

      <div className="app-container">

        <Navbar />


        {/* GLOBAL CART BUTTON */}
        {totalItems > 0 && (
          <button
            className="place-order-btn"
            onClick={() => {
              window.location.href = "/Cart";
            }}
          >
            🛒 Place Order ({totalItems})
          </button>
        )}



        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/Menu" element={<Menu />} />

          <Route path="/Cart" element={<Cart />} />

          {/* <Route path="/details" element={<Footer />} /> */}


          <Route 
            path="/product/:id" 
            element={<ProductDetails />} 
          />


          <Route path="/CheckOut" element={<Checkout />} />

          <Route path="/Admin" element={<Admin />} />


          <Route
            path="/Availability"
            element={<Availability />}
          />


          {/* <Route path="*" element={<Home />} /> */}

        </Routes>


        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;