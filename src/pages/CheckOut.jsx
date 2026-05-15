import { useContext, useState } from "react";
import { CartContext } from "../Context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./pages.css";

const BASE_URL = "https://final-restaurant-backend-1.onrender.com";

export default function Checkout() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    tableNumber: "",
  });

  const [enteredOTP, setEnteredOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     SEND OTP
  ========================= */
  const sendOTP = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert("Enter valid phone number");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${BASE_URL}/send-otp`, {
        phone: formData.phone,
      });

      setOtpSent(true);
      alert("OTP sent successfully");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     VERIFY OTP
  ========================= */
  const verifyOTP = async () => {
    if (!enteredOTP) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/verify-otp`, {
        phone: formData.phone,
        otp: enteredOTP,
      });

      setVerified(true);
      alert(res.data.message);

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     PLACE ORDER
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!verified) {
      alert("Please verify phone first");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        ...formData,
        cartItems,
        totalPrice,
      };

      await axios.post(`${BASE_URL}/place-order`, orderData);

      alert("Order placed successfully");

      setCartItems([]);
      localStorage.removeItem("cartItems");

      navigate("/Home");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        <h1>Complete Your Order</h1>

        <form onSubmit={handleSubmit} className="checkout-form">

          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            onClick={sendOTP}
            className="confirm-order-btn"
            disabled={loading}
          >
            Send OTP
          </button>

          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={enteredOTP}
                onChange={(e) => setEnteredOTP(e.target.value)}
              />

              <button
                type="button"
                className="confirm-order-btn"
                onClick={verifyOTP}
                disabled={loading}
              >
                Verify OTP
              </button>
            </>
          )}

          {verified && (
            <p style={{ color: "green" }}>
              Phone Verified ✅
            </p>
          )}

          <input
            type="number"
            name="tableNumber"
            placeholder="Table Number"
            value={formData.tableNumber}
            onChange={handleChange}
            required
          />

          <div>
            <h3>Order Summary</h3>

            {cartItems.map((item) => (
              <div key={item._id}>
                {item.name} × {item.quantity} = ₹
                {item.price * item.quantity}
              </div>
            ))}

            <h2>Total: ₹{totalPrice}</h2>
          </div>

          <button
            type="submit"
            className="confirm-order-btn"
            disabled={!verified || loading}
          >
            Confirm Order
          </button>

        </form>
      </div>
    </div>
  );
}