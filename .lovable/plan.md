

# Add Missing Indexes + Logo Integration

## 1. Database Migration: Add Missing Indexes

Run a single migration to add the 7 indexes that are documented but missing from the live database:

```sql
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_supporters_created_at ON public.supporters(created_at);
CREATE INDEX IF NOT EXISTS idx_supporters_user_id ON public.supporters(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_memberships_user_id ON public.memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_product_files_product_id ON public.product_files(product_id);
```

Then update `database/supabase-setup.sql` to document all indexes together.

## 2. Add Logo Image to Project

Copy your uploaded logo (the intertwined infinity-style symbol) to:
- `public/logo.png` -- for use as site logo and favicon

### Where the logo will appear:

- **Favicon** -- Update `index.html` to point to `/logo.png`
- **Navbar** -- Replace the current `<Code>` icon in `Navbar.tsx` with the logo image
- **Footer** -- Replace the current `<Code>` icon in `Footer.tsx` with the logo image
- **Profile card on homepage** -- Replace the `profile-avatar.jpg` in the hero section of `Index.tsx` with the logo

### What stays the same:
- No changes to database tables, authentication, or payment logic
- The "Next Developer" text branding stays alongside the logo
- Dark theme styling preserved

## Files Changed

| File | Change |
|---|---|
| `public/logo.png` | New -- copied from upload |
| `index.html` | Update favicon to `/logo.png` |
| `src/components/layout/Navbar.tsx` | Replace Code icon with logo image |
| `src/components/layout/Footer.tsx` | Replace Code icon with logo image |
| `src/pages/Index.tsx` | Use logo in profile card |
| `database/supabase-setup.sql` | Add all new indexes to documentation |

