

## Plan: Product Detail Page for Templates & Portfolio

### Overview
When users click a Template or Portfolio product in the Shop, instead of the payment modal, they'll navigate to a detailed product page (like the reference image) with: product image/video preview, description, "What's Included" list, and two pricing tiers ("Premium Code" & "Live Site").

### Database Changes (Migration)

Add new columns to `materials` table:
- `original_price` (numeric, default 0) — strikethrough price for Premium Code
- `live_site_price` (numeric, default 0) — Live Site option price
- `live_site_original_price` (numeric, default 0) — strikethrough price for Live Site
- `live_site_file_url` (text, nullable) — redirect URL after Live Site purchase
- `whats_included` (text[], nullable) — checklist items shown on detail page
- `premium_features` (text[], nullable) — Premium Code features list
- `live_site_features` (text[], nullable) — Live Site features list
- `premium_note` (text, nullable) — yellow note under Premium Code price
- `live_site_note` (text, nullable) — yellow note under Live Site price

Update `get_public_materials` RPC to include these new fields.

### New Files

**`src/pages/ProductDetail.tsx`** — The detail page:
- Fetches material by ID from `get_public_materials` RPC (or direct admin query)
- Left side: product image with YouTube video autoplay on hover (using `youtube_url` field), "Live Demo" button
- Right side: category badge, title, description, "What's Included" checklist, two pricing cards
- Each pricing card: price with strikethrough original, "Limited Offer" badge, savings calculation, note text, feature checklist, "Order" button
- Order buttons open the existing `PaymentModal` with appropriate price/fileUrl
- Back to Products link at top

### Modified Files

**`src/App.tsx`**
- Add route: `/shop/:id` → `ProductDetail`

**`src/pages/Shop.tsx`**
- For Templates & Portfolio categories: clicking a product card navigates to `/shop/${product.id}` instead of opening PaymentModal
- Other categories keep current behavior (direct PaymentModal)

**`src/components/admin/MaterialForm.tsx`**
- Add new "Detail Page" tab with fields for: original_price, live_site_price, live_site_original_price, live_site_file_url, whats_included, premium_features, live_site_features, premium_note, live_site_note
- Text arrays entered as comma-separated values

**`src/components/admin/MaterialsSection.tsx`**
- Pass new fields when saving materials

### Video Hover Behavior
- Product image shown by default
- On mouse hover over the image area: embed YouTube iframe with autoplay
- On mouse leave: hide iframe, show image again
- "Live Demo" button below image also triggers video play

### Payment Flow (unchanged logic)
- "Order Premium Code" → opens PaymentModal with `price` and `file_url`
- "Order Live Site" → opens PaymentModal with `live_site_price` and `live_site_file_url`
- After payment, existing Success page handles redirect

