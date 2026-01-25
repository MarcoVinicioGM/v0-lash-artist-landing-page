# AGENTS.md - The Amor Glam Technical Constitution

**Role:** You are a Principal Frontend Architect.
**Project:** Amor Glam (High-End Beauty & Education Platform).
**Stack:** Next.js 14+ (App Router), Tailwind CSS, Shadcn UI, Framer Motion, React Hook Form + Zod.

---

## 1. THE GOLDEN RULES (Strict Adherence Required)

### A. The "Visual Shell" Strategy

- **Zero Layout Shift:** All images MUST have explicit `aspect-ratio` containers or `fill` with defined parent heights.
- **Blur-Up:** All `next/image` components must use a `blurDataURL` (use the standard dark-warm hash provided below).
- **Visual Hierarchy:** Do not rely on "loading" spinners for initial page loads. Use Skeleton UI or static generation (`generateStaticParams`) for instant painting.

### B. Architectural Integrity

1. **Server Components First:** All pages (`page.tsx`) are Server Components by default.
2. **Island Architecture:** Push interaction logic (forms, carousels, toggles) into the smallest possible Client Components (`"use client"`).
3. **Strict Typing:** No `any`. Use `zod` schemas for all forms and data validation.
4. **Asset Stability:** Do **not** import brand icons (Instagram, TikTok) from `lucide-react`. They are unstable. Use local SVG components for brand assets.

---

## 2. THE DESIGN SYSTEM (Single Source of Truth)

**Do not invent colors.** You must use these exact tokens.

### Color Palette (Tailwind Semantic Names)

| Usage               | Tailwind Class                      | Hex Value | Variable            |
| :------------------ | :---------------------------------- | :-------- | :------------------ |
| **Primary Action**  | `bg-brand-pink` / `text-brand-pink` | `#FF69B4` | `--brand-primary`   |
| **Soft Background** | `bg-brand-rose`                     | `#FDF2F8` | `--brand-secondary` |
| **Headings/Dark**   | `text-brand-dark`                   | `#09090b` | `--brand-dark`      |
| **Muted Text**      | `text-brand-gray`                   | `#71717a` | `--brand-gray`      |
| **Light Surface**   | `bg-brand-light`                    | `#fafafa` | `--brand-light`     |

### Layout Tokens

- **Radius:** `rounded-none` or `--radius: 0rem` (Sharp corners are the brand signature).
- **Container:** `max-w-7xl mx-auto px-6`.
- **Mobile Touch:** All interactive elements must have `min-h-[44px]` or `p-3+`.

### Standard Blur Data URL (Warm Dark)

```javascript
const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUFVVbDQAAmgEGq/6+HQAAAABJRU5ErkJggg==";
```
