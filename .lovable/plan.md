

## Plan: Modern Admin Materials Panel

### Overview
Create a new "Materials" management section in the admin panel with a 4-tab creation form (Basic, Code, Info, Preview), material listing with search/filter, and full CRUD operations. This adds to the existing Admin page without changing its current layout or functionality.

### Database Changes

**New `materials` table** with columns:
- `id` (uuid, PK), `title`, `content_type`, `description`, `category`, `author`
- `file_url`, `youtube_url`, `image_url`, `tags` (text[]), `software_compatibility` (text[])
- `is_premium` (boolean), `is_featured` (boolean)
- `html_code`, `css_code`, `js_code`
- `html_intro`, `css_intro`, `js_intro`
- `download_count` (default 0), `rating` (numeric, default 0)
- `created_at`, `updated_at`, `user_id` (references auth.users)

**RLS policies**: Admin-only INSERT/UPDATE/DELETE, public SELECT for active materials.

**Storage bucket**: `material-thumbnails` (public) for thumbnail images.

### New Components

1. **`src/components/admin/MaterialForm.tsx`** — The 4-tab form component
   - Tab 1 (Basic): Title, content type, description, category dropdown, author, file URL, YouTube URL, thumbnail upload with drag-and-drop preview, tags input, software compatibility input, premium/featured toggles
   - Tab 2 (Code): Three code textareas styled with monospace font for HTML/CSS/JS
   - Tab 3 (Info): Three textareas for HTML/CSS/JS introductions
   - Tab 4 (Preview): Renders HTML+CSS+JS in a sandboxed iframe, shows placeholder when empty

2. **`src/components/admin/MaterialCard.tsx`** — Card component for material listing
   - Shows thumbnail, title, category, type, downloads, rating, description snippet
   - Edit and Delete action buttons

3. **`src/components/admin/MaterialsSection.tsx`** — Container that combines form + list
   - Search bar, category/type filter dropdowns
   - Grid of MaterialCards
   - Edit mode (loads material data into form)

### Changes to Existing Files

- **`src/pages/Admin.tsx`** — Add a `<MaterialsSection />` below the existing Products/Supporters grid. No existing UI is changed; it's appended as a new section.

### UI Design

- Uses existing dark theme, GlassCard, GlowButton components
- Tabs use Radix TabsPrimitive (already installed) with purple active indicator
- Code textareas use `font-mono` with dark backgrounds
- Cards use glassmorphism styling consistent with the rest of the app
- Responsive: tabs stack vertically on mobile, material cards go from 1 to 2 to 3 columns
- Toast notifications for success/error states

### Technical Details

- Materials saved to the `materials` database table via Supabase client
- Thumbnail uploaded to `material-thumbnails` storage bucket
- Preview tab uses `srcdoc` on a sandboxed iframe
- Search filters client-side on fetched materials
- Edit pre-fills the form; delete shows confirmation
- Form validation: title and content_type are required

