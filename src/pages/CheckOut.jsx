// import { useContext, useState } from "react";
// import { CartContext } from "../Context/context";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./pages.css";

// const BASE_URL = "https://final-restaurant-backend-1.onrender.com";

// export default function Checkout() {
//   const { cartItems, setCartItems } = useContext(CartContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     customerName: "",
//     phone: "",
//     tableNumber: "",
//   });

//   const [enteredOTP, setEnteredOTP] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [verified, setVerified] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   /* =========================
//      SEND OTP
//   ========================= */
//   const sendOTP = async () => {
//     if (!formData.phone || formData.phone.length < 10) {
//       alert("Enter valid phone number");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post(`${BASE_URL}/send-otp`, {
//         phone: formData.phone,
//       });

//       setOtpSent(true);
//       alert("OTP sent successfully");
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================
//      VERIFY OTP
//   ========================= */
//   const verifyOTP = async () => {
//     if (!enteredOTP) {
//       alert("Enter OTP");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(`${BASE_URL}/verify-otp`, {
//         phone: formData.phone,
//         otp: enteredOTP,
//       });

//       setVerified(true);
//       alert(res.data.message);
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================
//      PLACE ORDER
//   ========================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (cartItems.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     // OTP verification disabled temporarily
//     if (!verified) {
//       alert("Please verify phone first");
//       return;
//     }

//     try {
//       setLoading(true);

//       const orderData = {
//         ...formData,
//         cartItems,
//         totalPrice,
//       };

//       const res = await axios.post(
//         `${BASE_URL}/place-order`,
//         // "http://localhost:5000/place-order",
//         orderData
//       );

//       console.log("SUCCESS:", res.data);

      // alert("Order placed successfully");
      // navigate("/");
      // window.location.reload();
      // localStorage.removeItem("cartItems");

//       setCartItems([]);
//     } catch (error) {
//       console.log("FAILED:", error.response?.data || error);
//       // alert(error.response?.data?.message || "Order failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="checkout-page">
//       <div className="checkout-container">
//         <h1>Complete Your Order</h1>

//         <form onSubmit={handleSubmit} className="checkout-form">
//           <input
//             type="text"
//             name="customerName"
//             placeholder="Customer Name"
//             value={formData.customerName}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />

//           <button
//             type="button"
//             onClick={sendOTP}
//             className="confirm-order-btn"
//             disabled={loading}
//           >
//             Send OTP
//           </button>

//           {otpSent && (
//             <>
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={enteredOTP}
//                 onChange={(e) => setEnteredOTP(e.target.value)}
//               />

//               <button
//                 type="button"
//                 className="confirm-order-btn"
//                 onClick={verifyOTP}
//                 disabled={loading}
//               >
//                 Verify OTP
//               </button>
//             </>
//           )}

//           {verified && (
//             <p style={{ color: "green" }}>
//               Phone Verified ✅
//             </p>
//           )}

//           <input
//             type="number"
//             name="tableNumber"
//             placeholder="Table Number"
//             value={formData.tableNumber}
//             onChange={handleChange}
//             required
//           />
//           <input
//             // type="number"
//             name="AdditionalInformation"
//             placeholder="Additional Information"
//             value={formData.AdditionalInformation}
//             onChange={handleChange}
            
//           /> 

//           <div>
//             <h3>Order Summary</h3>

//             {cartItems.map((item) => (
//               <div key={item._id}>
//                 {item.name} × {item.quantity} = ₹
//                 {item.price * item.quantity}
//               </div>
//             ))}

//             <h2>Total: ₹{totalPrice}</h2>
//           </div>

//           <button
//             type="submit"
//             className="confirm-order-btn"
//             disabled={loading}
//           >
//             Confirm Order
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

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
    AdditionalInformation: "",
    paymentMethod: "COD", // COD / ONLINE
  });

  const [enteredOTP, setEnteredOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
      console.log("OTP SEND ERROR:", error);
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
      alert(res.data.message || "Phone verified successfully");
    } catch (error) {
      console.log("OTP VERIFY ERROR:", error);
      alert(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     HANDLE RAZORPAY PAYMENT
  ========================= */
  const handleRazorpayPayment = async () => {
    try {
      setLoading(true);

      // Create Razorpay order from backend
      const { data } = await axios.post(`${BASE_URL}/create-razorpay-order`, {
        amount: totalPrice,
      });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Restaurant Order",
        description: "Food Payment",
        order_id: data.orderId,

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${BASE_URL}/verify-razorpay-payment`,
              response
            );

            if (verifyRes.data.success) {
              placeFinalOrder("ONLINE");
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.log(err);
            alert("Payment failed");
          }
        },

        prefill: {
          name: formData.customerName,
          contact: formData.phone,
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.log("RAZORPAY ERROR:", error);
      alert("Payment initialization failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     FINAL ORDER SUBMIT
  ========================= */
  const placeFinalOrder = async (paymentMode) => {
    try {
      const orderData = {
        ...formData,
        paymentMethod: paymentMode,
        cartItems,
        totalPrice,
      };

      const res = await axios.post(
        `${BASE_URL}/place-order`,
        orderData
      );

      console.log("ORDER SUCCESS:", res.data);

      alert(
        paymentMode === "ONLINE"
          ? "Payment successful & order placed!"
          : "Order placed successfully!"
      );

      alert("Order placed successfully");
      navigate("/");
      window.location.reload();
      localStorage.removeItem("cartItems");


      // Clear cart
      localStorage.removeItem("cartItems");
      setCartItems([]);

      // Navigate home
      navigate("/");

      // Refresh
      window.location.reload();

    } catch (error) {
      console.log("ORDER FAILED:", error.response?.data || error);
      // alert(error.response?.data?.message || "Order failed");
    }
  };

  /* =========================
     PLACE ORDER BUTTON
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

    if (formData.paymentMethod === "ONLINE") {
      handleRazorpayPayment();
    } else {
      placeFinalOrder("COD");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Complete Your Order</h1>

        <form onSubmit={handleSubmit} className="checkout-form">

          {/* Customer Name */}
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* Send OTP */}
          <button
            type="button"
            onClick={sendOTP}
            className="confirm-order-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

          {/* OTP Verification */}
          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={enteredOTP}
                onChange={(e) => setEnteredOTP(e.target.value)}
                required
              />

              <button
                type="button"
                className="confirm-order-btn"
                onClick={verifyOTP}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {/* Verified Status */}
          {verified && (
            <p style={{ color: "green", fontWeight: "bold" }}>
              Phone Verified ✅
            </p>
          )}

          {/* Table Number */}
          <input
            type="number"
            name="tableNumber"
            placeholder="Table Number"
            value={formData.tableNumber}
            onChange={handleChange}
            required
          />

          {/* Additional Information */}
          <input
            type="text"
            name="AdditionalInformation"
            placeholder="Additional Information (Optional)"
            value={formData.AdditionalInformation}
            onChange={handleChange}
          />

          {/* Payment Method */}
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="COD">Cash on Delivery / Pay at Restaurant</option>
            <option value="ONLINE">Online Payment (Razorpay)</option>
          </select>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>

            {cartItems.map((item) => (
              <div key={item._id}>
                {item.name} × {item.quantity} = ₹
                {item.price * item.quantity}
              </div>
            ))}

            <h2>Total: ₹{totalPrice}</h2>
          </div>

          {/* Confirm Order */}
          <button
            type="submit"
            className="confirm-order-btn"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : formData.paymentMethod === "ONLINE"
              ? "Pay & Confirm Order"
              : "Confirm Order"}
          </button>

        </form>
      </div>
    </div>
  );
}