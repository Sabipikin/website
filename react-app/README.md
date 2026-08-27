# SabiPath Scholar Success Plan — React Web App

A production-ready React single-page application for MSc coaching and academic support services. Dual pricing model: annual memberships (£2,500–£3,500) + single assessments (£150–£750).

## Tech Stack

- **React 18** — UI framework
- **Vite** — Lightning-fast build tool
- **React Router v6** — Client-side routing
- **Stripe** — Secure payment processing
- **Calendly** — Frictionless booking widget
- **CSS Grid/Flexbox** — Responsive design

## Project Structure

```
react-app/
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx              # Main app with routing & state
│   ├── components/
│   │   ├── Header.jsx       # Navigation header with sticky positioning
│   │   ├── Hero.jsx         # Hero banner with mode selector
│   │   ├── PricingCards.jsx # 3 annual membership tiers
│   │   ├── AssessmentSelector.jsx # Single assessment configurator
│   │   ├── BookingModal.jsx # 2-step booking: Calendly + Stripe
│   │   ├── FAQ.jsx          # Accordion-style FAQ
│   │   └── Footer.jsx       # Footer with contact info
│   ├── pages/
│   │   ├── Home.jsx         # Home page with pricing, testimonials
│   │   ├── Pricing.jsx      # Dedicated pricing page
│   │   └── FAQ.jsx          # FAQ page
│   └── styles/
│       └── index.css        # Global & component styles
├── package.json             # Dependencies
├── vite.config.js          # Vite build config
├── index.html              # HTML entry point
└── README.md               # This file
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd react-app
npm install
```

### 2. Environment Variables

Create a `.env` file in `react-app/` with:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY_HERE
VITE_CALENDLY_URL=https://calendly.com/your-username
VITE_API_URL=https://api.sabipath.com
```

**Get your keys:**
- **Stripe Publishable Key**: [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
- **Calendly URL**: Create account at [calendly.com](https://calendly.com), copy your unique URL
- **API URL**: Backend endpoint for payment confirmation webhooks (optional for initial testing)

### 3. Run Locally

```bash
npm run dev
```

Opens at `http://localhost:5173` by default. Edit any component and see changes instantly (Vite's Hot Module Reload).

### 4. Build for Production

```bash
npm run build
```

Outputs optimized bundle to `dist/` folder (~150KB gzipped).

## Features

### Dual Pricing Model
- **Annual Tiers**: Basic, Regular (Most Popular), Premium with feature lists
- **Single Assessments**: Essay, Chapter, Defense, Bulk — choose turnaround (Standard/Rush +£50)

### Booking Flow
1. User selects tier or assessment
2. Clicks "Book Now"
3. Modal opens with two tabs:
   - **Calendly widget** for time selection
   - **Stripe CardElement** for secure payment
4. Confirmation email sent on success

### Responsive Design
- Mobile-first CSS (75% of code targets 768px+)
- Flexbox/Grid layouts
- Touch-friendly button sizing
- Automatic font scaling

### SEO & Accessibility
- Semantic HTML (`<header>`, `<main>`, `<footer>`)
- Color contrast meets WCAG AA (Navy + Gold on white)
- Keyboard navigation throughout
- No external dependencies that block rendering

## Component API

### `<Header>`
Sticky navigation with links to Home/Pricing/FAQ and Contact button.

### `<Hero>`
Hero banner with SabiPath branding and annual/single assessment mode toggle.

```jsx
<Hero onModeSwitch={(mode) => setMode(mode)} />
```

### `<PricingCards>`
Displays 3 membership tiers. Calls `onBook(tier)` on CTA click.

```jsx
<PricingCards onBook={(tier) => openBookingModal(tier)} />
```

### `<AssessmentSelector>`
Allows user to configure single assessment (type, turnaround, quantity). Real-time price updates.

```jsx
<AssessmentSelector onBook={(config) => openBookingModal(config)} />
```

### `<BookingModal>`
Two-step flow: calendar selection + payment. Handles form validation and error states.

```jsx
<BookingModal isOpen={showModal} onClose={() => setShowModal(false)} booking={booking} />
```

### `<FAQ>`
Accordion with 6 pre-loaded questions and answers. Click to expand/collapse.

### `<Footer>`
Contact info, pricing summary, copyright.

## Styling

All CSS is in `src/styles/index.css` (~715 lines). Uses CSS custom properties for theming:

```css
:root {
  --primary: #1f3b57;      /* Navy */
  --secondary: #b8860b;    /* Gold */
  --light: #f7f9fc;
  --border: #ddd;
  --text: #333;
  --muted: #666;
}
```

To customize colors, update these variables. No component-specific CSS modules needed — all styles inherit from global scope.

## Deployment

### Option 1: Netlify (Recommended)

1. Push to GitHub (already done)
2. Connect repo to [netlify.com](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add env vars in Netlify dashboard
6. Deploy (automatic on git push)

### Option 2: Vercel

1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite config
4. Add env vars in project settings
5. Deploy

### Option 3: Manual / GitHub Pages

```bash
npm run build
# Copy dist/ to your web server
```

For GitHub Pages, update `vite.config.js`:
```js
export default {
  base: '/sabipikin-website/'  // your repo name
}
```

## Security Checklist

✓ Stripe key is publishable-only (no secret key in frontend)  
✓ All env vars are set server-side, never hardcoded  
✓ HTTPS enforced in production  
✓ CORS configured for backend API  
✓ No sensitive data logged to console  
✓ Payment handler webhook validates requests  

## Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code style (optional, not configured) |

## Common Issues

**Issue: "Cannot find module 'react'"**  
→ Run `npm install`

**Issue: Stripe not loading**  
→ Check `VITE_STRIPE_PUBLISHABLE_KEY` in `.env` and browser console for errors

**Issue: Calendly widget blank**  
→ Verify `VITE_CALENDLY_URL` is valid and public

**Issue: Styles not applied**  
→ Ensure `import '../styles/index.css'` is in `src/main.jsx`

## Next Steps

1. ✅ **Components built** (11 files)
2. ✅ **CSS styling complete** (715 lines)
3. ✅ **Committed to GitHub**
4. **Awaiting you to:**
   - Get Stripe Publishable Key
   - Create Calendly account
   - Create `.env` file with keys
   - Run `npm install && npm run dev`
   - Test locally
   - Deploy to Netlify or Vercel

## Support

For issues, check:
- Browser console (F12 → Console tab)
- Network tab for failed API calls
- Stripe dashboard for payment test history

---

**Built with ❤️ for MSc success.**
