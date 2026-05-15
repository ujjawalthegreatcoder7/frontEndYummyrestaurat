import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./Components/Footer";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Navbar from "./Components/Navbar";
import Checkout from "./pages/CheckOut";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/CheckOut" element={<Checkout />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;