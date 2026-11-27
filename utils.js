export const inr = (n) => "₹" + n.toLocaleString("en-IN");
export const eff = (p) => p.sale || p.price;
export const PHONE = "+91 00000 00000";
export const ADDRESS =
  "Surat, Gujarat , India";
export const INSTA = "#";
export const MAPS =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(ADDRESS);
export const wa = (t) =>
  "https://wa.me/910000000000?text=" + encodeURIComponent(t);
export const DEMO_NOTE =
  "Demo prices are illustrative sample values, not verified store prices.";
