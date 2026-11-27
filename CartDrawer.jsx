import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Img } from "./ui.jsx";
import { useStore } from "../context/Store.jsx";
import { inr, eff } from "../utils.js";
export default function CartDrawer() {
  const { open, setOpen, lines, count, subtotal, setQty, remove } = useStore();
  const nav = useNavigate();
  const closeRef = useRef(null);
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);
  const close = () => setOpen(false);
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
          >
            <header>
              <h2>Your bag ({count})</h2>
              <button
                ref={closeRef}
                className="icon"
                aria-label="Close shopping bag"
                onClick={close}
              >
                <X />
              </button>
            </header>
            {lines.length === 0 ? (
              <div className="empty">
                <p>Your bag is empty.</p>
                <Link to="/shop" className="btn dark" onClick={close}>
                  Continue shopping
                </Link>
              </div>
            ) : (
              <>
                <ul className="lines">
                  {lines.map(({ p, qty }) => (
                    <li key={p.id}>
                      <Img src={p.images[0]} alt={p.name} name={p.name} />
                      <div>
                        <Link to={`/product/${p.slug}`} onClick={close}>
                          {p.name}
                        </Link>
                        <small>{p.brand}</small>
                        <b>{inr(eff(p))}</b>
                        <div className="qty">
                          <button
                            aria-label={`Decrease quantity of ${p.name}`}
                            disabled={qty <= 1}
                            onClick={() => setQty(p.id, qty - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span aria-live="polite">{qty}</span>
                          <button
                            aria-label={`Increase quantity of ${p.name}`}
                            onClick={() => setQty(p.id, qty + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <button
                        className="icon"
                        aria-label={`Remove ${p.name}`}
                        onClick={() => remove(p.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
                <footer>
                  <p className="sub">
                    <span>Subtotal</span>
                    <b>{inr(subtotal)}</b>
                  </p>
                  <small>
                    Demo prices. Shipping and taxes are not calculated.
                  </small>
                  <button
                    className="btn dark"
                    onClick={() => {
                      close();
                      nav("/checkout");
                    }}
                  >
                    Checkout (demo)
                  </button>
                  <button className="btn ghost" onClick={close}>
                    Continue shopping
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
