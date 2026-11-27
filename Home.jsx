import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Boxes,
  Briefcase,
  Sparkles,
  Truck,
  MessageCircle,
  Instagram,
} from "lucide-react";
import { Img, Reveal } from "../components/ui.jsx";
import { ProductGrid } from "../components/ProductCard.jsx";
import { categories, brands, products } from "../data.js";
import { INSTA, wa, DEMO_NOTE } from "../utils.js";
const up = (d) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: d, duration: 0.7, ease: "easeOut" },
});
const Head = ({ title, sub, cta }) => (
  <div className="head">
    <div>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
    {cta}
  </div>
);
function Hero() {
  return (
    <section className="hero">
      <div className="wrap herogrid">
        <div className="herotxt">
          <motion.p className="eyebrow" {...up(0)}>
            THE ART OF BEAUTY
          </motion.p>
          <motion.h1 {...up(0.12)}>
            Your Beauty. <em>Your Statement.</em>
          </motion.h1>
          <motion.p className="lead" {...up(0.24)}>
            Discover beauty essentials curated for every style, every mood, and
            every occasion.
          </motion.p>
          <motion.div className="ctas" {...up(0.36)}>
            <Link className="btn dark" to="/shop">
              Explore Collection
            </Link>
            <Link className="btn ghost" to="/about">
              Discover More
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="herovis"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1 }}
        >
          <Img
            eager
            src="/images/Home.jpg"
            alt="Collage of lipstick, foundation, blush and eyeshadow palettes"
            name="Om Beauty Care"
          />
        </motion.div>
      </div>
    </section>
  );
}
const feats = [
  [
    Boxes,
    "Wide product selection",
    "Makeup, skincare, haircare, tools and accessories in one place.",
  ],
  [
    Briefcase,
    "Wholesale enquiries",
    "Looking to buy in bulk? Talk to our team in Surat.",
  ],
  [
    Sparkles,
    "Beauty essentials",
    "Everyday cosmetics and beauty basics for every style.",
  ],
  [
    Truck,
    "Pan-India courier information",
    "Ask us about courier options for your location.",
  ],
];
export default function Home() {
  const [tab, setTab] = useState("new");
  const tabItems = products
    .filter((p) => (tab === "new" ? p.isNew : p.best))
    .slice(0, 4);
  return (
    <>
      <Hero />
      <section className="sec">
        <div className="wrap">
          <Reveal>
            <Head title="Shop by category" />
            <div className="cats">
              {categories.map((c) => (
                <Link
                  key={c.name}
                  className="cat"
                  to={`/shop?cat=${encodeURIComponent(c.name)}`}
                >
                  <Img src={c.image} alt={`${c.name} products`} name={c.name} />
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="sec tint">
        <div className="wrap">
          <Reveal>
            <Head
              title="Featured products"
              sub={DEMO_NOTE}
              cta={
                <Link className="btn ghost" to="/shop">
                  View all products
                </Link>
              }
            />
            <ProductGrid
              items={products.filter((p) => p.featured).slice(0, 8)}
            />
          </Reveal>
        </div>
      </section>
      <section className="sec" id="brands">
        <div className="wrap">
          <Reveal>
            <Head
              title="Featured brands"
              sub="Sample brand names for this demo. No brand partnership is implied."
            />
            <div className="brands">
              {brands.map((b) => (
                <Link key={b} to={`/shop?brand=${encodeURIComponent(b)}`}>
                  {b}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="sec tint">
        <div className="wrap">
          <Head title="Fresh picks" />
          <div className="tabs" role="tablist">
            {[
              ["new", "New arrivals"],
              ["best", "Best sellers"],
            ].map(([k, l]) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                className={tab === k ? "on" : ""}
                onClick={() => setTab(k)}
              >
                {l}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProductGrid items={tabItems} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <section className="promo">
        <div className="wrap promogrid">
          <div>
            <h2>Beauty Worth Discovering</h2>
            <p>
              Explore beauty essentials across makeup, skincare, haircare and
              tools, and find the pieces that suit your style.
            </p>
            <Link className="btn dark" to="/shop">
              Shop now
            </Link>
          </div>
          <div className="promoimg">
            <Img
              src="/images/Mackup.jpg"
              alt="Makeup essentials"
              name="Beauty Worth Discovering"
            />
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <Reveal>
            <Head title="Why shop with us" />
            <div className="feats">
              {feats.map(([I, t, d]) => (
                <div key={t} className="feat">
                  <I size={28} strokeWidth={1.2} />
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="sec tint">
        <div className="wrap about-prev">
          <div>
            <h2>A Surat beauty wholesaler</h2>
            <p>
              Om Beauty Care is a beauty products wholesaler and cosmetics
              retailer based in Surat, Gujarat. Visit us at Varachha Main Road
              or get in touch for product and wholesale enquiries.
            </p>
            <Link className="btn ghost" to="/about">
              Learn more
            </Link>
          </div>
          <div className="aboutimg">
            <Img
              src="/images/Shop.jpg"
              alt="Beauty products arranged on a counter"
              name="Om Beauty Care"
            />
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <Head
            title="Follow along on Instagram"
            sub="Image grid for illustration. These are not verified Instagram posts."
            cta={
              <a
                className="btn ghost"
                href={INSTA}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={16} /> @om_beauty_care
              </a>
            }
          />
          <div className="insta">
            {[
              ...categories.map((c) => c.image),
              "/images/hero-collage.jpg",
            ].map((s, i) => (
              <a
                key={i}
                href={INSTA}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Instagram profile"
              >
                <Img
                  src={s}
                  alt="Beauty product inspiration"
                  name="Instagram"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="cta">
        <div className="wrap">
          <h2>Looking for Beauty Products in Bulk?</h2>
          <p>Get in touch with our team for product and wholesale enquiries.</p>
          <a
            className="btn gold"
            href={wa(
              "Hello Om Beauty Care, I would like to enquire about beauty products in bulk.",
            )}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} /> WhatsApp enquiry
          </a>
        </div>
      </section>
    </>
  );
}
