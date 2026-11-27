import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Minus, Plus, ArrowLeft } from "lucide-react";
import { Img } from "../components/ui.jsx";
import { Price, ProductGrid } from "../components/ProductCard.jsx";
import { NotFound } from "./Info.jsx";
import { useStore } from "../context/Store.jsx";
import { products } from "../data.js";
import { DEMO_NOTE } from "../utils.js";
export default function ProductDetails() {
  const { slug } = useParams();
  const p = products.find((x) => x.slug === slug);
  if (!p) return <NotFound product />;
  return <Detail key={p.id} p={p} />;
}
function Detail({ p }) {
  const { add, wish, toggleWish } = useStore();
  const [q, setQ] = useState(1);
  const [i, setI] = useState(0);
  const liked = wish.includes(p.id);
  const out = p.stock === "Out of stock";
  const rel = products
    .filter((x) => x.category === p.category && x.id !== p.id)
    .slice(0, 4);
  return (
    <div className="wrap page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
        <Link to={`/shop?cat=${encodeURIComponent(p.category)}`}>
          {p.category}
        </Link>{" "}
        / <span>{p.name}</span>
      </nav>
      <div className="pd">
        <div className="gallery">
          <div className="imgwrap big">
            <Img
              key={i}
              src={p.images[i]}
              alt={`${p.name}, view ${i + 1}`}
              name={p.name}
              eager
            />
          </div>
          <div className="thumbs">
            {p.images.map((s, k) => (
              <button
                key={s}
                className={k === i ? "on" : ""}
                aria-label={`Show image ${k + 1}`}
                aria-pressed={k === i}
                onClick={() => setI(k)}
              >
                <Img src={s} alt="" name={`View ${k + 1}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="pdinfo">
          <small>
            {p.brand} · {p.category}
          </small>
          <h1 className="h1s">{p.name}</h1>
          <Price p={p} />
          <p className="note">{DEMO_NOTE}</p>
          <p>{p.description}</p>
          <p className={"stock " + (out ? "out" : "")}>
            {p.stock} (demo status)
          </p>
          <div className="buy">
            <div className="qty big">
              <button
                aria-label="Decrease quantity"
                disabled={q <= 1}
                onClick={() => setQ(q - 1)}
              >
                <Minus size={16} />
              </button>
              <span aria-live="polite">{q}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQ(Math.min(99, q + 1))}
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              className="btn dark grow"
              disabled={out}
              onClick={() => add(p.id, q)}
            >
              {out ? "Out of stock" : "Add to cart"}
            </button>
            <button
              className="btn ghost sq"
              aria-pressed={liked}
              aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => toggleWish(p.id)}
            >
              <Heart size={18} fill={liked ? "currentColor" : "none"} />
            </button>
          </div>
          <Link to="/shop" className="back">
            <ArrowLeft size={16} /> Back to shop
          </Link>
        </div>
      </div>
      {rel.length > 0 && (
        <section className="sec">
          <h2>You may also like</h2>
          <ProductGrid items={rel} />
        </section>
      )}
    </div>
  );
}
