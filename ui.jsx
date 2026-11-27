import { useState } from "react";
import { motion } from "framer-motion";
export function Img({ src, alt, name, className = "", eager = false }) {
  const [bad, setBad] = useState(false);
  if (!src || bad)
    return (
      <div className={"ph " + className} role="img" aria-label={alt}>
        <span>{name || alt}</span>
      </div>
    );
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setBad(true)}
    />
  );
}
export const Reveal = ({ children, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);
