

## Plan: Fix file_url redirect for materials + ensure consistent behavior

### Problem
The security fix removed `file_url` from the `get_public_materials` RPC, so materials always have `file_url: null` in Shop. This breaks the redirect-to-file feature for materials.

Meanwhile, products fetch `file_url` directly from the table (bypassing `get_public_products` RPC), which works but is inconsistent.

### Solution

**1. Database migration — Add `file_url` to `get_public_materials` RPC**
- Update the `get_public_materials` function to include `file_url` in its return columns
- This is safe because `file_url` is just a download/redirect link, not source code (the sensitive fields are `html_code`, `css_code`, `js_code` which remain excluded)

**2. `src/pages/Shop.tsx` — Use actual `file_url` from materials**
- Remove the `file_url: null` override on line 100
- Map `m.file_url` from the RPC result instead

**3. No changes needed for:**
- `src/hooks/useRazorpay.ts` — already passes `fileUrl` correctly
- `src/pages/Success.tsx` — already handles `file_url` param with Telegram fallback

### Files affected
- New migration SQL (update `get_public_materials` function)
- `src/pages/Shop.tsx` (one line change)

### Behavior after fix
| Scenario | Result |
|----------|--------|
| Free + file_url filled | Instant redirect to file_url |
| Free + file_url empty | Redirect to /success → Telegram |
| Paid + file_url filled | Payment → /success → redirect to file_url |
| Paid + file_url empty | Payment → /success → redirect to Telegram |

