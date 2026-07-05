import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Footer from "./Components/Footer";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Navbar from "./Components/Navbar";
import Checkout from "./pages/CheckOut";
import Admin from "./pages/Admin";
import Availability from "./pages/Availability";
// import FoodAvailabilityControl from "./pages/FoodAvailabilityControl";

function App() {
  return (
    <BrowserRouter>

      <div className="app-container">

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/details" element={<details />} />
          <Route path="/CheckOut" element={<Checkout />} />
          <Route path="/Admin" element={<Admin />} />
          <Route
            path="/Availability"
            element={<Availability />}
          />

          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;