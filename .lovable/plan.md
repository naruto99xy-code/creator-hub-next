

## Plan: Admin Panel — Conditional Dual-Tier Pricing for Template/Portfolio + Savings Display

### What's Already Working
The product detail page **already shows "Save ₹X"** on both Premium Code and Live Site cards (lines 250-252 and 299-301). The savings are calculated from `original_price - price` and `live_site_original_price - live_site_price`.

### What Needs to Change
The admin panel currently shows a single generic "Price" field when Premium is toggled on. For **Template** and **Portfolio** content types, it should show the full dual-tier pricing so admins can set the original prices (which drive the savings calculation).

### Changes

**`src/components/admin/MaterialForm.tsx`** — Update the Premium toggle section (lines 241-253):

When `is_premium` is ON and `content_type` is "Template" or "Portfolio":
- Replace the single Price field with a grid of 4 fields:
  - **Premium Code Price** → `price`
  - **Original Price** (strikethrough display) → `original_price`
  - **Live Site Price** → `live_site_price`
  - **Live Site Original Price** → `live_site_original_price`
- Show calculated savings preview text below each pair (e.g., "Savings: ₹21") so admin can see what customers will see

When `is_premium` is ON and content type is anything else:
- Keep the existing single "Price" field (no change)

### No other files need changes
The ProductDetail page already calculates and displays savings correctly. This is purely an admin UX improvement to make it easy to set the prices that drive the savings display.

