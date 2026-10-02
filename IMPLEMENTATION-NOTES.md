# Tranquil Escape — Direct Booking Page Recovery

**Scope:** Refine the `/book` direct-booking experience into a world-class, mobile-first
booking page, following Aman/Four Seasons *principles* (calm, editorial, generous
whitespace, restrained gold accent) — no copied assets.

**Files changed (only these two):**

1. `book.html` — booking-section markup only (page body class + intro/shell/trust/notice/assist).
2. `css/booking-page.css` — full page-scoped restyle of the booking page.

No other files were touched. No frameworks or build steps were introduced.

---

## 1. Files changed & why

### `book.html`
All edits are confined to the `<body>` open tag and the `.te-booking` section. The
global navbar, footer and WhatsApp float were left intact. The booking widget was later
replaced by a link to the Little Hotelier engine (see section 10).

- Added a page-owned root hook: `<body class="booking-page">` so every new rule can be
  scoped and cannot leak to other pages.
- **Intro:** eyebrow copy set to `Direct Reservations`; removed the duplicated
  `Reserve Your Stay` H2 that competed with the hero H1; supporting line set to
  `Check live availability and book your stay at Tranquil Escape in Hikkaduwa.`
- **Booking shell:** wrapped the heading + trust row + booking button + payment notice in a single
  card (`.te-booking__shell`) with one clear section heading `Plan your stay`
  (`id="booking-page-heading"`, which the section's `aria-labelledby` points to).
- **Trust row:** converted the plain text spans into a semantic `<ul>` with inline gold
  check icons (`Live Availability`, `Direct Reservation`, `Booking Assistance`).
- **Payment notice:** presented as a calm reassurance callout (info icon + gold left rule),
  not an error style. Copy now reads: "You will see the full price, cancellation terms and
  payment details before you confirm." No cancellation or payment policy is stated on the page.
- **Assistance:** heading `Prefer personal assistance?`; added supporting line
  `Our team is available to help with dates, room options and arrival arrangements.`;
  converted the two links into tappable action cards with icon + action label + number
  (`Message us on WhatsApp` / `Call the property`). WhatsApp and tel targets were preserved
  exactly.

### `css/booking-page.css`
Complete rewrite of the booking-page styles. Highlights:

- Removed the previous `max-width: 100vw` on a padded container (guardrail violation that can
  cause horizontal scroll).
- Hero: added a **refined gradient scrim** (left-weighted + subtle bottom gradient) instead of
  the old hard dark block, and made the hero H1 white + readable with a soft text-shadow.
- Rebuilt trust / notice / assistance with proper hierarchy, ≥14px supporting text, and
  48px+ tap targets with hover / active / focus-visible states.
- Increased desktop scale (wider inner column, larger card padding) so the booking content no
  longer looks underscaled on large screens.
- The booking area is a single centred primary button, so it needs no reserved height and
  causes no layout shift.
- Added mobile gutters (16–20px) and extra bottom padding so the floating WhatsApp button
  never overlaps the assistance cards.

---

## 2. Design decisions

- **One H1 only.** The hero keeps the single `Reserve Your Stay` H1; the booking area now uses
  a single `Plan your stay` H2, eliminating the previous duplicate headline.
- **Editorial calm.** Gilda Display is retained; color is used sparingly — warm cream canvas,
  a white booking card, and gold reserved for the top rule, icons, and small accents.
- **Trust without false claims.** Only the three permitted trust points are shown. No
  "Best Rate", "Secure Payment", "Instant Confirmation", or "Free Cancellation" language.
- **The booking button is the hero of the card.** The card frames one solid "Check availability
  and rates" button linking to the Little Hotelier engine; supporting content sits below it.
- **Assistance as clear affordances.** Two bordered action cards with circular icon chips read
  as buttons and clearly separate the primary action label from the phone number.

## 3. Responsive behavior

| Viewport | Result |
|---|---|
| 320 × 568 | No horizontal scroll. Trust points stack vertically; card padding tightened. |
| 390 × 844 | No horizontal scroll. Single-column layout, comfortable gutters, WhatsApp float clears content. |
| 430 × 932 | No horizontal scroll. |
| 768 × 1024 | No horizontal scroll. Trust row in a line; assistance cards side-by-side. |
| 1024 × 768 | Booking content has no overflow. See vendor limitation below (global navbar). |
| 1440 × 900 | No horizontal scroll. Wider column and larger card for desktop presence. |
| 390 × 640 (short) | No horizontal scroll; hero + intro + card proportioned for short heights. |

## 4. Accessibility checks

- **Single H1** (hero) + logical H2s (`Plan your stay`, `Prefer personal assistance?`).
- **Section labelling:** `.te-booking` uses `aria-labelledby="booking-page-heading"`, which
  resolves to the `Plan your stay` heading.
- **Tap targets:** assistance cards are ≥48px tall; icons are decorative (`aria-hidden`).
- **Focus:** visible gold `:focus-visible` outlines on links/cards.
- **Contrast (WCAG AA):**
  - Body `#555`–`#666` on cream `#F8F5F0` ≈ 5.2–5.9:1 (pass).
  - Deep gold `#7C6038` used for all small gold text (eyebrow, phone numbers) on cream/white
    ≈ 5.2–5.4:1 (pass). Brand gold `#AA8453` (≈3.1:1 on cream) is used only for large/decorative
    elements (icons, top rule), never for small body text.
  - Hero white title over the gradient scrim + text-shadow is high-contrast on the darkened side.
- **Reduced motion:** hover/active transitions are disabled under `prefers-reduced-motion`.

## 5. Little Hotelier link

- The booking link in `book.html` sits between `<!-- LITTLEHOTELIER_LINK_START -->` and
  `<!-- LITTLEHOTELIER_LINK_END -->`. Swap that block when the embedded engine is approved.
- Engine URL: `https://book-directonline.com/properties/tranquilescape`.
  Region APAC, channel code `tranquilescape`. The link opens in the same tab and keeps
  `data-te-location="book_fallback"` so analytics stays comparable.

## 6. Vendor / shared-CSS limitations

- **Global navbar overflow at ~992–1024px (landscape tablet).** At the 1024×768 viewport the
  shared Webflow top navigation (`.nav-menu-wrapper` / `.nav-menu`, ~1194px wide) is wider than
  the viewport and produces a horizontal scroll. This is a **pre-existing, site-wide** condition
  in `webflow-style.css` (the desktop menu is shown until Webflow's 991px collapse breakpoint),
  present on every page and **not introduced by the booking section**. It cannot be fixed
  without editing the shared `webflow-style.css` and/or the Webflow nav breakpoint, both of which
  are outside the permitted file list, and the brief requires preserving header scale/behavior.
  The booking section itself reports **0px** horizontal overflow at every required viewport.
- **The Little Hotelier iframe widget cannot be embedded.** Its frame headers
  (`X-Frame-Options: SAMEORIGIN`, `Content-Security-Policy: frame-ancestors 'self'`) make browsers
  refuse to show it on any other site, so it was removed and `/book` is link-only for now.

## 7. `!important` usage

- **None.** `css/booking-page.css` contains no `!important` declarations.

## 8. Visual QA confirmation

A local static server was started (`python3 -m http.server`) and the page was rendered with
headless Chromium (Playwright) at every required viewport: 320×568, 390×844, 430×932, 768×1024,
1024×768, 1440×900, and a short-height 390×640. Each render was **opened and visually
inspected**, and DOM overflow was measured programmatically. Findings: the booking section has
no horizontal overflow at any viewport; hero contrast, hierarchy, spacing rhythm, trust/notice/
assistance styling, and the footer transition all render as intended. The only overflow observed
is the pre-existing global navbar at 1024px, documented above.

---

## 9. SEO / CRO / Search Ads readiness (feature/seo-cro-ads)

### High-intent Ads landing URL
Use: **https://tranquilescapevilla.com/book**

Brand/discovery Ads may use the homepage; booking-intent keywords should not.

### GA4 setup (required before paid traffic)
GA4 Measurement ID is configured in `js/te-analytics.js` as `G-THLJN79RM1`.

Verify in GA4 **DebugView** (or Tag Assistant):
   - `page_view` (automatic)
   - `reserve_cta_click`
   - `whatsapp_click`
   - `phone_click`
   - `booking_engine_click` (any link to `book-directonline.com`, e.g. the `/book` button with
     `cta_location = book_fallback`)

`booking_search_started` was removed: searches happen on the Little Hotelier site, which the
page cannot observe.

Do **not** create a fake `booking_completed` conversion unless Little Hotelier exposes a real confirmation signal.

### Homepage CRO added
- Mid-page reserve band after room cards
- Post-testimonials reserve band
- Header Reserve removed entirely (logo + menu only); page-level closes remain
- Quiet **Book** nav link (same style as other menu items) after Services, before Contact — desktop + mobile drawer; links to `/book`
- Room CTAs: same position on Deluxe + Triple — after Overview/Features, before footer; quieter ghost button
- Services + Facilities: one matching quiet close band; Contact has no Reserve section

### SEO hygiene
- Canonicals on key pages
- Homepage title/description tuned for Hikkaduwa + reserve intent
- JSON-LD `Hotel` schema on homepage
- `/book` intro includes Hikkaduwa + a note that price, cancellation terms and payment details
  are shown before the guest confirms

---

## 10. Little Hotelier booking engine (feature/little-hotelier-booking), Phase A

Replaces the previous booking widget on `/book` with Little Hotelier.

**Phase A (current): link-only.** Little Hotelier's iframe "Check availability" widget is blocked
by its own frame headers (`X-Frame-Options: SAMEORIGIN`, `frame-ancestors 'self'`), so the page
does not embed it. `/book` has one primary button, "Check availability and rates", that opens the
LH engine in the same tab.

**Phase B (later): embedded engine.** Once LH approves this domain for the embedded engine,
replace the block between `LITTLEHOTELIER_LINK_START` and `LITTLEHOTELIER_LINK_END` in `book.html`
with the approved embed, and re-check analytics (an embedded cross-origin frame still hides
in-frame activity from the page).

- `book.html`: LH link wrapped in `LITTLEHOTELIER_LINK_START/END`, inside `.te-booking__widget-wrap`
  (same tab, `data-te-location="book_fallback"`); lead text ("Check live availability and book
  your stay...") and notice ("You will see the full price, cancellation terms and payment details
  before you confirm.") replaced with copy that states no payment or cancellation policy; added "Booking the whole villa for a group?
  Whole-villa stays are arranged on WhatsApp." under the assistance text. WhatsApp and phone links
  unchanged.
- `index.html`: homepage reserve band no longer claims "without an online payment".
- `js/te-analytics.js`: added `booking_engine_click`; removed `booking_search_started`.
- `css/booking-page.css`: `.te-booking__cta` solid deep-gold button (hover, focus-visible, 52px
  tall), centred; assistance-note style added; unused vendor and iframe rules removed.
- Removed the old widget backup files from the repo root.
- Not changed: `terms-and-conditions.html` carries its own payment, deposit and cancellation
  wording. It was left untouched and should be reviewed against the LH rate plans.
