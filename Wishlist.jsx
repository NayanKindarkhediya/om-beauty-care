import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { ProductGrid } from "../components/ProductCard.jsx";
import { useStore } from "../context/Store.jsx";
import { products } from "../data.js";
export default function Wishlist() {
  const { wish } = useStore();
  const items = products.filter((p) => wish.includes(p.id));
  return (
    <div className="wrap page">
      <h1 className="h1s">Your wishlist</h1>
      {items.length === 0 ? (
        <div className="empty">
          <Heart size={32} strokeWidth={1.2} />
          <p>
            Nothing saved yet. Tap the heart on any product to keep it here.
          </p>
          <Link className="btn dark" to="/shop">
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <p>
            Tap the heart to remove an item, or add it straight to your bag.
          </p>
          <ProductGrid items={items} />
        </>
      )}
    </div>
  );
}
