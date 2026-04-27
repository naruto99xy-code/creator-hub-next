## 24-Hour Flash Sale on Individual AI Source Codes

Apply a limited-time discount on the three individual source code products on the `/ai` page (Jarvis 2.0, MYRA 2.0, ARIYA 1.0), priced at ₹3,500 instead of ₹4,500 for the next 24 hours. After the timer ends, prices automatically revert to ₹4,500. A live countdown banner will be shown above the individual cards.

### Scope
- Only the **three individual** source code cards are affected.
- The **Combo (₹6,999)** and **All-3 Bundle (₹9,999)** remain unchanged.

### Sale logic
- **Sale price:** ₹3,500
- **Default price:** ₹4,500
- **Duration:** 24 hours, anchored to a fixed end timestamp set once when this change goes live (so every visitor sees the same countdown and it ends at the same moment globally).
- The end time is stored as a constant in the component file (e.g., `SALE_END = new Date('2026-04-28T...Z')`). When `Date.now() >= SALE_END`, prices automatically display ₹4,500 with no strikethrough and the countdown banner disappears.
- Razorpay charges are based on the price computed at click time, so users who buy during the sale window pay ₹3,500.

### Countdown UI
A prominent banner placed directly above the "Or Buy Individual Source Code" heading:

```text
┌──────────────────────────────────────────────┐
│  🔥 FLASH SALE — ₹1,000 OFF                  │
│  Ends in:  [ 23 ]:[ 59 ]:[ 42 ]              │
│            HRS   MIN   SEC                   │
└──────────────────────────────────────────────┘
```

- Glassmorphic card with the existing site's neon/gradient style (cyan→purple), pulsing glow.
- Three flip-style digit blocks for HH / MM / SS, updating every second via `setInterval`.
- On each individual card, show:
  - Old price `₹4,500` struck through
  - Sale price `₹3,500` in gradient text
  - "Save ₹1,000" badge (already exists, value updated)
  - Small "⏱ Limited time" tag

When the timer hits zero, the banner is replaced by a subtle "Sale ended" line for a few seconds (optional) and prices revert.

### Technical changes
Single file: `src/components/ai/AISourceCodeSection.tsx`
1. Add a `SALE_END` constant (UTC timestamp, exactly 24 h from deploy).
2. Add a `useSaleCountdown()` hook inside the file returning `{ active, hours, minutes, seconds }`, ticking every 1s with cleanup.
3. Update the three entries in `individualProducts` to compute price/originalPrice/savings dynamically based on `active`:
   - active → `price: 3500, originalPrice: 4500, savings: 'Save ₹1,000'`
   - inactive → `price: 4500` (no original, no savings badge)
4. Add a new `<FlashSaleBanner />` component rendered above the individual section, only when `active`.
5. No DB or backend changes needed — pricing is client-driven and passed straight into the existing `handlePurchaseWithDetails` flow.

### Out of scope
- No persistence of the timer per-user (everyone sees the same global countdown).
- No admin UI to change the end time (hard-coded; can be edited later if you want to extend).
