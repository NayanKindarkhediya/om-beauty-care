import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { ProductGrid } from "../components/ProductCard.jsx";
import { products, categories, brands } from "../data.js";
import { eff, DEMO_NOTE } from "../utils.js";
const STEP = 9;
export default function Shop() {
  const [sp, setSp] = useSearchParams();
  const [n, setN] = useState(STEP);
  const [fo, setFo] = useState(false);
  const g = (k) => sp.get(k) || "";
  const set = (k, v) => {
    const s = new URLSearchParams(sp);
    v ? s.set(k, v) : s.delete(k);
    setSp(s, { replace: true });
    setN(STEP);
  };
  const list = useMemo(() => {
    const q = (sp.get("q") || "").toLowerCase(),
      cat = sp.get("cat"),
      br = sp.get("brand"),
      min = +sp.get("min") || 0,
      max = +sp.get("max") || Infinity,
      s = sp.get("sort");
    let l = products.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!br || p.brand === br) &&
        (!q ||
          `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q)) &&
        eff(p) >= min &&
        eff(p) <= max,
    );
    if (s === "low") l = [...l].sort((a, b) => eff(a) - eff(b));
    if (s === "high") l = [...l].sort((a, b) => eff(b) - eff(a));
    return l;
  }, [sp]);
  const active = [...sp.keys()].some((k) => k !== "sort");
  return (
    <div className="wrap page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <span>Shop</span>
      </nav>
      <div className="head">
        <div>
          <h1 className="h1s">Shop</h1>
          <p>
            {list.length} product{list.length === 1 ? "" : "s"}. {DEMO_NOTE}
          </p>
        </div>
        <button
          className="btn ghost filterbtn"
          aria-expanded={fo}
          onClick={() => setFo(!fo)}
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>
      <div className="shop">
        <aside className={"filters" + (fo ? " open" : "")} aria-label="Filters">
          <label>
            Search
            <input
              type="search"
              value={g("q")}
              onChange={(e) => set("q", e.target.value)}
              placeholder="Search products"
            />
          </label>
          <label>
            Category
            <select
              value={g("cat")}
              onChange={(e) => set("cat", e.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
          </label>
          <label>
            Brand
            <select
              value={g("brand")}
              onChange={(e) => set("brand", e.target.value)}
            >
              <option value="">All brands</option>
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <div className="pr">
            <label>
              Min ₹
              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={g("min")}
                onChange={(e) => set("min", e.target.value)}
              />
            </label>
            <label>
              Max ₹
              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={g("max")}
                onChange={(e) => set("max", e.target.value)}
              />
            </label>
          </div>
          <label>
            Sort by
            <select
              value={g("sort")}
              onChange={(e) => set("sort", e.target.value)}
            >
              <option value="">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
          <button
            className="btn ghost"
            disabled={!active && !g("sort")}
            onClick={() => {
              setSp({});
              setN(STEP);
            }}
          >
            Clear all filters
          </button>
        </aside>
        <section>
          {list.length === 0 ? (
            <div className="empty">
              <h2>No products found</h2>
              <p>Try a different search or remove some filters.</p>
              <button className="btn dark" onClick={() => setSp({})}>
                Reset filters
              </button>
            </div>
          ) : (
            <>
              <ProductGrid items={list.slice(0, n)} />
              {n < list.length && (
                <div className="more">
                  <button className="btn ghost" onClick={() => setN(n + STEP)}>
                    Load more ({list.length - n} left)
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
