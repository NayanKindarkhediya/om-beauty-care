# Om Beauty Care: luxury storefront demo

Frontend-only demo (React + Vite, custom CSS, Framer Motion, React Router, Lucide). No backend, database, auth or payments.

## Run

```
npm install
npm run dev
```

Production build: `npm run build` (preview with `npm run preview`).

## Images (asset guide)

No photography is bundled. Every image has an elegant blush placeholder fallback until you add files to `public/images/`:

- `hero-collage.jpg`, `about-1.jpg`, `about-2.jpg`
- `category-makeup.jpg`, `category-skincare.jpg`, `category-haircare.jpg`, `category-tools.jpg`, `category-accessories.jpg`
- `products/<product-slug>.jpg` and `products/<product-slug>-2.jpg` (slugs are listed in `src/data.js`, e.g. `velvet-matte-lipstick.jpg`)

Use licensed or owned photos only. Suggested: 4:5 portrait for products, 4:5 for the hero.

## Data

`src/data.js` holds 16 sample products and 6 fictional brand names. Prices, stock and brands are illustrative, not the store's verified catalogue. The UI says so.

## Implemented

Announcement bar, sticky navbar + mobile menu, search, hero, category cards that pre-filter Shop, featured products, brand filter links, new/best tabs, promo, why-us, about preview, Instagram-style grid (labelled as illustration), WhatsApp CTA, footer; Shop (search, category, brand, price range, sort, clear, empty state, Load more, URL-synced filters); product pages by slug with gallery, quantity, wishlist, related items, 404; wishlist page; cart drawer (Esc/backdrop close, scroll lock, quantity controls, subtotal, empty state); demo checkout (no order, no payment); About; Contact with validation and demo-only response; 404; cart + wishlist persisted in localStorage; reduced-motion respected.

## Manual test checklist

- [ ] Home loads with no console errors; nav links work (Brands scrolls to brands)
- [ ] Category card → Shop with that category selected; brand tile → Shop filtered by brand
- [ ] Search, price range, sort, Clear all, empty state, Load more
- [ ] Open a product, change quantity, add to cart; open `/product/nope` → not-found page
- [ ] Cart: +/− (can't go below 1), remove, subtotal, Esc and backdrop close, page doesn't scroll behind
- [ ] Refresh: cart and wishlist remain
- [ ] Contact: empty submit shows errors; valid submit shows the demo-only notice
- [ ] WhatsApp and Maps links open; no horizontal scroll at 320px
