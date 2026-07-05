import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL =
  "https://final-restaurant-backend-1.onrender.com";

export default function Admin() {

  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {

    try {

      /* GET SAVED PASSWORD */
      let savedPassword =
        localStorage.getItem("adminPassword");

      /* ASK ONLY FIRST TIME */
      if (!savedPassword) {

        savedPassword = prompt(
          "Enter Admin Password"
        );

        localStorage.setItem(
          "adminPassword",
          savedPassword
        );
      }

      const res = await axios.get(
        `${BASE_URL}/yummyrestaurant/backend`,
        {
          headers: {
            "x-admin-password": savedPassword,
          },
        }
      );

      /* SUCCESS */
      if (res.data.success) {

        setOrders(res.data.orders || []);

      } else {

        setOrders([]);
      }

    } catch (error) {

      /* REMOVE WRONG PASSWORD */
      localStorage.removeItem(
        "adminPassword"
      );

      setOrders([]);

      alert(
        error.response?.data?.message ||
        "Unauthorized Access"
      );

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  /* ================= FETCH MENU ================= */
  const fetchMenu = async () => {

    try {

      const res = await axios.get(
        `${BASE_URL}/admin/menu`
      );

      setMenuItems(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  /* ================= TOGGLE FOOD ================= */
const toggleFood = async (id) => {

  try {

    const res = await axios.put(
      `${BASE_URL}/admin/toggle-food/${id}`
    );

    /* ✅ SUCCESS FLASH */
    alert(res.data.message);

    fetchMenu();

  } catch (error) {

    console.log(error);

    alert("Failed To Update Food");

  }

};
  /* ================= COMPLETE ORDER ================= */
  const completeOrder = (billNumber) => {

    const updatedOrders = orders.filter(
      (order) => order.billNumber !== billNumber
    );

    setOrders(updatedOrders);

  };

  /* ================= AUTO LOAD ================= */
  useEffect(() => {

    fetchOrders();
    fetchMenu();

    /* AUTO REFRESH */
    const interval = setInterval(() => {
      fetchOrders();
      fetchMenu();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  /* ================= LOGOUT ================= */
  const logoutAdmin = () => {

    localStorage.removeItem(
      "adminPassword"
    );

    window.location.reload();
  };

  return (

    <div
      style={{
        background: "#0f0f0f",
        minHeight: "100vh",
        padding: "25px",
        color: "white",
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >

        <h1
          style={{
            color: "#ffbd06",
            margin: 0,
          }}
        >
          🍽️ Yummy Restaurant Admin
        </h1>

{localStorage.getItem("adminPassword") && (

  <div
    style={{
      marginTop: "15px",
      marginBottom: "25px",
    }}
  >
    <button
      onClick={() =>
        window.location.href =
          "/Availability"
      }
      style={{
        background: "#ffbd06",
        color: "black",
        border: "none",
        padding: "12px 20px",
        borderRadius: "10px",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      🍔 Food Availability Control
    </button>
  </div>

)}
        <button
          onClick={logoutAdmin}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>

      </div>

      {/* ================= FOOD CONTROL ================= */}

      {/* <div
        style={{
          marginBottom: "40px",
        }}
      >

        <h2
          style={{
            color: "#ffbd06",
            marginBottom: "20px",
          }}
        >
          🍔 Food Availability Control
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "15px",
          }}
        >

          {menuItems.map((item, index) => (

            <div
              key={index}
              style={{
                background: "#1b1b1b",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid #333",
              }}
            >

              <h3>{item.name}</h3>

              <p>₹ {item.price}</p>

              <button
                onClick={() =>
                  toggleFood(item._id)
                }
                style={{
                  background:
                    item.available
                      ? "red"
                      : "green",

                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "100%",
                  fontWeight: "bold",
                }}
              >
                {item.available
                  ? "Disable Food"
                  : "Enable Food"}
              </button>

            </div>

          ))}

        </div>

      </div> */}

      {/* LOADING */}
      {loading ? (

        <h2>Loading Orders...</h2>

      ) : orders.length === 0 ? (

        <h2>No Orders Found</h2>

      ) : (

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "20px",
          }}
        >

          {orders.map((order, index) => (

            <div
              key={index}
              style={{
                background: "#000000",
                borderRadius: "10px",
                padding: "20px",
                border: "2px solid #fff7f7",
                boxShadow:
                  "0 0 30px rgb(255, 196, 0)",
              }}
            >

              {/* BILL */}
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >

                <h2
                  style={{
                    color: "#ffbd06",
                    margin: 0,
                  }}
                >
                  {order.billNumber}
                </h2>

                <span
                  style={{
                    background:
                      order.paymentMethod ===
                      "ONLINE"
                        ? "green"
                        : "orange",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {order.paymentMethod}
                </span>

              </div>

              {/* CUSTOMER */}
              <p>
                👤 <strong>Name:</strong>{" "}
                {order.customerName || "N/A"}
              </p>

              <p>
                📧 <strong>Email:</strong>{" "}
                {order.customerEmail || "N/A"}
              </p>

              <p>
                🍽️ <strong>Table:</strong>{" "}
                {order.tableNumber}
              </p>

              <p>
                💰 <strong>Total:</strong> ₹
                {order.totalPrice}
              </p>

              <p>
                🕒 <strong>Time:</strong>{" "}
                {order.time}
              </p>

              <p>
                📝 <strong>Info:</strong>{" "}
                {order.AdditionalInformation ||
                  "None"}
              </p>

              <hr
                style={{
                  borderColor: "#ff9d00",
                  margin: "15px 0",
                }}
              />

              <h3
                style={{
                  color: "#ffbd06",
                }}
              >
                Ordered Items
              </h3>

              {order.cartItems.map(
                (item, i) => (

                  <div
                    key={i}
                    style={{
                      background: "#767676",
                      padding: "12px",
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                  >

                    <p>
                      🍔{" "}
                      <strong>
                        {item.name}
                      </strong>
                    </p>

                    <p>
                      Quantity:{" "}
                      {item.quantity}
                    </p>

                    <p>
                      Price: ₹{item.price}
                    </p>

                    <p>
                      Total: ₹
                      {item.price *
                        item.quantity}
                    </p>

                  </div>

                )
              )}

              {/* COMPLETE BUTTON */}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}