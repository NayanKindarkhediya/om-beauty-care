import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Instagram,
  Phone,
  MapPin,
  MessageCircle,
  ArrowUp,
} from "lucide-react";
import { useStore } from "../context/Store.jsx";
import { categories } from "../data.js";
import { PHONE, ADDRESS, INSTA, MAPS, wa } from "../utils.js";
export function AnnouncementBar() {
  const [shown, setShown] = useState(true);
  if (!shown) return null;
  return (
    <div className="announce">
      <span>Discover Your Beauty. Shop Your Favorites.</span>
      <button aria-label="Dismiss announcement" onClick={() => setShown(false)}>
        <X size={16} />
      </button>
    </div>
  );
}
const links = [
  ["/", "Home"],
  ["/shop", "Shop"],
  ["/#brands", "Brands"],
  ["/about", "About"],
  ["/contact", "Contact"],
];
export function Navbar() {
  const { count, wish, setOpen } = useStore();
  const [menu, setMenu] = useState(false);
  const [find, setFind] = useState(false);
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    setMenu(false);
  }, [pathname]);
  const go = (e) => {
    e.preventDefault();
    nav("/shop" + (q.trim() ? "?q=" + encodeURIComponent(q.trim()) : ""));
    setFind(false);
    setQ("");
  };
  return (
    <header className="nav">
      <div className="wrap navin">
        <button
          className="icon menubtn"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <Link to="/" className="logo" aria-label="Om Beauty Care home">
          OM<span>BEAUTY CARE</span>
        </Link>
        <nav className="links" aria-label="Main">
          {links.map(([to, l]) => (
            <Link key={l} to={to}>
              {l}
            </Link>
          ))}
        </nav>
        <div className="icons">
          <button
            className="icon"
            aria-label="Search products"
            aria-expanded={find}
            onClick={() => setFind(!find)}
          >
            <Search size={20} />
          </button>
          <Link
            className="icon"
            to="/wishlist"
            aria-label={`Wishlist, ${wish.length} items`}
          >
            <Heart size={20} />
            {wish.length > 0 && <i className="badge">{wish.length}</i>}
          </Link>
          <button
            className="icon"
            aria-label={`Open shopping bag, ${count} items`}
            onClick={() => setOpen(true)}
          >
            <ShoppingBag size={20} />
            {count > 0 && <i className="badge">{count}</i>}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {find && (
          <motion.form
            key="s"
            className="wrap searchbar"
            onSubmit={go}
            role="search"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <input
              autoFocus
              aria-label="Search products"
              placeholder="Search lipstick, serum, brushes…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="btn dark">Search</button>
          </motion.form>
        )}
        {menu && (
          <motion.nav
            key="m"
            className="mobile"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {links.map(([to, l]) => (
              <Link key={l} to={to}>
                {l}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap fgrid">
        <div>
          <Link to="/" className="logo light">
            OM<span>BEAUTY CARE</span>
          </Link>
          <p>
            Beauty products wholesaler and cosmetics retailer based in Surat,
            Gujarat.
          </p>
          <a href={INSTA} target="_blank" rel="noreferrer">
            <Instagram size={16} /> @om_beauty_care
          </a>
        </div>
        <div>
          <h4>Quick links</h4>
          {links.map(([to, l]) => (
            <Link key={l} to={to}>
              {l}
            </Link>
          ))}
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div>
          <h4>Shop</h4>
          {categories.map((c) => (
            <Link key={c.name} to={`/shop?cat=${encodeURIComponent(c.name)}`}>
              {c.name}
            </Link>
          ))}
        </div>
        <div>
          <h4>Visit &amp; call</h4>
          <a href={`tel:${PHONE.replace(/\s/g, "")}`}>
            <Phone size={16} /> {PHONE}
          </a>
          <a href={MAPS} target="_blank" rel="noreferrer">
            <MapPin size={16} /> {ADDRESS}
          </a>
        </div>
      </div>
      <div className="wrap fbase">
        <span>
          © {new Date().getFullYear()} Om Beauty Care. Demo storefront; not a
          live shop.
        </span>
        <button
          className="btn ghost light"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={16} /> Back to top
        </button>
      </div>
    </footer>
  );
}
export const WhatsAppButton = () => (
  <a
    className="wafab"
    href={wa("Hello Om Beauty Care, I would like to make an enquiry.")}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle />
  </a>
);
