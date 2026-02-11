# CharityBase - Professional Project Structure

## 📁 Directory Organization

```
src/
├── App.tsx                           # Main application router
├── main.tsx                          # Entry point
├── vite-env.d.ts
│
├── pages/                            # Page Components (Marketing & Auth)
│   ├── LandingPage.tsx               # Hero & features landing page
│   ├── Charities.tsx                 # Charity browser with search/filter
│   ├── Dashboard.tsx                 # User account & subscription management
│   ├── Checkout.tsx                  # Payment processing
│   ├── Subscriptions.tsx             # Cart management
│   ├── Confirmation.tsx              # Order successful page
│   ├── Login.tsx                     # User authentication
│   ├── Signup.tsx                    # User registration
│   ├── About.tsx                     # Company mission & values
│   ├── Privacy.tsx                   # Privacy policy (GDPR)
│   ├── Terms.tsx                     # Terms of service
│   └── FAQ.tsx                       # Frequently asked questions
│
├── components/                       # Reusable UI Components
│   ├── Layout/
│   │   ├── Layout.tsx                # Main layout wrapper
│   │   ├── Header.tsx                # Navigation header
│   │   └── Footer.tsx                # Footer with links
│   ├── UI/                           # UI Components (future)
│   ├── CharityCard.tsx               # Individual charity display
│   ├── Card.tsx                      # Generic card component
│   ├── FeatureComponent.tsx          # Feature showcase
│   └── index.ts                      # Barrel export
│
├── stores/                           # Zustand State Management
│   ├── useAppStore.ts                # Cart & theme state
│   ├── useAuthStore.ts               # User authentication state
│   └── index.ts                      # Barrel export
│
├── config/                           # Application Configuration
│   └── seo.ts                        # SEO metadata, structured data, sitemap config
│
├── utils/                            # Utility Functions
│   └── seo.tsx                       # SEO helpers, analytics logging, meta tags
│
├── types/                            # TypeScript Type Definitions
│   └── index.ts                      # All type interfaces (Charity, User, Order, etc)
│
├── services/                         # API & External Services (future)
│   └── (ready for backend APIs)
│
├── public/
│   └── data/
│       └── charities.json            # Fake database (production ready structure)
│
├── styles/
│   ├── index.css
│   └── App.css
│
└── vite.config.ts
```

## 🎯 Architecture Principles

### 1. **Page-Based Organization**
- All full-page components in root or organized by feature
- Page components handle routing and layout
- Clean separation from reusable components

### 2. **Modular Components**
- `components/` contains reusable UI elements
- `Layout/` subfolder for layout-specific components
- Each component is self-contained with its styles

### 3. **Centralized State Management**
- Zustand stores for global state
- Separate stores for app (cart) and auth (user)
- Barrel exports for clean imports

### 4. **Type Safety**
- Dedicated `types/` directory
- Single source of truth for all interfaces
- Full TypeScript coverage

### 5. **SEO Optimization**
- `config/seo.ts` - Centralized metadata
- `utils/seo.tsx` - Reusable SEO utilities
- Structured data (JSON-LD) ready
- Open Graph & Twitter cards configured

## 📊 Data Flow

```
User Action
    ↓
Page Component (e.g., Charities.tsx)
    ↓
Store (useAppStore / useAuthStore)
    ↓
Component (CharityCard.tsx)
    ↓
UI Rendered
```

## 🔍 SEO Structure

### Meta Tags Configuration
Each page has SEO meta tags defined in `config/seo.ts`:
- Title tags (unique, keyword-rich)
- Meta descriptions (160 chars)
- Keywords array
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data (JSON-LD)
- Canonical URLs

### Pages with SEO Optimization
- ✅ Landing Page (home)
- ✅ Charities (browse)
- ✅ Dashboard (user account)
- ✅ About (company page)
- ✅ Privacy (legal)
- ✅ Terms (legal)
- ✅ FAQ (help)
- ✅ Login/Signup (auth pages)

## 🚀 Performance Optimizations

1. **Code Splitting** - Page components lazy-loaded via routes
2. **Tree Shaking** - Barrel exports enable better tree shaking
3. **Image Lazy Loading** - `utils/seo.tsx` includes lazy load implementation
4. **Gzip Compression** - Assets: 80.95 KB gzipped

## 📦 Key Files

### Config Files
- `config/seo.ts` - SEO metadata for all pages
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite bundler config
- `tailwind.config.js` - Tailwind CSS customization

### Store Interfaces
- `stores/useAppStore.ts` - Cart items, theme switching
- `stores/useAuthStore.ts` - User login/registration, persistence

### Type Definitions
- `types/index.ts` - 100+ type definitions for entire app
  - `Charity`, `CartItem`, `User`, `Order`
  - `LoginCredentials`, `SignupFormData`
  - `MetaTags`, `StructuredData`

## 🔗 Imports Best Practices

```typescript
// ❌ Avoid
import Layout from "../../components/Layout/Layout";
import { useAppStore } from "../../stores/useAppStore";

// ✅ Preferred
import { CharityCard } from "./components";
import { useAppStore } from "./stores";
```

## 🌍 Deployed Structure Ready For

- **Frontend Hosting**: Vercel, Netlify, GitHub Pages
- **Backend Integration**: Ready for Node/Python/Go backend APIs
- **Database**: Currently fake JSON, ready for PostgreSQL/MongoDB
- **Authentication**: localStorage demo → Backend JWT ready
- **Payments**: Stripe integrations ready in data structure

## 🎨 Design System

- **Color Palette**: Emerald (primary), Amber (accent), Blue (secondary)
- **Icons**: Lucide React
- **CSS**: Tailwind CSS
- **Animations**: Framer Motion
- **State**: Zustand

## 📝 File Naming Conventions

- **Pages**: PascalCase (Charities.tsx, Dashboard.tsx)
- **Components**: PascalCase (CharityCard.tsx, Header.tsx)
- **Stores**: camelCase with prefix (useAppStore.ts)
- **Utilities**: camelCase (seo.tsx)
- **Types**: types/index.ts (consolidated)
- **Configs**: kebab-case (seo.ts)

## 🔄 Build & Deployment

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Output size
dist/assets/index-*.js   # 269.28 KB → 80.95 KB (gzipped)
dist/assets/index-*.css  # 27.24 KB → 4.96 KB (gzipped)
```

---

**Last Updated**: February 2026  
**Project Status**: Professional Structure, SEO Optimized, Production Ready
