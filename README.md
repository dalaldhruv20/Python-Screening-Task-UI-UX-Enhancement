# FOSSEE Workshop Booking — UI/UX Redesign

A modern, mobile-first redesign of the [FOSSEE Workshop Booking](https://github.com/FOSSEE/workshop_booking) platform, built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**. The original Django backend is preserved; this project enhances only the frontend UI/UX layer.

---

## 📸 Screenshots

> Before-and-after comparisons are included in the `docs/screenshots/` folder.

| Page | Before | After |
|------|--------|-------|
| Login | Basic Bootstrap form | Dark glassmorphic card with ambient gradient, FOSSEE branding |
| Registration | Single long form | Multi-step, one-question-at-a-time flow with role selection |
| Dashboard | Bootstrap sidebar + tables | Mobile-first bottom-tab navigation, role-based views |
| Workshops | Plain list | Card-based layout with status badges, search & filter |
| Statistics | Basic tables | Visual charts with Recharts, monthly filters |

---

## 🎨 Design Principles

### What design principles guided your improvements?

1. **Mobile-First Design** — The primary audience is students on mobile devices. Every component was designed at 375px first, then scaled up. Bottom tab navigation, touch-friendly hit targets (≥44px), and full-width cards ensure usability on small screens.

2. **Visual Hierarchy & Clarity** — We use a strict typographic system: **Gelasio** (serif) for headings to convey academic authority, and **Fira Sans** (sans-serif) for body text for readability. FOSSEE's orange accent (`hsl(30 85% 55%)`) is used sparingly for CTAs and active states, avoiding visual overload.

3. **Glassmorphism with Purpose** — Frosted glass cards (`backdrop-blur`, subtle white borders) create depth without heavy shadows. This keeps the interface feeling modern and lightweight while maintaining readability.

4. **Role-Based UX** — Coordinators and Instructors have different workflows, so they get different navigation tabs and dashboard views. This reduces cognitive load — users only see what's relevant to them.

5. **Progressive Disclosure** — Registration uses a step-by-step flow (one field at a time) instead of a long form. This reduces abandonment and feels conversational rather than bureaucratic.

6. **Accessibility** — Semantic HTML (`<nav>`, `<main>`, `<header>`), `aria-label` attributes, `aria-current="page"` for active nav items, keyboard navigation support, and sufficient color contrast ratios.

### How did you ensure responsiveness across devices?

- **CSS-first approach**: Tailwind's responsive prefixes (`sm:`, `lg:`) with a mobile-first base. No JavaScript-based responsive logic.
- **Flexible layouts**: `max-w-3xl mx-auto` containers, `grid-cols-1 sm:grid-cols-2` card grids.
- **Viewport-relative units**: Gradient background glows use `vw`/`vh` units so they scale proportionally on any screen size.
- **Touch optimization**: All interactive elements have minimum 44px touch targets. Bottom navigation uses `safe-area-inset-bottom` for devices with home indicators.
- **Testing**: Verified across 375px (iPhone SE), 390px (iPhone 14), 768px (iPad), and 1440px (desktop) viewports.

### What trade-offs did you make between design and performance?

1. **CSS gradients over images**: The login background uses pure CSS `radial-gradient` layers instead of a high-res background image. This eliminates a network request, reduces LCP, and looks identical on all screen sizes — at the cost of slightly less photographic realism.

2. **Font loading strategy**: We use Google Fonts with `display=swap` for Gelasio and Fira Sans. This means a brief flash of system fonts on first load, but ensures text is always visible (no FOIT).

3. **Backdrop blur**: `backdrop-blur-2xl` is GPU-accelerated on modern devices but can cause jank on older Android browsers. We limit blur to key UI elements (cards, nav bars) rather than applying it globally.

4. **No heavy animation library**: Instead of Framer Motion or GSAP, we use CSS keyframe animations (`fade-in`, `slide-up`). This keeps the bundle size small (~0 KB added) while still providing smooth transitions.

5. **Component granularity**: We use shadcn/ui primitives for buttons, dialogs, and form elements. This gives us accessible, well-tested components without the overhead of a full component library like MUI.

### What was the most challenging part of the task and how did you approach it?

The most challenging aspect was **designing the multi-step registration flow** that feels native and conversational while maintaining all the fields required by the Django backend (first name, last name, email, username, password, institution, department, role).

**Approach:**
- Studied onboarding flows from apps like Typeform and Linear for inspiration.
- Implemented a step counter with progress bar so users know where they are.
- Added keyboard support — pressing Enter advances to the next step.
- Used auto-focus on each input field transition for seamless typing.
- Added a back button at every step so users never feel trapped.
- Validated each field before allowing progression, with clear visual feedback (disabled vs. active button states).

The second challenge was **role-based navigation** — ensuring coordinators and instructors see different dashboards without duplicating code. This was solved with a shared `DashboardLayout` component that conditionally renders tab arrays based on `user.role`.

---

## 🏗️ Project Structure

```
├── public/                          # Static assets
│   ├── fossee-favicon.png           # FOSSEE favicon
│   ├── fossee-logo-full.png         # FOSSEE full logo
│   └── robots.txt
├── src/
│   ├── assets/                      # Bundled assets (images, etc.)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx   # Role-based bottom-tab layout
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx            # Public page layout
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── NavLink.tsx
│   │   └── ThemeProvider.tsx
│   ├── contexts/
│   │   └── UserContext.tsx           # Auth state & role management
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── useScrollAnimation.ts
│   ├── lib/
│   │   └── utils.ts                 # Tailwind merge utility
│   ├── pages/
│   │   ├── Auth.tsx                  # Login + multi-step registration
│   │   ├── Index.tsx                 # Home dashboard (role-based)
│   │   ├── Workshops.tsx             # Workshop listing
│   │   ├── WorkshopDetails.tsx       # Single workshop view
│   │   ├── ProposeWorkshop.tsx       # Workshop proposal form
│   │   ├── CreateWorkshop.tsx        # Workshop creation (instructor)
│   │   ├── ProposedWorkshops.tsx     # Proposed workshop tracking
│   │   ├── Statistics.tsx            # Stats & analytics
│   │   ├── Comments.tsx              # Comment feed (instructor)
│   │   ├── Profile.tsx               # User profile & settings
│   │   └── NotFound.tsx
│   ├── App.tsx                       # Route definitions
│   ├── index.css                     # Design tokens & global styles
│   └── main.tsx                      # Entry point
├── workshop_app/                     # Django backend (original)
│   ├── models.py                     # Data models (Workshop, Profile, etc.)
│   ├── views.py                      # View logic
│   ├── urls.py                       # URL routing
│   ├── forms.py                      # Django forms
│   ├── templates/                    # Django templates (legacy)
│   ├── static/                       # Static files (CSS, JS, fonts)
│   ├── migrations/                   # Database migrations
│   └── tests/                        # Unit tests
├── workshop_portal/                  # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── statistics_app/                   # Statistics module (Django)
├── cms/                              # CMS module (Django)
├── teams/                            # Teams module (Django)
├── manage.py                         # Django management
├── requirements.txt                  # Python dependencies
├── package.json                      # Node.js dependencies
├── vite.config.ts                    # Vite configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.8 (for Django backend)
- **pip** (Python package manager)

### Frontend (React)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/workshop_booking.git
cd workshop_booking

# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

The React app will be available at `http://localhost:5173`.

### Backend (Django)

```bash
# Create a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Create a superuser (optional)
python manage.py createsuperuser

# Start the Django server
python manage.py runserver
```

The Django backend will be available at `http://localhost:8000`.

### Connecting Frontend to Backend

To connect the React frontend with the Django backend during development, add a proxy to `vite.config.ts`:

```ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
```

Then use `fetch('/api/...')` in React components to call Django endpoints.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript 5, Vite 5 |
| Styling | Tailwind CSS 3, shadcn/ui |
| State | React Context API, TanStack Query |
| Charts | Recharts |
| Routing | React Router v6 |
| Backend | Django 3.x (original, preserved) |
| Database | SQLite (default) / PostgreSQL |

---



## 📄 License

This project is part of the FOSSEE initiative at IIT Bombay. See [LICENSE](LICENSE) for details.
