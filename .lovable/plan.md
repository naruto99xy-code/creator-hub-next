

## Plan: File URL Redirect After Purchase (with Telegram Fallback)

### Logic
- If product/material has a `file_url` → redirect to that URL (free: instant, paid: after payment success)
- If product/material has NO `file_url` → redirect to Telegram (current behavior via `/success` page)

### Changes

**1. `src/pages/Shop.tsx`**
- Add `file_url` to the `Product` interface
- Fetch `file_url` from both `products` and `materials` queries
- Free product with `file_url`: redirect directly to `file_url` (skip success page)
- Free product without `file_url`: redirect to `/success` page (which goes to Telegram)
- Paid product: pass `file_url` as param to `handlePurchaseWithDetails`

**2. `src/hooks/useRazorpay.ts`**
- Add `fileUrl?: string` to `PurchaseOptions` interface
- Append `&file_url=...` to the `/success` redirect URL when `fileUrl` is provided

**3. `src/pages/Success.tsx`**
- Read `file_url` from URL search params
- If `file_url` exists: countdown redirects to `file_url` instead of Telegram
- If `file_url` is empty/missing: countdown redirects to Telegram (current behavior, unchanged)
- Update the manual button text accordingly ("Open File" vs "Open Telegram")

### No database changes needed
Both `products` and `materials` tables already have `file_url` columns.

### Security Note
The `products` table query currently excludes `file_url` via `get_public_products()` function for security. We will fetch `file_url` directly since it's needed for redirection. For materials, `file_url` is already accessible.

