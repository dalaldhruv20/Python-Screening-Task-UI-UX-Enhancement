# FOSSEE Workshop Booking — UI/UX Redesign

A modern, mobile-first redesign of the [FOSSEE Workshop Booking](https://github.com/FOSSEE/workshop_booking) platform, built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**. The original Django backend is preserved; this project enhances only the frontend UI/UX layer.

---

##  UI/UX Improvements

> The redesign focuses on improving usability, accessibility, and mobile responsiveness while keeping the core functionality intact.  
> Below are before-and-after comparisons along with the reasoning behind each improvement.

---

###  Login Page
| Before | After |
|--------|-------|
| <p align="center"><img src="screenshots/login_before.png" height="250"/></p> | <p align="center"><img src="screenshots/login_after.png" height="250"/></p> |

**What was changed:**
- Replaced basic Bootstrap form with a modern glassmorphic UI  
- Improved spacing, alignment, and CTA visibility  
- Added branding and gradient-based visual depth  

**Impact:**
- Stronger first impression and visual appeal  
- Better input focus and readability  
- More engaging and intuitive login experience  

---

###  Registration / Onboarding
| Before | After |
|--------|-------|
| <p align="center"><img src="screenshots/register_before.png" height="250"/></p> | <p align="center"><img src="screenshots/onboarding_after.png" height="250"/></p> |

**What was changed:**
- Converted long static form into a step-by-step onboarding flow  
- Introduced role selection (Coordinator / Instructor)  
- Reduced visible fields at once  

**Impact:**
- Lower cognitive load  
- Increased user engagement  
- Smoother and more guided user flow  

---

###  Dashboard
| Before | After |
|--------|-------|
| <p align="center"><img src="screenshots/dashboard_before.png" height="250"/></p> | <p align="center"><img src="screenshots/dashboard_after.png" height="250"/></p> |

**What was changed:**
- Redesigned layout with modern UI components  
- Introduced bottom navigation for mobile-first usage  
- Improved spacing, typography, and structure  

**Impact:**
- Faster navigation on mobile devices  
- Better content organization  
- Cleaner and distraction-free interface  

---

###  Workshop Statistics
| Before | After |
|--------|-------|
| <p align="center"><img src="screenshots/statistics_before.png" height="250"/></p> | <p align="center"><img src="screenshots/statistics_after.png" height="250"/></p> |

**What was changed:**
- Replaced tabular data with visual charts and cards  
- Added filtering and structured layout  
- Improved data grouping  

**Impact:**
- Easier data interpretation  
- More interactive experience  
- Better decision-making support  

---

###  Profile / User Interface
| Before | After |
|--------|-------|
| <p align="center"><img src="screenshots/admin_before.png" height="250"/></p> | <p align="center"><img src="screenshots/profile_after.png" height="250"/></p> |

**What was changed:**
- Replaced admin-heavy UI with clean user profile screen  
- Structured personal information layout  
- Added clear action buttons  

**Impact:**
- More intuitive user interaction  
- Improved clarity and usability  
- Better overall user experience  

---

###  Summary of Improvements

- Mobile-first responsive design  
- Reduced cognitive load across flows  
- Improved navigation and accessibility  
- Modern visual design aligned with current UI trends  
- Faster and cleaner user interactions  
---

## Reasoning

###  Design Principles

- **Mobile-First Approach**  
  Designed primarily for mobile users with touch-friendly components, bottom navigation, and optimized layouts for small screens.

- **Clear Visual Hierarchy**  
  Used consistent typography and spacing to guide user attention. Highlighted key actions using FOSSEE’s accent color.

- **Role-Based UX**  
  Separate flows for Coordinators and Instructors to reduce clutter and show only relevant features.

- **Simplified User Flow**  
  Replaced long forms with step-by-step onboarding to reduce cognitive load and improve usability.

- **Accessibility Considerations**  
  Used semantic HTML, proper labels, and ensured good contrast for better readability and navigation.

---

###  Responsiveness

- Built with a **mobile-first CSS approach** using responsive breakpoints  
- Flexible layouts using grids and containers  
- Optimized touch targets for smaller screens  
- Tested across mobile, tablet, and desktop screen sizes  

---

###  Design vs Performance Trade-offs

- Used **CSS gradients instead of images** to reduce load time  
- Limited use of heavy effects (blur, animations) to maintain smooth performance  
- Avoided large UI libraries to keep bundle size small  
- Used system-friendly font loading for faster rendering  

---

###  Challenges & Approach

- **Multi-step Registration Flow**  
  Designed a step-by-step form to replace a long static form, improving user engagement and reducing friction.

- **Role-Based Navigation**  
  Implemented conditional layouts to support different user roles without duplicating code.

- **Balancing Design & Performance**  
  Focused on modern UI while ensuring fast load times and responsiveness.
---

##  Project Structure

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

##  Setup Instructions

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

##  Tech Stack

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
