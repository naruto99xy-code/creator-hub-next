

## Plan: Remove Products Section from Admin Panel

### Overview
Admin panel se Products wala section (Add product form + product list) remove karenge. Sirf Materials section rahega. Stats cards me Products count bhi hata denge.

### Changes

**`src/pages/Admin.tsx`**:
- Remove the Products `GlassCard` (add form + product list) from the left side of the grid
- Remove `products` state, `newProduct` state, `imageFile`, `pricingType`, `imageInputRef`, `showAddProduct` states
- Remove `addProduct`, `deleteProduct` functions and product-related fetch from `fetchData`
- Remove the Products stat card from the stats grid
- Make Supporters card full-width or adjust grid layout
- Keep all imports that are still needed, remove unused ones (Package, Plus, Trash2, Upload, Image, Link, RadioGroup, etc.)

**No database changes** — products table stays as-is, just not managed from this panel anymore.

### What stays unchanged
- Materials section (form, search, filter, cards) — untouched
- Supporters section — stays, just repositioned
- Stats: Supporters, Members, Revenue stay; Products stat removed
- All other pages unaffected

