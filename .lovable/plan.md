

## Plan: Normalize AI Prices with ₹100 Discount Only

### What Changes

Set all AI product prices to their "normal" (original) values and apply only a ₹100 discount:

| Product | Original Price | New Selling Price |
|---------|---------------|-------------------|
| Ariya AI ❤️ | ₹899 | ₹799 |
| Jarvis | ₹899 | ₹799 |
| Myra 2.0 | ₹899 | ₹799 |
| Jarvis + Myra Combo | ₹1598 | ₹1498 |
| Zara AI | ₹1599 | ₹1499 (already correct) |
| AI Girlfriend | ₹1799 | ₹1699 |

### Files to Edit

1. **`src/pages/AI.tsx`** — Update `price` and `originalPrice` for all products in the `aiProducts` array
2. **`src/components/shop/AIProductsSection.tsx`** — Update matching prices (Jarvis ₹799, Myra ₹799, Zara stays ₹1499, Ariya ₹799)

### Technical Details

- Each product keeps its `originalPrice` (crossed-out) and gets `price = originalPrice - 100`
- Combo pack original price updates to ₹1598 (sum of two ₹799 items), selling at ₹1498
- Zara AI already has exactly ₹100 difference, so no change needed there

