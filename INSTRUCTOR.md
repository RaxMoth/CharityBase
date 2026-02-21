# INSTRUCTOR.md - CharityBase B2B Pivot

## 🎯 Project Overview

**Original Concept:** B2C charity subscription platform (similar to betterplace.org)
**New Direction:** B2B Corporate Employee Giving Platform

### Business Model Pivot

**FROM (B2C):**
- Individual users browse charities
- Subscribe monthly to support multiple charities
- Platform takes small fee per donation

**TO (B2B):**
- Companies purchase employee giving portal
- Employees select charities + set payroll deductions
- Company can match donations
- Platform charges monthly SaaS fee per company + small transaction fee

### Why This Pivot?
- Less competition (betterplace.org doesn't focus on B2B)
- Higher revenue potential (B2B contracts vs individual subscriptions)
- Easier customer acquisition (1 company = 100s of users)
- Solves real pain point (German companies need ESG/CSR solutions)
- Recurring, predictable revenue

---

## 📁 Current Codebase State

### Existing Tech Stack ✅
- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Payment:** Stripe (mentioned, needs Connect setup)

### Existing Pages
```
src/pages/
├── LandingPage.tsx       # Keep (modify for B2B messaging)
├── Charities.tsx         # Keep (charity browsing for employees)
├── Dashboard.tsx         # Modify (split into CompanyAdmin + EmployeeDashboard)
├── Subscriptions.tsx     # Keep (for employee selection flow)
├── Checkout.tsx          # Modify (for company signup, not individual)
├── Confirmation.tsx      # Keep
├── Login.tsx             # Keep (add role-based auth)
├── Signup.tsx            # Modify (company signup form)
├── About.tsx             # Keep (update messaging)
├── Privacy.tsx           # Keep
├── Terms.tsx             # Keep (update for B2B)
└── FAQ.tsx               # Keep (update for B2B)
```

### Existing Components
```
src/components/
├── Layout/
│   ├── Header.tsx        # Modify (different nav for company admin vs employee)
│   └── Footer.tsx        # Keep
├── CharityCard.tsx       # Keep
└── Other components...    # Keep as needed
```

---

## 🔧 New Technical Requirements

### 1. User Roles & Authentication

**Three User Types:**
1. **Platform Admin** (you) - Manage companies, charities, platform settings
2. **Company Admin** (HR/CSR manager) - Manage company portal, employees, view reports
3. **Employee** - Browse charities, set donations, view personal impact

**Authentication Requirements:**
- Role-based access control (RBAC)
- Company admins can invite employees via email
- Employees create accounts with company-specific link
- SSO integration (optional for MVP, nice-to-have for later)

**Tech Implementation:**
- Use `useAuthStore` (already exists) + add role field
- Add company_id to user records
- Implement route guards based on role

### 2. New Database Schema

**Key Entities Needed:**

```typescript
// src/types/index.ts additions

interface Company {
  id: string;
  name: string;
  industry: string;
  employee_count: number;
  logo_url?: string;
  admin_user_id: string;
  subscription_tier: 'starter' | 'professional' | 'enterprise';
  monthly_fee: number;
  donation_matching_enabled: boolean;
  matching_percentage?: number; // e.g., 50 = 50% match
  matching_cap_per_employee?: number; // monthly cap in euros
  payroll_integration: boolean;
  created_at: string;
  active: boolean;
}

interface Employee {
  id: string;
  company_id: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  department?: string;
  monthly_donation_amount: number;
  donation_allocation: {
    charity_id: string;
    percentage: number;
  }[];
  payroll_deduction_active: boolean;
  joined_at: string;
}

interface CompanyDonation {
  id: string;
  company_id: string;
  employee_id: string;
  charity_id: string;
  amount: number; // in cents
  is_company_match: boolean;
  payment_date: string;
  stripe_payment_id: string;
}

interface Charity {
  id: string;
  name: string;
  description: string;
  category: string;
  logo_url: string;
  website: string;
  tax_id: string; // German: Steuernummer
  is_verified: boolean;
  is_gemeinnützig: boolean; // German tax-exempt status
  dzi_seal: boolean; // DZI Spenden-Siegel
  bank_account: {
    iban: string;
    bic: string;
    account_holder: string;
  };
  impact_metrics?: {
    metric_name: string;
    metric_value: string;
  }[];
  created_at: string;
}
```

### 3. New Pages to Build

#### A. **Company Signup Flow** (`/company/signup`)
**Purpose:** Companies sign up and purchase access
**Requirements:**
- Company info form (name, industry, employee count)
- Admin account creation
- Subscription tier selection (Starter/Professional/Enterprise)
- Payment via Stripe Checkout
- Email verification

**Pricing Tiers:**
```
Starter:    €299/month  (up to 50 employees)
Professional: €599/month  (up to 200 employees)
Enterprise: Custom pricing (200+ employees)

+ 2% transaction fee on all donations
```

#### B. **Company Admin Dashboard** (`/company/admin`)
**Purpose:** Company admins manage their portal
**Features:**
- Overview metrics:
  - Total employees enrolled
  - Total donations this month
  - Company match amount
  - Top supported charities
- Employee management:
  - Invite employees (send email invites)
  - View employee donation preferences
  - Export employee giving data (for payroll)
- Settings:
  - Enable/disable donation matching
  - Set matching percentage
  - Set monthly matching cap
  - Upload company logo
  - Customize portal branding
- Reports & Impact:
  - Monthly donation summary
  - CSR/ESG report download (PDF)
  - Charity breakdown
  - Impact metrics aggregation

**Components to Build:**
- `CompanyMetricsCard.tsx` - Display key metrics
- `EmployeeTable.tsx` - List of employees with donation info
- `InviteEmployeeModal.tsx` - Form to send email invites
- `CompanySettingsForm.tsx` - Edit company preferences
- `ImpactReportGenerator.tsx` - Generate CSR reports

#### C. **Employee Portal** (`/employee/portal`)
**Purpose:** Employees browse charities and set donations
**Features:**
- Browse verified German charities
- Search and filter by category
- Select charities to support
- Set monthly donation amount
- Allocate percentage to each charity
- See company match (if enabled)
- View personal impact dashboard

**Flow:**
1. Employee receives invite email from company admin
2. Creates account (linked to company)
3. Browses charities
4. Selects 1-5 charities to support
5. Sets monthly donation (e.g., €20/month)
6. Allocates % to each charity (must sum to 100%)
7. Enables payroll deduction
8. Sees projected impact + company match

**Components to Build:**
- `EmployeeCharityBrowser.tsx` - Charity browsing interface
- `DonationAllocationSlider.tsx` - Set % for each charity
- `CompanyMatchIndicator.tsx` - Show matched amount
- `EmployeeImpactDashboard.tsx` - Personal giving stats

#### D. **Charity Management** (`/admin/charities`)
**Purpose:** Platform admin manages charity database
**Features:**
- Add new charities (manual entry)
- Verify charity status (gemeinnützig, DZI seal)
- Edit charity information
- Upload charity logos
- Enable/disable charities
- View charity donation statistics

**This is for YOU (platform admin) only**

### 4. Key User Flows

#### Flow 1: Company Onboarding
```
1. Company visits landing page
2. Clicks "Get Started for Your Company"
3. Fills out company info + admin account
4. Selects subscription tier
5. Enters payment (Stripe Checkout)
6. Receives confirmation email
7. Logs into Company Admin Dashboard
8. Customizes portal (logo, matching settings)
9. Invites employees via email
```

#### Flow 2: Employee Enrollment
```
1. Employee receives invite email
2. Clicks invite link (contains company_id token)
3. Creates employee account
4. Redirected to charity browser
5. Selects charities (e.g., 3 charities)
6. Sets monthly donation (e.g., €15/month)
7. Allocates: 50% Charity A, 30% Charity B, 20% Charity C
8. Sees company match: €15 + €7.50 match = €22.50 total
9. Enables payroll deduction
10. Confirmation + email receipt
```

#### Flow 3: Monthly Donation Processing
```
1. 1st of each month: Platform processes all active donations
2. For each employee:
   - Calculate donation amount
   - Calculate company match (if enabled)
   - Split allocation across selected charities
   - Process Stripe payment (company's Stripe account)
3. Disburse funds to charities (Stripe Connect)
4. Send email receipts to employees
5. Update company admin dashboard
6. Generate monthly reports
```

### 5. Stripe Integration (Critical!)

**Current State:** Basic Stripe mentioned, needs upgrade to **Stripe Connect**

**Why Stripe Connect?**
- Allows marketplace payments
- Platform (you) can take fees
- Charities receive funds directly
- Companies can manage their own payment methods

**Setup Required:**

```typescript
// Stripe Connect Architecture:

Platform Account (CharityBase)
├── Connected Account: Company A
│   ├── Customers: Employees of Company A
│   └── Subscriptions: Monthly employee donations
├── Connected Account: Company B
│   ├── Customers: Employees of Company B
│   └── Subscriptions: Monthly employee donations
└── Connected Accounts: Charities (receive payouts)

// Payment Flow:
Employee Donation (€15)
├── Employee's allocation (€15)
├── Company Match (€7.50)
├── Total: €22.50
├── Platform fee: 2% (€0.45)
└── To Charity: €22.05
```

**Implementation:**

1. **Company Setup:**
   - Company admin enters payment method
   - Create Stripe Customer for company
   - Set up recurring charges for platform fee

2. **Employee Donations:**
   - Process monthly via Stripe
   - Split payments to multiple charities
   - Apply company matching
   - Track in database

3. **Charity Payouts:**
   - Monthly disbursement to charity bank accounts
   - Via SEPA Direct Debit (standard in Germany)
   - Automatic reconciliation

**Files to Create:**
```
src/services/
├── stripe-connect.ts       # Stripe Connect setup
├── donation-processor.ts   # Monthly donation processing
└── payout-manager.ts       # Charity payouts
```

### 6. Payment Processing Logic

**Monthly Donation Calculation:**

```typescript
// Pseudocode for monthly processing

function processMonthlyDonations(companyId: string) {
  const company = getCompany(companyId);
  const employees = getActiveEmployees(companyId);
  
  for (const employee of employees) {
    if (!employee.payroll_deduction_active) continue;
    
    const baseDonation = employee.monthly_donation_amount;
    let companyMatch = 0;
    
    if (company.donation_matching_enabled) {
      const matchAmount = baseDonation * (company.matching_percentage / 100);
      const employeeMonthlyMatch = getEmployeeMatchThisMonth(employee.id);
      
      // Check monthly cap
      if (company.matching_cap_per_employee) {
        const remainingCap = company.matching_cap_per_employee - employeeMonthlyMatch;
        companyMatch = Math.min(matchAmount, remainingCap);
      } else {
        companyMatch = matchAmount;
      }
    }
    
    const totalDonation = baseDonation + companyMatch;
    
    // Distribute to charities based on allocation
    for (const allocation of employee.donation_allocation) {
      const amount = totalDonation * (allocation.percentage / 100);
      
      createDonation({
        company_id: companyId,
        employee_id: employee.id,
        charity_id: allocation.charity_id,
        amount: amount,
        is_company_match: false
      });
      
      if (companyMatch > 0) {
        const matchAmount = companyMatch * (allocation.percentage / 100);
        createDonation({
          company_id: companyId,
          employee_id: employee.id,
          charity_id: allocation.charity_id,
          amount: matchAmount,
          is_company_match: true
        });
      }
    }
    
    // Process Stripe payment
    chargeCompany(companyId, totalDonation);
  }
}
```

### 7. Reporting & Analytics

**Company Admin Needs:**
- ESG/CSR report for annual reporting
- Employee participation rate
- Total impact (donations + matches)
- Charity breakdown
- Export to CSV/PDF

**Employee Needs:**
- Personal impact dashboard
- Tax receipt (Spendenbescheinigung)
- Monthly summary email

**Components to Build:**
```
src/components/Reports/
├── CSRReportGenerator.tsx      # PDF generation for companies
├── EmployeeImpactChart.tsx     # Personal giving visualization
├── CompanyImpactSummary.tsx    # Aggregate metrics
└── TaxReceiptGenerator.tsx     # German tax receipts
```

### 8. Landing Page Updates

**Current Landing:** Consumer-focused (individuals donating)
**New Landing:** B2B-focused (companies buying)

**New Messaging:**
```
Hero Section:
"Employee Giving Made Simple"
"Boost CSR & Employee Engagement with Turnkey Workplace Giving"

Features:
- ✅ Zero-effort setup - Launch in 24 hours
- ✅ ESG reporting included - Download ready-made impact reports
- ✅ Donation matching - Amplify your impact
- ✅ Verified German charities - Only gemeinnützig organizations
- ✅ Payroll integration - Automatic monthly deductions

CTA: "Schedule a Demo" or "Start Free Trial"
```

**Sections:**
1. Hero + CTA
2. How It Works (3 steps)
3. Benefits for Companies
4. Benefits for Employees
5. Pricing
6. Testimonials (once you have customers)
7. FAQ
8. Final CTA

### 9. Charity Verification Process

**Important:** You need verified German charities

**Verification Checklist:**
- [ ] Is registered in Germany
- [ ] Has gemeinnützig (tax-exempt) status
- [ ] Has valid Steuernummer (tax ID)
- [ ] Preferably has DZI Spenden-Siegel
- [ ] Valid bank account (IBAN)
- [ ] Contact information verified

**Where to Source Charities:**
1. Start with well-known orgs (WWF Germany, Deutsches Rotes Kreuz, etc.)
2. Check DZI Spenden-Siegel list: https://www.dzi.de/
3. Manually verify each charity
4. Add 20-50 charities for MVP

**Admin Interface Needed:**
```
/admin/charities/add
- Form to add charity details
- Upload documents (Freistellungsbescheid)
- Verification checklist
- Approval workflow
```

---

## 🎨 UI/UX Considerations

### Design Principles
- **Professional & Trustworthy** - B2B buyers need confidence
- **Simple & Clean** - HR managers are busy
- **Impact-Focused** - Show results clearly
- **Mobile-Friendly** - Employees browse on phones

### Color Scheme
Keep existing blue theme (professional for B2B), but consider:
- Primary: Blue (trust)
- Secondary: Green (impact, sustainability)
- Accent: Orange (engagement)

### Key Screens Priority
**MVP Must-Haves:**
1. Landing page (B2B messaging)
2. Company signup flow
3. Company admin dashboard
4. Employee charity browser
5. Employee donation setup

**Phase 2:**
6. Advanced reporting
7. Payroll integration
8. Mobile app

---

## 🏗️ Implementation Phases

### Phase 1: MVP (4-6 weeks)
**Goal:** Get first 3 pilot companies

**Build:**
- [ ] Update landing page (B2B messaging)
- [ ] Company signup flow
- [ ] Basic company admin dashboard
- [ ] Employee invite system
- [ ] Employee charity browser
- [ ] Employee donation allocation
- [ ] Basic Stripe integration (manual processing)
- [ ] 20 verified charities in database

**Skip for now:**
- Payroll integration (do manual first)
- Advanced reporting
- Donation matching (add after MVP)

### Phase 2: Beta (6-8 weeks)
**Goal:** 10 paying companies

**Add:**
- [ ] Stripe Connect automation
- [ ] Monthly donation processing
- [ ] Donation matching feature
- [ ] ESG report generation
- [ ] Employee impact dashboard
- [ ] Email notifications

### Phase 3: Scale (3+ months)
**Goal:** 50+ companies

**Add:**
- [ ] Payroll software integrations (DATEV, SAP, etc.)
- [ ] SSO (Single Sign-On)
- [ ] White-label options
- [ ] Mobile app
- [ ] Advanced analytics

---

## 🗂️ File Structure (New Additions)

```
src/
├── pages/
│   ├── company/
│   │   ├── CompanySignup.tsx           # NEW
│   │   ├── CompanyAdminDashboard.tsx   # NEW
│   │   ├── CompanySettings.tsx         # NEW
│   │   └── EmployeeManagement.tsx      # NEW
│   ├── employee/
│   │   ├── EmployeePortal.tsx          # NEW
│   │   ├── CharitySelection.tsx        # NEW (repurpose existing Charities.tsx)
│   │   ├── DonationSetup.tsx           # NEW
│   │   └── EmployeeImpact.tsx          # NEW
│   ├── admin/
│   │   ├── AdminDashboard.tsx          # NEW (platform admin)
│   │   ├── CharityManagement.tsx       # NEW
│   │   └── CompanyManagement.tsx       # NEW
│   └── [existing pages]
│
├── components/
│   ├── company/
│   │   ├── CompanyMetricsCard.tsx      # NEW
│   │   ├── EmployeeTable.tsx           # NEW
│   │   ├── InviteEmployeeModal.tsx     # NEW
│   │   └── ImpactReportButton.tsx      # NEW
│   ├── employee/
│   │   ├── CharityAllocationSlider.tsx # NEW
│   │   ├── DonationSummaryCard.tsx     # NEW
│   │   ├── CompanyMatchBadge.tsx       # NEW
│   │   └── ImpactVisualization.tsx     # NEW
│   └── [existing components]
│
├── services/
│   ├── stripe-connect.ts               # NEW
│   ├── donation-processor.ts           # NEW
│   ├── email-service.ts                # NEW
│   ├── report-generator.ts             # NEW
│   └── charity-verification.ts         # NEW
│
├── stores/
│   ├── useCompanyStore.ts              # NEW
│   ├── useEmployeeStore.ts             # NEW
│   ├── useAuthStore.ts                 # UPDATE (add roles)
│   └── [existing stores]
│
├── types/
│   └── index.ts                        # UPDATE (add new interfaces)
│
└── utils/
    ├── donation-calculator.ts          # NEW
    ├── matching-logic.ts               # NEW
    └── [existing utils]
```

---

## 🔐 Security & Compliance

### GDPR Compliance
- [ ] Employee data consent forms
- [ ] Data processing agreement for companies
- [ ] Right to deletion
- [ ] Data export functionality
- [ ] Privacy policy update

### Financial Compliance
- [ ] PCI DSS (Stripe handles this)
- [ ] German tax receipt requirements
- [ ] Proper gemeinnützig verification
- [ ] Audit trail for all donations

### Access Control
- [ ] Role-based permissions
- [ ] Company data isolation (employees can't see other companies)
- [ ] Admin-only charity management
- [ ] Secure invite tokens (time-limited)

---

## 📊 Success Metrics

**For MVP Launch:**
- 3 pilot companies signed up
- 50+ employees enrolled across pilots
- €5,000+ in monthly donations processed
- 0 major bugs/security issues

**For Beta:**
- 10 paying companies
- 500+ employees enrolled
- €20,000+ monthly donations
- 90%+ employee satisfaction
- 2+ case studies/testimonials

**For Scale:**
- 50+ companies
- 5,000+ employees
- €100,000+ monthly donations
- €10,000+ MRR from platform fees

---

## 🚀 Go-To-Market Strategy

### Target Companies (Start Local)
**Industry Focus:**
- Tech companies (Berlin startups)
- Consulting firms
- Finance/banking
- Professional services

**Size:**
- 50-200 employees (sweet spot)
- Already care about sustainability/CSR
- Based in Berlin/Munich/Hamburg

### Initial Outreach
1. LinkedIn outreach to HR/CSR managers
2. Attend sustainability/HR conferences
3. Partner with CSR consultancies
4. Content marketing (blog about employee giving)

### Pricing Strategy
**Tiered SaaS:**
```
Starter: €299/month (50 employees)
Professional: €599/month (200 employees)
Enterprise: Custom (200+ employees)

+ 2% transaction fee on donations
```

**Free Trial:** 30 days, up to 10 employees

---

## 📝 Next Steps for Implementation

### Immediate Actions:
1. **Validate demand** - Email 20 HR managers, gauge interest
2. **Set up Stripe Connect account** - Apply for platform access
3. **Build charity database** - Add 20 verified German charities
4. **Redesign landing page** - B2B messaging
5. **Build company signup flow** - Get first customer!

### Week 1-2:
- [ ] Update landing page
- [ ] Create company signup form
- [ ] Set up basic authentication with roles
- [ ] Create company admin dashboard (basic version)

### Week 3-4:
- [ ] Build employee invite system
- [ ] Create employee portal (charity browser)
- [ ] Implement donation allocation UI
- [ ] Add charity database (manual entry for MVP)

### Week 5-6:
- [ ] Stripe integration (basic)
- [ ] Email notifications
- [ ] Testing with pilot company
- [ ] Bug fixes + polish

---

## 🎯 Critical Success Factors

1. **Get 1st customer FAST** - Validate before building everything
2. **Manual processes OK for MVP** - Automate later
3. **Focus on company admin experience** - They're the buyer
4. **Make employee flow dead simple** - 5 minutes max
5. **Show impact clearly** - Both to companies and employees

---

## ⚠️ Common Pitfalls to Avoid

1. **Over-engineering** - Don't build full automation before first customer
2. **Ignoring sales** - Code alone won't get customers
3. **Skipping validation** - Talk to customers FIRST
4. **Perfect before launch** - Ship MVP, iterate based on feedback
5. **Neglecting compliance** - German tax/data laws are strict

---

## 📚 Resources & References

### Stripe Documentation:
- Stripe Connect: https://stripe.com/docs/connect
- Subscriptions: https://stripe.com/docs/billing/subscriptions
- SEPA Direct Debit: https://stripe.com/docs/sources/sepa-debit

### German Charity Resources:
- DZI (Charity Seal): https://www.dzi.de/
- Gemeinnützigkeit: https://www.bundesfinanzministerium.de/

### Competitor Analysis:
- Betterplace.org (German platform)
- Benevity (US/global enterprise)
- Percent (UK platform)

---

## 🤝 Support & Questions

If you need help with:
- Technical implementation details
- Stripe Connect setup
- German charity verification
- Sales/marketing strategy
- Pricing refinement

Just ask! This is a comprehensive guide but implementation will surface new questions.

**Good luck building! 🚀**
