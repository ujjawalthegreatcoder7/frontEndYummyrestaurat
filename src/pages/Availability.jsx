import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL =
  "https://final-restaurant-backend-1.onrender.com";

export default function Availability() {

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /* ================= FETCH MENU ================= */
  const fetchMenu = async () => {

    try {

      const res = await axios.get(
        `${BASE_URL}/admin/menu`
      );

      setMenuItems(res.data);

    } catch (error) {

      console.log(error);

      alert("Failed To Load Menu");

    } finally {

      setLoading(false);

    }

  };

  /* ================= TOGGLE FOOD ================= */
  const toggleFood = async (id) => {

    try {

      const res = await axios.put(
        `${BASE_URL}/admin/toggle-food/${id}`
      );

      alert(res.data.message);

      fetchMenu();

    } catch (error) {

      console.log(error);

      alert("Failed To Update Food");

    }

  };

  /* ================= LOAD ================= */
  useEffect(() => {

    fetchMenu();

  }, []);

  /* ================= SEARCH FILTER ================= */
  const filteredMenu = menuItems.filter((item) =>
    item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (

    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#ffbd06",
        }}
      >
         Availability Control
      </h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="🔍 Search Food..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        style={{
          width: "100%",
          maxWidth: "500px",
          display: "block",
          margin: "0 auto 30px auto",
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1px solid #444",
          background: "#1e1e1e",
          color: "white",
          fontSize: "16px",
          outline: "none",
        }}
      />

      {loading ? (

        <h2 style={{ textAlign: "center" }}>
          Loading Menu...
        </h2>

      ) : (

        <>
          {filteredMenu.length === 0 && (
            <h2
              style={{
                textAlign: "center",
                color: "#ffbd06",
              }}
            >
              No Food Found 🍔
            </h2>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: "20px",
            }}
          >

            {filteredMenu.map((item, index) => (

              <div
                key={index}
                style={{
                  background: "#1e1e1e",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid #333",
                  boxShadow:
                    "0 0 15px rgba(255,189,6,0.3)",
                }}
              >

                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                />

                {/* NAME */}
                <h2
                  style={{
                    marginBottom: "10px",
                    color: "#ffbd06",
                  }}
                >
                  {item.name}
                </h2>

                {/* PRICE */}
                <p
                  style={{
                    fontSize: "18px",
                    marginBottom: "15px",
                  }}
                >
                  ₹ {item.price}
                </p>

                {/* STATUS */}
                <p
                  style={{
                    marginBottom: "15px",
                    fontWeight: "bold",
                    color:
                      item.available
                        ? "limegreen"
                        : "red",
                  }}
                >
                  {item.available
                    ? "✅ Available"
                    : "❌ Disabled"}
                </p>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    toggleFood(item._id)
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",

                    background:
                      item.available
                        ? "red"
                        : "green",

                    color: "white",
                  }}
                >
                  {item.available
                    ? "Disable Food"
                    : "Enable Food"}
                </button>

              </div>

            ))}

          </div>
        </>

      )}

    </div>

  );

}