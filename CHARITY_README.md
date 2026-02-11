# CharityBase - Monthly Charity Subscription Platform

A modern web application that enables users to make monthly recurring donations to verified charities. Built with React, TypeScript, Tailwind CSS, and Lucide React icons.

## 🎯 Purpose

CharityBase simplifies charitable giving by allowing users to:

- Browse a curated list of verified charities
- Set up monthly subscription donations
- Automatically distribute donations among multiple charities
- Track their impact with real-time reports
- Cancel or modify subscriptions anytime

## 📁 Project Structure

```
src/
├── components/
│   ├── CharityCard.tsx          # Individual charity display component
│   ├── SubscriptionTier.tsx     # Pricing tier selection component
│   ├── Header.tsx               # Navigation header with cart badge
│   ├── Footer.tsx               # Footer with links and info
│   ├── Layout.tsx               # Main layout wrapper
│   └── ...other components
├── stores/
│   └── useAppStore.ts           # Zustand store for subscription state
├── pages/
│   ├── LandingPage.tsx          # Home page with hero and features
│   ├── Charities.tsx            # Browse and search charities
│   ├── Subscriptions.tsx        # Select tier and charities
│   ├── Checkout.tsx             # Payment form
│   └── Confirmation.tsx         # Success page
├── App.tsx                      # Main router
└── main.tsx                     # Entry point
```

## 🚀 Features

### 1. **Landing Page**

- Hero section with call-to-action
- Feature highlights
- How it works section
- Trust indicators

### 2. **Charity Browser**

- Search functionality
- Category filtering
- Charity cards with progress bars
- One-click add to cart

### 3. **Subscription Management**

- Three tier options ($5, $15, $50)
- Select multiple charities
- Automatic equal distribution
- Real-time calculation

### 4. **Checkout Process**

- Personal information form
- Multiple payment methods (Card, PayPal)
- Order summary
- Clear cost breakdown

### 5. **Confirmation Page**

- Success confirmation
- Subscription details
- What happens next
- Impact messaging

## 🎨 Design Components

### Colors

- Primary: Blue (`from-blue-600 to-blue-700`)
- Success: Green (`#10b981`)
- Accent: Red (`#ef4444`)

### Icons (Lucide React)

- `Heart` - Main branding
- `TrendingUp` - Impact tracking
- `Globe` - Global reach
- `Users` - Community
- `Search` - Search functionality
- `Check` - Confirmations
- `ExternalLink` - Links

## 📦 Dependencies

```json
{
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.1",
    "zustand": "^5.0.10",
    "lucide-react": "^0.263.1",
    "framer-motion": "^12.4.2",
    "tailwindcss": "^3.4.17"
}
```

## 🔄 User Flow

```
Landing Page
    ↓
Browse Charities (Search/Filter)
    ↓
Add Charities to Cart
    ↓
Select Subscription Tier
    ↓
Review Selection
    ↓
Checkout (Payment)
    ↓
Confirmation
```

## 💾 State Management (Zustand)

The `useAppStore` manages:

- `subscriptions[]` - Active subscriptions
- `selectedCharities[]` - Charities in cart
- `monthlyBudget` - Monthly donation amount
- Actions for adding/removing charities and subscriptions

## 🎬 Getting Started

### Setup

```bash
cd CharityBase
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Development

```bash
npm run dev  # Starts dev server at http://localhost:5173
```

## 📋 Sample Charities

The app comes with 6 sample charities:

1. **Global Food Initiative** - Food Security
2. **Clean Water Foundation** - Water & Sanitation
3. **Education for All** - Education
4. **Medical Relief International** - Healthcare
5. **Environmental Conservation** - Environment
6. **Youth Empowerment Program** - Community Development

Each charity has:

- Description
- Monthly goal
- Current donation progress
- Progress visualization

## 🔐 Security Notes

**Current Implementation**: This is a prototype with mock payment processing.

For production, integrate:

- Real payment gateway (Stripe, PayPal)
- Backend authentication
- Database for charities and subscriptions
- Email notifications
- SSL/TLS encryption

## 🚀 Future Enhancements

- [ ] Real payment processing
- [ ] User authentication & profiles
- [ ] Charity verification system
- [ ] Impact analytics dashboard
- [ ] Email notifications
- [ ] Tax receipt generation
- [ ] Team/group donations
- [ ] Donation history
- [ ] Charity ratings & reviews
- [ ] Mobile app version

## 📝 Routes

| Route            | Component     | Purpose                  |
| ---------------- | ------------- | ------------------------ |
| `/`              | LandingPage   | Home page                |
| `/charities`     | Charities     | Browse charities         |
| `/subscriptions` | Subscriptions | Select tiers & charities |
| `/checkout`      | Checkout      | Payment form             |
| `/confirmation`  | Confirmation  | Success page             |

## 🎨 Customization

### Change Colors

Edit Tailwind classes in components:

```tsx
// Change primary blue to another color
className = "bg-blue-600"; // → className="bg-purple-600"
```

### Add More Charities

Update the `CHARITIES` array in `src/Charities.tsx`:

```tsx
const CHARITIES = [
    {
        id: "7",
        name: "Your Charity",
        description: "Description",
        category: "Category",
        logo: "url",
        monthlyGoal: 50000,
        donations: 25000,
    },
];
```

### Adjust Tiers

Modify the `tiers` array in `src/Subscriptions.tsx`

## 📞 Support

For questions or issues:

- Email: support@charitybase.org
- Check documentation in component files

---

Built with ❤️ for making global impact accessible
