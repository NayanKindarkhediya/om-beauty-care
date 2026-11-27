import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "../data.js";
import { eff } from "../utils.js";
const Ctx = createContext(null);
const load = (k) => {
  try {
    const v = JSON.parse(localStorage.getItem(k));
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};
const save = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* storage unavailable */
  }
};
export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load("obc-cart"));
  const [wish, setWish] = useState(() => load("obc-wish"));
  const [open, setOpen] = useState(false);
  useEffect(() => save("obc-cart", cart), [cart]);
  useEffect(() => save("obc-wish", wish), [wish]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const k = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", k);
    };
  }, [open]);
  const v = useMemo(() => {
    const lines = cart
      .map((i) => ({ ...i, p: products.find((x) => x.id === i.id) }))
      .filter((l) => l.p);
    return {
      cart,
      wish,
      open,
      setOpen,
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + eff(l.p) * l.qty, 0),
      add: (id, qty = 1) => {
        setCart((c) =>
          c.some((i) => i.id === id)
            ? c.map((i) =>
                i.id === id ? { ...i, qty: Math.min(99, i.qty + qty) } : i,
              )
            : [...c, { id, qty: Math.max(1, qty) }],
        );
        setOpen(true);
      },
      setQty: (id, q) =>
        setCart((c) =>
          c.map((i) =>
            i.id === id ? { ...i, qty: Math.min(99, Math.max(1, q)) } : i,
          ),
        ),
      remove: (id) => setCart((c) => c.filter((i) => i.id !== id)),
      toggleWish: (id) =>
        setWish((w) =>
          w.includes(id) ? w.filter((x) => x !== id) : [...w, id],
        ),
    };
  }, [cart, wish, open]);
  return <Ctx.Provider value={v}>{children}</Ctx.Provider>;
}
export const useStore = () => useContext(Ctx);
