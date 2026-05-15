# PH Online Auction - Technical Specification

## Project Overview

- **Project Name:** PH Online Auction
- **Type:** Full-stack auction marketplace web application
- **Core Functionality:** A Philippine-focused online auction platform where users can list items for auction, place bids in real-time, and complete transactions via integrated payment methods
- **Target Users:** Filipino buyers and sellers, from casual resellers to verified merchants

---

## UI/UX Specification

### Design System

#### Color Palette

```css
--color-primary: #0D9488;        /* Teal - main brand color */
--color-primary-dark: #0F766E;  /* Darker teal for hover states */
--color-primary-light: #14B8A6; /* Lighter teal for accents */
--color-secondary: #F97316;     /* Orange - accent for CTAs, bids */
--color-secondary-dark: #EA580C;
--color-accent: #8B5CF6;        /* Purple - premium/featured items */
--color-success: #22C55E;       /* Green - success states */
--color-warning: #EAB308;       /* Yellow - warnings */
--color-error: #EF4444;         /* Red - errors, outbid alerts */
--color-bg-primary: #FAFAFA;    /* Main background */
--color-bg-secondary: #F5F5F5;  /* Card backgrounds */
--color-bg-dark: #1E293B;       /* Dark sections */
--color-text-primary: #1E293B; /* Main text */
--color-text-secondary: #64748B; /* Secondary text */
--color-text-muted: #94A3B8;    /* Muted text */
--color-border: #E2E8F0;        /* Borders */
--color-card: #FFFFFF;          /* Card backgrounds */
```

#### Typography

- **Primary Font:** "Plus Jakarta Sans" (headings, UI elements)
- **Secondary Font:** "Inter" (body text)
- **Display Font:** "Space Grotesk" (numbers, prices, timers)

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

#### Spacing System

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;    /* 64px */
```

#### Border Radius

```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;
```

#### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-glow: 0 0 20px rgba(13, 148, 136, 0.3);
```

### Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** 1024px - 1280px
- **Large Desktop:** > 1280px

### Layout Structure

#### Header/Navigation
- Fixed top navigation bar
- Logo on left
- Search bar (expandable on mobile)
- Navigation links (hidden on mobile, hamburger menu)
- User menu (avatar dropdown)
- Mobile: bottom navigation bar with 5 main icons

#### Main Content Area
- Max-width: 1280px centered
- Padding: 16px mobile, 24px tablet, 32px desktop
- Grid system: 12-column grid

#### Footer
- Dark background (#1E293B)
- 4-column layout on desktop, stacked on mobile
- Social links, legal links, newsletter signup

### Pages & Components

#### 1. Landing Page
- **Hero Section:**
  - Full-width gradient background with animated shapes
  - Large search bar with category dropdown
  - Featured auctions carousel (auto-scroll, 5 items visible)
  - Countdown timers on featured items
  - Category quick links (8 main categories)
  - Trust badges row

- **Features Section:**
  - 6 feature cards in 3x2 grid (2x3 on tablet, 1x6 on mobile)
  - Icons with gradient backgrounds
  - Short description for each

- **Trending Auctions:**
  - Horizontal scroll with drag
  - Product cards with hover effects

- **Categories Section:**
  - Grid of category cards with icons
  - Item count badge

- **How It Works:**
  - 4-step horizontal timeline
  - Animated on scroll into view

- **CTA Section:**
  - "Start Selling" and "Start Bidding" buttons

#### 2. Authentication Pages
- Clean centered card design
- Social login buttons (Google, Facebook)
- Form validation with inline errors
- Password strength indicator
- Terms & conditions checkbox

#### 3. Auction Listing Page
- Image gallery with thumbnails (left) and main image
- Zoom on hover
- Bid panel (right):
  - Current price (large)
  - Countdown timer
  - Bid input with quick bid buttons (+10%, +20%, +50%)
  - "Place Bid" CTA button
  - "Buy Now" option
  - Watch button
- Seller info card
- Tabs: Description, Shipping, Reviews, Questions
- Similar items carousel

#### 4. Dashboard
- Sidebar navigation (collapsible on mobile)
- Stats cards at top
- Tabbed content areas
- Data tables with sorting/filtering
- Charts for analytics (admin)

#### 5. Create/Edit Auction Form
- Multi-step wizard (4 steps)
- Progress indicator
- Image upload with drag-drop
- Rich text editor for description
- Category/subcategory selectors
- Pricing inputs with calculator
- Preview before publish

### Animation Specifications

- **Page transitions:** Fade in with slight upward movement (300ms ease-out)
- **Card hover:** Scale 1.02, shadow increase (200ms)
- **Button hover:** Background darken, slight lift (150ms)
- **Loading skeletons:** Shimmer animation (1.5s infinite)
- **Countdown:** Flip animation for digit changes
- **Notifications:** Slide in from right (300ms spring)
- **Modal:** Fade + scale from 0.95 (200ms)
- **Carousel:** Smooth slide with momentum

### Component States

- **Buttons:** Default, Hover, Active, Disabled, Loading
- **Inputs:** Default, Focus, Error, Success
- **Cards:** Default, Hover, Selected
- **Auctions:** Active, Ending Soon (< 1 hour), Ended

---

## Functionality Specification

### Core Features

#### Authentication
- Email/password signup with verification
- Google OAuth
- Facebook OAuth
- Password reset flow
- Session management with refresh tokens
- Role-based access (buyer, seller, admin)

#### Auction Management
- Create auction with images, video, metadata
- Set starting price, reserve price, buy-now price
- Configure duration (1-30 days)
- Draft/Publish workflow
- Edit live auctions
- Pause/Resume auctions
- End early or extend
- Relist ended auctions

#### Bidding System
- Real-time bid updates via Supabase Realtime
- Minimum bid increment calculation
- Proxy bidding (auto-bid to max)
- Anti-sniping: extend by 5 minutes if bid in last 5 minutes
- Bid confirmation modal
- Outbid notifications
- Bid history with timestamps

#### Search & Filtering
- Full-text search across titles, descriptions
- Filter by category, price range, condition, location
- Sort by: ending soon, newly listed, price low/high, most bids
- Save search preferences

#### Watchlist
- Add/remove auctions
- Price change alerts
- Ending soon notifications
- Bulk actions

#### Messaging
- Real-time chat between buyer/seller
- Image attachments
- Offer/counter-offer system
- Read receipts
- Typing indicators
- Block/Report user

#### Notifications
- In-app notification center
- Real-time updates
- Notification preferences (email, push)
- Categories: bids, messages, orders, system

#### Payment Integration
- GCash (simulated)
- Maya (simulated)
- Bank transfer (manual verification)
- Credit/Debit card via PayMongo (simulated)
- Escrow system for buyer protection
- Transaction history

#### Shipping & Orders
- Multiple shipping options
- Tracking number input
- Delivery status updates
- Confirm received
- Dispute resolution

#### Reviews & Ratings
- 5-star rating system
- Text reviews
- Photo uploads
- Seller response capability

#### Admin Panel
- User management (view, ban, verify)
- Listing moderation
- Report handling
- Analytics dashboard
- System settings

### Data Handling

#### Supabase Tables Structure
```sql
-- Users extended with profile
profiles: id, username, full_name, avatar_url, phone, address, role, verified, created_at

-- Seller verification
seller_verification: user_id, id_type, id_number, status, verified_at

-- Auction categories
categories: id, name, slug, icon, parent_id, created_at

-- Main auction listing
auctions: id, seller_id, title, description, category_id, condition, starting_price, reserve_price, buy_now_price, current_price, start_time, end_time, status, views, watchers_count

-- Auction images
auction_images: id, auction_id, url, position, created_at

-- Bids
bids: id, auction_id, bidder_id, amount, is_proxy, max_amount, created_at

-- Watchlist
watchlist: user_id, auction_id, created_at

-- Messages
messages: id, sender_id, receiver_id, auction_id, content, read_at, created_at

-- Notifications
notifications: user_id, type, title, body, data, read_at, created_at

-- Payments
payments: id, auction_id, buyer_id, amount, method, status, created_at

-- Orders
orders: id, auction_id, buyer_id, seller_id, status, shipping_address, tracking_number, created_at

-- Reviews
reviews: id, order_id, reviewer_id, rating, comment, photos, created_at

-- Reports
reports: id, reporter_id, reported_type, reported_id, reason, status, created_at
```

#### RLS Policies
- Users can read all published auctions
- Sellers can CRUD their own auctions
- Buyers can place bids on active auctions
- Only auction owner can see their bid history
- Admins have full access

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] Landing page loads with hero, featured auctions, and categories
- [ ] Navigation is functional with all links working
- [ ] Auth forms are styled and validate input
- [ ] Dashboard shows all tabs with sample data
- [ ] Auction detail page shows all required information
- [ ] Mobile responsive at all breakpoints
- [ ] Animations are smooth and purposeful

### Functional Checkpoints
- [ ] User can sign up and log in
- [ ] User can create an auction with images
- [ ] Real-time bid updates work
- [ ] Search returns relevant results
- [ ] Watchlist can add/remove items
- [ ] Messages send and receive in real-time
- [ ] Notifications appear without page refresh
- [ ] Payment flow simulation works

### Performance Checkpoints
- [ ] Initial page load < 3 seconds
- [ ] Images lazy load below fold
- [ ] Real-time updates < 500ms latency
- [ ] Smooth scrolling with many items

---

## Technical Implementation

### Tech Stack
- React 18 + Vite
- React Router v6
- Tailwind CSS
- Supabase (Auth, Database, Storage, Realtime)
- Zustand (state management)
- React Hook Form + Zod (validation)
- React Hot Toast (notifications)
- Lucide React (icons)

### Project Structure
```
/src
  /components
    /ui (Button, Input, Card, Modal, etc.)
    /layout (Header, Footer, Sidebar)
    /auction (AuctionCard, BidPanel, ImageGallery)
    /auth (LoginForm, RegisterForm)
    /dashboard (StatsCard, DataTable, Chart)
  /pages
    /public (Landing, Browse, AuctionDetail)
    /auth (Login, Register, ForgotPassword)
    /dashboard (Dashboard, Profile, MyAuctions, etc.)
    /admin (AdminDashboard, UserManagement)
  /hooks (useAuth, useAuctions, useBids, etc.)
  /stores (authStore, auctionStore, notificationStore)
  /lib (supabase, utils, constants)
  /types (TypeScript interfaces)
```

### PWA Configuration
- Service worker for offline
- Web app manifest
- Push notification support

### SEO
- React Helmet for meta tags
- Semantic HTML structure
- Clean URL routes

---

*Specification Version: 1.0*
*Last Updated: 2026-05-15*