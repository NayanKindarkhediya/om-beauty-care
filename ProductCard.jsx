import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Img } from "./ui.jsx";
import { useStore } from "../context/Store.jsx";
import { inr } from "../utils.js";
export function Price({ p }) {
  return (
    <p className="price">
      {p.sale ? (
        <>
          <b>{inr(p.sale)}</b><s>{inr(p.price)}</s>
        </>
      ) : (
        <b>{inr(p.price)}</b>
      )}
    </p>
  );
}
export function ProductCard({ p }) {
  const { add, wish, toggleWish } = useStore();
  const liked = wish.includes(p.id);
  const out = p.stock === "Out of stock";
  return (
    <motion.article
      className="card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={`/product/${p.slug}`}
        className="imgwrap"
        aria-label={`View ${p.name}`}
      >
        <Img src={p.images[0]} alt={`${p.name} by ${p.brand}`} name={p.name} />
        {p.sale > 0 && <span className="tag">Sale</span>}
        {out && <span className="tag out">Sold out</span>}
      </Link>
      <button
        className="heart"
        aria-label={
          liked ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`
        }
        aria-pressed={liked}
        onClick={() => toggleWish(p.id)}
      >
        <Heart size={18} fill={liked ? "currentColor" : "none"} />
      </button>
      <div className="info">
        <small>{p.brand}</small>
        <h3>
          <Link to={`/product/${p.slug}`}>{p.name}</Link>
        </h3>
        <Price p={p} />
        <button className="btn dark" disabled={out} onClick={() => add(p.id)}>
          {out ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </motion.article>
  );
}
export const ProductGrid = ({ items }) => (
  <div className="grid">
    {items.map((p) => (
      <ProductCard key={p.id} p={p} />
    ))}
  </div>
);
