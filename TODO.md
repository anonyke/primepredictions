# Website Advancement - TODO

## 1. Homepage Hero (`frontend/app/page.jsx`)
- [x] Change headline to "Smarter Football Predictions"
- [x] Keep Primary CTA "Get Premium Access" + Secondary "View Free Predictions"
- [x] Add subtle sports pattern background to hero (kept gradient orbs)

## 2. Replace Testimonials with Data Visualization (`frontend/app/page.jsx`)
- [x] Remove the 3 testimonial cards
- [x] Add "Performance Dashboard" section with:
  - Animated win-rate gauge
  - Confidence bars per category
  - Monthly win/loss bar chart
  - Category breakdown strip with icons

## 3. Payment Flow Grooming
- [x] Convert PaymentForm into a checkout modal (logos only appear in modal)
- [x] Payment logos only inside the checkout modal

## 4. Navbar Mobile-First (`frontend/components/Navbar.jsx`)
- [x] Added theme toggle (desktop + mobile)
- [x] Ensure collapsible hamburger menu works well

## 5. Dark Mode Toggle (lighter variant)
- [x] Add theme toggle button in Navbar
- [x] Persist theme in localStorage
- [x] Add light-theme CSS variable overrides in globals.css

## 6. Dashboard Polish (`frontend/app/dashboard/page.jsx`)
- [x] Pull real user name from AuthContext (replace hardcoded "John")
- [x] Ensure responsive grid for mobile (already present)
