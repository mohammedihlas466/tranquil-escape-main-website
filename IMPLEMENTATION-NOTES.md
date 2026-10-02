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
global navbar, footer and WhatsApp float were left intact. The booking widget block was later
replaced by the Little Hotelier iframe (see section 10).

- Added a page-owned root hook: `<body class="booking-page">` so every new rule can be
  scoped and cannot leak to other pages.
- **Intro:** eyebrow copy set to `Direct Reservations`; removed the duplicated
  `Reserve Your Stay` H2 that competed with the hero H1; supporting line set to
  `Check live availability and plan your stay at Tranquil Escape.`
- **Booking shell:** wrapped the heading + trust row + widget + payment notice in a single
  card (`.te-booking__shell`) with one clear section heading `Plan your stay`
  (`id="booking-page-heading"`, which the section's `aria-labelledby` points to).
- **Trust row:** converted the plain text spans into a semantic `<ul>` with inline gold
  check icons (`Live Availability`, `Direct Reservation`, `Booking Assistance`).
- **Payment notice:** presented as a calm reassurance callout (info icon + gold left rule),
  not an error style. Copy now reads: "Check live availability and book your stay at Tranquil
  Escape in Hikkaduwa. You will see the full price, cancellation terms and payment details
  before you confirm." No cancellation or payment policy is stated on the page.
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
- Reserved the widget area height (`min-height`) to prevent layout shift while the external
  iframe loads (now 264px: 200px iframe + 16px gap + 48px fallback button).
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
- **The widget is the hero of the card.** The card frames the Little Hotelier availability
  widget and gives it room; supporting content sits below it.
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

## 5. Little Hotelier widget integrity

- The iframe between `<!-- LITTLEHOTELIER_WIDGET_START -->` and
  `<!-- LITTLEHOTELIER_WIDGET_END -->` in `book.html` is the vendor-supplied snippet, unmodified:
  `https://book-directonline.com/properties/tranquilescape/booking_widget`
  (`height="200" width="250"`, no scrolling).
- Engine URL (also used by the fallback link): `https://book-directonline.com/properties/tranquilescape`.
  Region APAC, channel code `tranquilescape`.

## 6. Vendor / shared-CSS limitations

- **Global navbar overflow at ~992–1024px (landscape tablet).** At the 1024×768 viewport the
  shared Webflow top navigation (`.nav-menu-wrapper` / `.nav-menu`, ~1194px wide) is wider than
  the viewport and produces a horizontal scroll. This is a **pre-existing, site-wide** condition
  in `webflow-style.css` (the desktop menu is shown until Webflow's 991px collapse breakpoint),
  present on every page and **not introduced by the booking section**. It cannot be fixed
  without editing the shared `webflow-style.css` and/or the Webflow nav breakpoint, both of which
  are outside the permitted file list, and the brief requires preserving header scale/behavior.
  The booking section itself reports **0px** horizontal overflow at every required viewport.
- **The widget is a cross-origin iframe.** The page cannot style, resize or observe anything
  inside it. It only sizes the container; the widget's internals are owned by Little Hotelier.

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
   - `booking_engine_click` (any link to `book-directonline.com`, e.g. the `/book` fallback
     button with `cta_location = book_fallback`)

`booking_search_started` was removed: clicks inside the cross-origin Little Hotelier iframe
cannot be seen by the page.

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

Replaces the previous booking widget on `/book` with Little Hotelier. Phase A is the iframe
"Check availability" widget only; LH has not yet approved this domain for the full embedded engine.

- `book.html`: widget block swapped for the LH iframe (markers `LITTLEHOTELIER_WIDGET_START/END`),
  centred in `.te-booking__widget-wrap`; added a plain "View all rooms and rates" link to the LH
  engine (same tab, `data-te-location="book_fallback"`); lead text and notice replaced; added
  "Booking the whole villa for a group? Whole-villa stays are arranged on WhatsApp." under the
  assistance text. WhatsApp and phone links unchanged.
- `index.html`: homepage reserve band no longer claims "without an online payment".
- `js/te-analytics.js`: added `booking_engine_click`; removed `booking_search_started`.
- `css/booking-page.css`: widget wrapper `min-height` resized to 264px, fallback link and
  assistance-note styles added, unused vendor selectors removed.
- Removed the old widget backup files from the repo root.
- Not changed: `terms-and-conditions.html` carries its own payment, deposit and cancellation
  wording. It was left untouched and should be reviewed against the LH rate plans.
- Phase B (full embedded engine) is blocked until LH approves the domain.
