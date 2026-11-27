<div align="center">
# Om Beauty Care
 
**A luxury beauty storefront for a wholesaler in Surat, Gujarat.**
 
[**Live Demo**](https://om-beauty-care.netlify.app/)
 
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?logo=framer&logoColor=white)
 
</div>
---
 
## About
 
Om Beauty Care is a frontend-only e-commerce demo for a beauty products wholesaler based in **Surat, Gujarat, India**. It has an elegant blush and serif design, a full shopping flow (browse, filter, wishlist, cart) and WhatsApp enquiry buttons for wholesale leads.
 
> **Note:** This is a demo storefront. There is no backend, database, login or payment. Products, prices, stock and the 6 brand names are sample data, not the store's verified catalogue.
 
## Features
 
**Home**
- Announcement bar, sticky navbar with mobile menu and search
- Hero section, category cards (click to pre-filter the shop)
- Featured products, New and Best-seller tabs, brand tiles
- Promo banner, "Why us" section, about preview, Instagram-style grid
- WhatsApp enquiry call to action
**Shop**
- Search, category filter, brand filter, price range and sort (low to high, high to low)
- URL-synced filters (shareable links), clear-all button, empty state and Load more
**Product page**
- Image gallery, quantity selector, wishlist, related products
- Product pages by slug (`/product/:slug`) with a proper not-found page
**Cart and Wishlist**
- Slide-in cart drawer with quantity controls, remove and subtotal
- Closes with Esc or backdrop click, and locks page scroll while open
- Cart and wishlist are saved in `localStorage`, so they survive a refresh
- Demo checkout page (no real order or payment)
**Other**
- About and Contact pages (Contact form has validation and a demo-only response)
- Floating WhatsApp button
- Fully responsive and respects `prefers-reduced-motion`
## Tech Stack
 
| Tool | Use |
| --- | --- |
| React 18 | UI components |
| Vite 5 | Dev server and build tool |
| React Router 6 | Page routing |
| Framer Motion 11 | Animations |
| Lucide React | Icons |
| Plain CSS | Custom styling (no UI library) |
| Google Fonts | Cormorant Garamond and Jost |
 
## Project Structure
 
```
om-beauty-care/
├── public/
│   └── images/
│       ├── products/        # <product-slug>.jpg and <product-slug>-2.jpg
│       ├── category-*.jpg   # Category card images
│       └── hero-collage.jpg
├── src/
│   ├── components/          # Layout, CartDrawer, ProductCard, ui
│   ├── context/Store.jsx    # Cart + wishlist state (localStorage)
│   ├── pages/               # Home, Shop, ProductDetails, Wishlist, Info
│   ├── data.js              # Categories, brands and 16 sample products
│   ├── utils.js             # Phone, address, WhatsApp link, price helpers
│   ├── styles.css
│   ├── App.jsx              # Routes
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```
 
## Getting Started
 
**Requirements:** [Node.js](https://nodejs.org) (LTS version)
 
```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/om-beauty-care.git
cd om-beauty-care
 
# 2. Install dependencies
npm install
 
# 3. Start the dev server
npm run dev
```
 
Open the link shown in the terminal (usually `http://localhost:5173`).
 
## Scripts
 
| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Previews the production build locally |
 
## Customization
 
**Contact details** are in `src/utils.js`:
 
```js
export const PHONE = "+91 XXXXX XXXXX";
export const ADDRESS = "Your address here";
export const INSTA = "https://instagram.com/...";
export const wa = (t) => "https://wa.me/91XXXXXXXXXX?text=" + encodeURIComponent(t);
```
 
**Products, brands and categories** are in `src/data.js`. Each product row holds the name, brand, category, price, sale price, flags (featured, new, best seller, low stock, out of stock), description and two image paths.
 
**Images:** put your photos in `public/images/` and `public/images/products/`. Use licensed or owned photos only. A 4:5 portrait ratio works best for products and the hero.
 
## Deployment
 
```bash
npm run build
```
 
Upload the `dist/` folder to **Netlify** or **Vercel**, or connect this repo for automatic deploys.
 
| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
 
Because the app uses React Router, add a `public/_redirects` file for Netlify so direct links like `/shop` do not show a 404:
 
```
/*    /index.html   200
```
 
## Manual Test Checklist
 
- [ ] Home loads with no console errors and nav links work
- [ ] Category card opens Shop with that category selected
- [ ] Search, price range, sort, clear filters, empty state and Load more work
- [ ] Product page: quantity, add to cart, and `/product/nope` shows not-found
- [ ] Cart: plus/minus (not below 1), remove, subtotal, Esc and backdrop close
- [ ] Refresh keeps cart and wishlist
- [ ] Contact form shows errors on empty submit and a demo notice on valid submit
- [ ] No horizontal scroll at 320px width
## Credits
 
Designed and developed by **Nayan** at [Autocraft Web](https://instagram.com/Autocraft.web), Surat.
 
<div align="center">
If you like this project, give it a star.
 
</div>
 
