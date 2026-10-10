# 🌸 Bloomieee.co — Premium Everlasting Floral Boutique

> **"Flowers That Stay, Memories That Bloom."**
> A handcrafted pipe-cleaner flower and everlasting bouquet e-commerce website built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS.

---

## ✨ Features & Architecture

### 1. Brand Identity & Design System
- **Curated Boutique Color Palette**:
  - Warm Ivory (`#FFF9F1`) & Soft Cream (`#F5EBDD`)
  - Sage Green (`#858B68`) & Deep Olive (`#50583B`)
  - Blush Pink (`#F2D9DF`) & Lavender (`#DCD2EE`)
  - Warm Brown (`#8C6C53`) & Main Charcoal Text (`#34342D`)
- **Editorial Typography**: Cormorant Garamond / Playfair Display serif paired with Plus Jakarta Sans.
- **Genuine Brand Assets**: Real circular floral logo and 8 genuine pipe-cleaner products cropped from the brand's Instagram grid (@bloomieee.co).

### 2. Storefront Pages & Features
- **Homepage (`/`)**:
  - Slim editable announcement bar
  - Editorial navigation header with live cart count and wishlist counter
  - Hero section featuring genuine handmade pipe-cleaner flower bouquet
  - Curated category cards (Tulips, Roses, Lilies, Mini Keepsakes, Custom Bouquets)
  - Bestsellers showcase grid with quick add and wishlist toggle
  - Brand story section (*"Not Just Flowers. Little Pieces of Forever."*)
  - Gift by Occasion (Birthdays, Anniversaries, Just Because, Friendship, Special Surprises)
  - Interactive Custom Bouquet Builder section (*"Dream It. We'll Bloom It."*)
  - Instagram-inspired feed gallery with clickable posts linking to @bloomieee.co
  - Customer review cards with verified purchase badges
  - *Letters & Little Blooms* newsletter signup with validation
- **Shop & Catalog (`/shop`)**:
  - Responsive product grid with real-time category, flower type, color palette, and price range filters
  - Live search and sorting (Featured, Price Low-to-High, Price High-to-Low, Highest Rated, Newest)
  - In-stock availability filter and saved Wishlist filter
- **Product Detail Page (`/product/[slug]`)**:
  - Image gallery with zoom and multiple angle thumbnails
  - Dynamic flower color and wrapping style variant pickers
  - Complimentary handwritten note card input field
  - Real-time stock status indicator and handmade dispatch timeline
  - Tabbed information: Product Description, Pipe-Cleaner Care Guide, Gift Packaging, and Shipping
  - "Add to Flower Bag" and instant "Buy It Now" actions
- **Shopping Bag & Slide-out Cart Drawer (`/cart`)**:
  - Free shipping progress bar (Free shipping across India on orders above ₹999)
  - Real-time quantity adjustment and item removal
  - Coupon code engine (`BLOOM10` for 10% off, `FIRSTBLOOM` for ₹150 off)
  - Persistent cart stored across browser sessions
- **Checkout (`/checkout`)**:
  - Comprehensive customer contact & delivery address validation (with Indian states & 6-digit PIN code)
  - Handwritten gift message card and order delivery notes
  - Multi-payment options: Razorpay online payments (UPI / Cards / Wallets) & Cash on Delivery (COD)
- **Order Confirmation & Tracking (`/order-confirmation/[orderId]` & `/track`)**:
  - Celebratory receipt breakdown with printable invoice option
  - Real-time multi-step order tracker: *Order Received → Crafting in Studio → Dispatched → Delivered*
- **Studio Policies & Info**:
  - `/about` — The story behind pipe cleaner flowers and everlasting floral art
  - `/contact` — Studio address, email, and direct WhatsApp contact
  - `/faq` — Detailed answers on flower care, materials, dispatch timelines, and custom orders
  - `/policies/shipping`, `/policies/returns`, `/policies/privacy`, `/policies/terms`

### 3. Protected Studio Admin Portal (`/admin`)
- **Login (`/admin/login`)**:
  - Protected with Studio Access PIN: **`bloom2026`**
- **Dashboard Features**:
  - **Metrics & Overview**: Paid revenue, orders count, custom inquiries, and subscriber count
  - **Product Manager**: Add new bouquets, live inline stock updates, and archive/delete
  - **Order Fulfillment**: Update order status (*Pending*, *Crafting*, *Shipped*, *Delivered*) and assign courier tracking numbers
  - **Custom Bouquet Requests**: Review customer flower requests, color preferences, budget, and one-click WhatsApp chat link
  - **Audience**: View newsletter subscriber list
  - **Storefront Configuration**: Edit announcement banner text, shipping charges, free shipping threshold, and WhatsApp number

---

## 🚀 How to Run the Website

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit **[http://localhost:3000](http://localhost:3000)** in your web browser.

---

## 🔐 Admin Credentials

- **Admin Login URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Studio PIN**: `bloom2026`

---

## 🗄️ Database & Persistence

All products, orders, custom bouquet requests, newsletter subscriptions, and settings are persisted in `data/bloomieee.json` using atomic file writes. Any order placed or setting modified from the admin dashboard persists seamlessly across server restarts without requiring external database setup.
