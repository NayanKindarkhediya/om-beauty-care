// Sample demo data only. Brands are fictional; products/prices/stock are NOT the store's verified catalogue.
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
export const categories = [
  { name: "Makeup", image: "/images/category-makeup.jpg" },
  { name: "Skincare", image: "/images/category-skincare.jpg" },
  { name: "Haircare", image: "/images/category-haircare.jpg" },
  { name: "Beauty Tools", image: "/images/category-tools.jpg" },
  { name: "Beauty Accessories", image: "/images/category-accessories.jpg" },
];
export const brands = [
  "Lumière Atelier",
  "Rosé & Co",
  "Velour",
  "Aurum",
  "Maison Bloom",
  "Silk Ritual",
];
// [name, brandIndex, category, price, salePrice(0=none), flags(f=featured n=new b=best l=low o=out), description]
const rows = [
  [
    "Velvet Matte Lipstick",
    0,
    "Makeup",
    499,
    399,
    "fb",
    "A richly pigmented matte lipstick with a soft, comfortable finish.",
    ["/images/products/Velvet-Matte-Lipstick.jpg", "/images/products/Velvet-Matte-Lipstick-2.jpg"],
  ],
  [
    "Radiant Foundation",
    1,
    "Makeup",
    799,
    0,
    "fb",
    "Buildable medium coverage with a natural, luminous skin finish.",
    ["/images/products/Radiant-Foundation.jpg", "/images/products/Radiant-Foundation-2.jpg"],
  ],
  [
    "Soft Glow Blush",
    2,
    "Makeup",
    599,
    449,
    "fn",
    "A silky powder blush that blends into a soft, healthy flush.",
    ["/images/products/Soft-Glow-Blush.jpg", "/images/products/Soft-Glow-Blush-2.jpg"],
  ],
  [
    "Nude Eyeshadow Palette",
    3,
    "Makeup",
    1199,
    999,
    "fb",
    "Twelve wearable neutral shades in matte and shimmer finishes.",
    ["/images/products/Nude-Eyeshadow-Palette.jpg", "/images/products/Nude-Eyeshadow-Palette-2.jpg"],
  ],
  [
    "Lengthening Mascara",
    0,
    "Makeup",
    449,
    0,
    "nb",
    "Defines and lengthens lashes with a smudge-resistant formula.",
    ["/images/products/Lengthening-Mascara.jpg", "/images/products/Lengthening-Mascara-2.jpg"],
  ],
  [
    "Precision Brow Pencil",
    4,
    "Makeup",
    299,
    0,
    "n",
    "A fine-tip pencil for defined, natural-looking brows.",
    ["/images/products/Precision-Brow-Pencil.jpg", "/images/products/Precision-Brow-Pencil-2.jpg"],
  ],
  [
    "Full Coverage Concealer",
    1,
    "Makeup",
    549,
    449,
    "nl",
    "Creamy full-coverage concealer for spots and under-eyes.",
    ["/images/products/Full-Coverage-Concealer.jpg", "/images/products/Full-Coverage-Concealer-2.jpg"],
  ],
  [
    "Liquid Bronzer",
    2,
    "Makeup",
    699,
    0,
    "n",
    "A lightweight liquid bronzer for a sun-warmed glow.",
    ["/images/products/Liquid-Bronzer.jpg", "/images/products/Liquid-Bronzer-2.jpg"],
  ],
  [
    "Hydrating Face Serum",
    5,
    "Skincare",
    899,
    749,
    "fb",
    "A lightweight daily serum designed to leave skin feeling hydrated.",
    ["/images/products/Hydrating-Face-Serum.jpg", "/images/products/Hydrating-Face-Serum-2.jpg"],
  ],
  [
    "Gentle Face Cleanser",
    4,
    "Skincare",
    449,
    0,
    "n",
    "A mild everyday cleanser that removes make-up and impurities.",
    ["/images/products/Gentle-Face-Cleanser.jpg", "/images/products/Gentle-Face-Cleanser-2.jpg"],
  ],
  [
    "Nourishing Hair Serum",
    5,
    "Haircare",
    549,
    449,
    "n",
    "A smoothing serum that adds shine and tames frizz.",
    ["/images/products/Nourishing-Hair-Serum.jpg", "/images/products/Nourishing-Hair-Serum-2.jpg"],
  ],
  [
    "Professional Makeup Brush Set",
    3,
    "Beauty Tools",
    999,
    799,
    "fb",
    "A soft-bristle brush set covering face and eye application.",
    ["/images/products/Professional-Makeup-Brush-Set.jpg", "/images/products/Professional-Makeup-Brush-Set-2.jpg"],
  ],
  [
    "Beauty Blender Set",
    1,
    "Beauty Tools",
    399,
    0,
    "no",
    "Soft sponge applicators for seamless foundation blending.",
    ["/images/products/Beauty-Blender-Set.jpg", "/images/products/Beauty-Blender-Set-2.jpg"],
  ],
  [
    "Makeup Travel Bag",
    0,
    "Beauty Accessories",
    699,
    549,
    "n",
    "A compact, water-resistant organiser for beauty essentials on the go.",
    ["/images/products/Makeup-Travel-Bag.jpg", "/images/products/Makeup-Travel-Bag-2.jpg"],
  ],
  [
    "Professional Makeup Kit",
    3,
    "Beauty Accessories",
    2499,
    1999,
    "fb",
    "A complete multi-tier kit case for artists and beauty enthusiasts.",
    ["/images/products/Professional-Makeup-Kit.jpg", "/images/products/Professional-Makeup-Kit-2.jpg"],
  ],
  [
    "LED Ring Light",
    2,
    "Beauty Tools",
    1499,
    1199,
    "fb",
    "Adjustable LED ring light for even, flattering light when applying makeup.",
    ["/images/products/LED-Ring-Light.jpg", "/images/products/LED-Ring-Light-2.jpg"],
  ],
];
export const products = rows.map(
  ([name, b, category, price, sale, f, description, image], i) => {
    const s = slug(name);
    return {
      id: i + 1,
      slug: s,
      name,
      brand: brands[b],
      category,
      price,
      sale,
      description,
      images: Array.isArray(image)
        ? image
        : image
          ? [image, image]
          : [`/images/products/${s}.jpg`, `/images/products/${s}-2.jpg`],
      featured: f.includes("f"),
      isNew: f.includes("n"),
      best: f.includes("b"),
      stock: f.includes("o")
        ? "Out of stock"
        : f.includes("l")
          ? "Low stock"
          : "In stock",
    };
  },
);
