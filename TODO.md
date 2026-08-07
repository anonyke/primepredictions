# Professional Frontend Redesign — Task List

## Steps
- [ ] 1. Create shared `PageHeader` component (eyebrow + gradient title + subtitle + container)
- [ ] 2. Create `AdminLayout` component (professional sidebar + topbar for admin area)
- [ ] 3. Update `Navbar` to hide on `/admin` routes, polish active states, theme toggle, mobile menu
- [ ] 4. Polish `Footer` (theming via CSS variables, accessibility)
- [ ] 5. Fix duplicate Navbar/Footer — remove per-page imports from public & dashboard pages
- [ ] 6. Refactor admin pages to use `AdminLayout` (dashboard, predictions, users, payments, settings)
- [ ] 7. Standardize colors/backgrounds to CSS variables across shared components (PredictionCard, MatchCard, DashboardCards, PaymentForm)
- [ ] 8. Refactor public pages to use `PageHeader` + standardized containers (Home, Predictions, Premium, Results, Pricing, Login, Register, Forgot Password)
- [ ] 9. Responsive & accessibility polish (focus states, semantic markup, consistent spacing)
- [ ] 10. Build + verify no errors
