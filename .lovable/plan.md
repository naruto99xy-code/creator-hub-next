

# MYRA 2.0 Features Section for /ai Page

## Overview
Create a new `Myra2FeaturesSection` component and insert it into the `/ai` page between the "Intro" section and the "AI Products" section. This showcases 66+ features grouped into 13 categories with premium glassmorphism cards, glow effects, and scroll animations.

## New File

### `src/components/ai/Myra2FeaturesSection.tsx`

A self-contained component containing:

**Header area:**
- Title: "MYRA 2.0 Can Do Everything"
- Subtitle: "70+ Powerful AI Capabilities to Control Your Entire System with Intelligence"
- Animated "66+ Features" badge with pulsing purple/blue glow border

**Feature data structure:**
- An array of 13 category objects, each with a `category` name, a `color` (purple/blue/cyan spectrum), and a `features` string array
- Categories: Core, Window Control, WhatsApp, Memory, Utils, Mouse & Keyboard, Image Tools, Creative, Screen Reader, System, Desktop, Media Control, PDF Tools, Window Manager

**Category rendering:**
- Each category gets a heading row with a small colored dot indicator + category name
- Below it, a responsive grid of feature cards (4 columns desktop, 2 tablet, 1 mobile)
- Each feature card is a glassmorphism mini-card (backdrop-blur, semi-transparent bg, border glow on hover)
- Cards use `framer-motion` for fade-in on scroll (`whileInView`) and scale-up on hover (`whileHover: { scale: 1.05 }`)
- A subtle animated gradient divider separates each category group

**Visual effects:**
- Background: reuse the same subtle radial gradient blobs (purple/blue) as existing sections
- Cards: `bg-white/5 backdrop-blur-md border border-white/10` with hover state `border-purple-500/40 shadow-[0_0_20px_rgba(139,92,246,0.3)]`
- Badge: `animate-pulse` shadow with purple glow
- Each feature card shows a small lucide icon (a generic one like `Cpu` or `Terminal`) + feature name

## Modified File

### `src/pages/AI.tsx`
- Import `Myra2FeaturesSection` from `@/components/ai/Myra2FeaturesSection`
- Insert `<Myra2FeaturesSection />` between the Intro section and the AI Products section (after line 300, before line 302)
- No other changes -- hero, intro, and product cards remain untouched

## Technical Details

- All animations use `framer-motion` (`motion.div` with `initial`, `whileInView`, `whileHover`)
- Responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Lucide icons used per-category (e.g., `Search` for Core, `Monitor` for Window Control, `MessageCircle` for WhatsApp, `Brain` for Memory, `Mouse` for Mouse & Keyboard, etc.)
- No new dependencies required
- Component is modular and isolated -- no impact on other pages

