import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Instagram, MessageCircle } from "lucide-react";
import { Img } from "../components/ui.jsx";
import { useStore } from "../context/Store.jsx";
import {
  inr,
  eff,
  PHONE,
  ADDRESS,
  INSTA,
  MAPS,
  wa,
  DEMO_NOTE,
} from "../utils.js";
export function About() {
  return (
    <div className="wrap page">
      <h1 className="h1s">About Om Beauty Care</h1>
      <div className="two">
        <div className="prose">
          <p>
            Om Beauty Care is a beauty products wholesaler and cosmetics
            retailer based in Surat, Gujarat.
          </p>
          <p>
            Our focus is beauty and cosmetics: makeup, skincare, haircare,
            beauty tools and accessories.
          </p>
          <p>
            Buying for a salon, a shop or your own collection? Call, message us
            on WhatsApp or send an enquiry for product and wholesale details.
          </p>
          <p>
            <MapPin size={16} /> {ADDRESS}
          </p>
          <Link className="btn dark" to="/contact">
            Contact us
          </Link>
        </div>
        <div className="stack">
          <div className="aboutimg">
            <Img
              src="/images/about-1.jpg"
              alt="Beauty products on display"
              name="Om Beauty Care"
            />
          </div>
          <div className="aboutimg">
            <Img
              src="/images/about-2.jpg"
              alt="Makeup brushes and palettes"
              name="Beauty essentials"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const empty = {
  name: "",
  email: "",
  phone: "",
  company: "",
  type: "Product enquiry",
  message: "",
};
export function Contact() {
  const [f, setF] = useState(empty);
  const [err, setErr] = useState({});
  const [done, setDone] = useState(false);
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email))
      x.email = "Enter a valid email address.";
    if (f.phone.replace(/\D/g, "").length < 10)
      x.phone = "Enter a phone number with at least 10 digits.";
    if (f.message.trim().length < 10)
      x.message = "Write at least 10 characters.";
    setErr(x);
    setDone(Object.keys(x).length === 0);
  };
  const F = (k, label, type = "text", req) => (
    <label key={k}>
      {label}
      {req && " *"}
      <input
        type={type}
        value={f[k]}
        onChange={on(k)}
        aria-invalid={!!err[k]}
        aria-describedby={err[k] ? k + "-e" : undefined}
      />
      {err[k] && (
        <em id={k + "-e"} className="err">
          {err[k]}
        </em>
      )}
    </label>
  );
  return (
    <div className="wrap page">
      <h1 className="h1s">Contact</h1>
      <div className="two">
        <div className="prose">
          <h2>Om Beauty Care</h2>
          <p>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`}>
              <Phone size={16} /> {PHONE}
            </a>
          </p>
          <p>
            <MapPin size={16} /> {ADDRESS}
          </p>
          <p>
            <a href={INSTA} target="_blank" rel="noreferrer">
              <Instagram size={16} /> @om_beauty_care
            </a>
          </p>
          <div className="ctas">
            <a
              className="btn dark"
              href={wa(
                "Hello Om Beauty Care, I would like to make an enquiry.",
              )}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={16} /> WhatsApp enquiry
            </a>
            <a
              className="btn ghost"
              href={MAPS}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={16} /> Open in Google Maps
            </a>
          </div>
        </div>
        <form onSubmit={submit} noValidate className="form">
          {F("name", "Full name", "text", true)}
          {F("email", "Email", "email", true)}
          {F("phone", "Phone", "tel", true)}
          {F("company", "Company or business name")}
          <label>
            Enquiry type
            <select value={f.type} onChange={on("type")}>
              <option>Product enquiry</option>
              <option>Wholesale enquiry</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Message *
            <textarea
              rows="4"
              value={f.message}
              onChange={on("message")}
              aria-invalid={!!err.message}
            />
            {err.message && <em className="err">{err.message}</em>}
          </label>
          <button className="btn dark">Send enquiry</button>
          {done && (
            <p className="demo" role="status">
              <b>Demo only:</b> this form has no backend, so nothing was sent or
              saved. To reach us, use WhatsApp or call {PHONE}.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
export function DemoCheckout() {
  const { lines, subtotal } = useStore();
  const msg =
    "Hello Om Beauty Care, I would like to enquire about:\n" +
    lines.map((l) => `- ${l.p.name} x ${l.qty}`).join("\n");
  return (
    <div className="wrap page narrow">
      <h1 className="h1s">Demo checkout</h1>
      <p className="demo">
        <b>This is a demo.</b> Real ordering and payment are not connected. No
        order is placed and no payment is taken. {DEMO_NOTE}
      </p>
      {lines.length === 0 ? (
        <div className="empty">
          <p>Your bag is empty.</p>
          <Link className="btn dark" to="/shop">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className="sumlist">
            {lines.map(({ p, qty }) => (
              <li key={p.id}>
                <span>
                  {p.name} × {qty}
                </span>
                <b>{inr(eff(p) * qty)}</b>
              </li>
            ))}
          </ul>
          <p className="sub">
            <span>Subtotal</span>
            <b>{inr(subtotal)}</b>
          </p>
          <div className="ctas">
            <a
              className="btn dark"
              href={wa(msg)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={16} /> Enquire on WhatsApp
            </a>
            <Link className="btn ghost" to="/shop">
              Continue shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
export function NotFound({ product }) {
  return (
    <div className="wrap page nf">
      <p className="big404">404</p>
      <h1 className="h1s">
        {product ? "We couldn’t find that product" : "This page doesn’t exist"}
      </h1>
      <p>
        The link may be old or mistyped. Head back to the shop or the home page.
      </p>
      <div className="ctas">
        <Link className="btn dark" to="/">
          Return home
        </Link>
        <Link className="btn ghost" to="/shop">
          Back to shop
        </Link>
      </div>
    </div>
  );
}
