import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "./pages.css";

export default function CartSkeleton() {
  return (
    <div className="cart-page">

      <div className="cart-grid">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="cart-card">
            <Stack spacing={2}>
              {/* Food Image */}
              <Skeleton
                variant="rounded"
                width="100%"
                height={180}
              />

              {/* Food Name */}
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
              />

              {/* Price */}
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem" }}
                width="60%"
              />

              {/* Quantity Controls */}
              <div className="quantity-controls">
                <Skeleton
                  variant="circular"
                  width={35}
                  height={35}
                />

                <Skeleton
                  variant="text"
                  width={30}
                  sx={{ fontSize: "1.2rem" }}
                />

                <Skeleton
                  variant="circular"
                  width={35}
                  height={35}
                />
              </div>

              {/* Total */}
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem" }}
                width="70%"
              />

              {/* Remove Button */}
              <Skeleton
                variant="rounded"
                width="100%"
                height={40}
              />
            </Stack>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <Skeleton
          variant="text"
          sx={{ fontSize: "2rem" }}
          width={200}
        />

        <Skeleton
          variant="rounded"
          width={250}
          height={50}
        />
      </div>
    </div>
  );
}