

## Fix: Materials not showing in Templates/Portfolio filter tabs

### Problem
The Shop filter tabs match against `product.category`, but materials have their own `category` field (e.g., "UI Kits", "Other") which doesn't match the tab values "Templates" or "Portfolio". The `content_type` field holds "Template" or "Portfolio" but is never used for filtering.

### Solution
When mapping materials to shop products, use `content_type` as the `category` when it's "Template" or "Portfolio" — so these materials appear under the correct filter tabs.

### File Change

**`src/pages/Shop.tsx`** (line ~104)
- Change the category mapping logic:
  ```typescript
  category: ['Template', 'Portfolio'].includes(m.content_type) 
    ? (m.content_type === 'Template' ? 'Templates' : 'Portfolio')
    : m.category,
  ```
- This ensures materials with `content_type: "Template"` show under the "Templates" tab, and `content_type: "Portfolio"` under the "Portfolio" tab
- All other materials keep using their original `category` field

### Why this works
- The filter tabs use values: `Templates`, `Tools`, `Automation`, `Resources`, `Portfolio`
- Content type "Template" → mapped to "Templates" (plural, matching the tab)
- Content type "Portfolio" → mapped to "Portfolio" (already matches)
- No database changes needed

