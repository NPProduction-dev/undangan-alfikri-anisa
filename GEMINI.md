# GEMINI.md - Change Log & Notes

## Project Overview
Digital Wedding Invitation (Undangan Pernikahan Digital) for **M. Alfikri & Anisa Rahmadini** with a modern Minangkabau theme, inspired by Indoinvite UX.

## Log of Changes

### [2026-07-29] Initial Setup & Artwork Generation
- Created directory structure (`css`, `js`, `assets/images`).
- Generated high-quality watercolor artwork using AI:
  - `rumah_gadang.png`: Minangkabau Rumah Gadang palace watercolor illustration with gold accents & white flowers.
  - `minang_couple.png`: Minang bride & groom watercolor illustration with traditional Suntiang crown.
  - `bride_profile.png`: Anisa Ramadini portrait illustration.
  - `groom_profile.png`: M. Alfikri portrait illustration.
- Created `implementation_plan.md` and `task.md` planning artifacts.

### [2026-07-29] Integration of Actual Bride & Groom Photos & Indoinvite Structure Refinement
- Copied uploaded passport photos (`media__1785324463383.png` & `media__ media__1785324463390.png`) to `assets/images/groom_photo.png` and `assets/images/bride_photo.png`.
- Generated `minang_couple_custom.png` using AI image fusion combining both uploaded photos into a romantic Minang bridal artwork.
- Updated `index.html`:
  - Aligned page flow exactly to Indoinvite reference.
  - Integrated actual groom & bride photos in gold-ring floral framed profile cards.
  - Added Islamic crescent moon and lantern vector icons.
  - Updated Wedding Gift section exact wording and copy buttons for BSI (`7186266034`) & DANA (`082386235445`).

### [2026-07-29] Couple Name Order Adjustment (Groom First)
- Updated `index.html`:
  - Changed name display order across title, meta tags, cover overlay, hero section, profile card sequence, and footer to always put **M. Alfikri** (mempelai pria) first: **M. Alfikri & Anisa Ramadini**.

### [2026-07-29] Floating Controls Cleanup, Creator Credit & Audio Adjustment
- Removed second floating link button; retained only audio play/pause floating button.
- Updated background audio source to the user's uploaded song **`Shane Filan - Beautiful In White (Official Video).mp3`** in `assets/audio/`.
- Removed sample default wishes from `js/app.js` so the wishes list starts clean.
- Fixed groom photo positioning in CSS (`object-position: center top`) so the peci (black hat) is not cut off.

### [2026-07-29] Event Title Change & Footer Tagline Cleanup
- Updated `index.html`:
  - Changed second event title from "Acara Syukuran" to **Tasyakuran Pernikahan**.
  - Removed tagline text `"Undangan Pernikahan Digital Adat Minangkabau Modern"` from the footer as requested.

### [2026-07-29] Closing Section Wording & Layout Update
- Updated `index.html`:
  - Reformatted Penutup section with exact quote, gold star divider (`──────── ✦ ────────`), Islamic wedding blessing (*"Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair."*), and *"Kami yang Berbahagia"* heading.

### [2026-07-29] Total Redesign of Cover Overlay (Halaman Pembuka Premium)
- Redesigned `#cover-overlay` in `index.html` and `css/style.css`:
  - Retained core elements (`THE WEDDING OF`, artwork, `M. Alfikri & Anisa Ramadini`, guest card, open button).
  - Integrated 4-corner SVG Minangkabau gold floral ornaments (`.cover-corner-ornament`).
  - Implemented **Double Gold Frame** for couple artwork with gold gradient outer ring, dashed inner ring, floating animation, and animated gold sparkles (`✦`).
  - Added radial ambient gold glow behind artwork.
  - Upgraded guest card to deluxe glassmorphism card (`backdrop-filter: blur(16px)`) with gold foil border and subtle drop shadows.
  - Added gold shimmer sweep animation (`::before`) and gold aura pulse to "Buka Undangan" button.
  - Implemented smooth staggered entrance animation sequence (`fadeInDown`, `zoomInFrame`, `fadeInUp`, `slideUpCard`).

### [2026-07-29] Footer Branding Link Update (Crafted by NP Digital Invitation)
- Updated `index.html` and `css/style.css`:
  - Replaced creator badge with subtle, elegant link: **Crafted by NP Digital Invitation** wrapped inside an `<a>` tag.
  - Set target link to WhatsApp (`https://wa.me/6287781752626`) with pre-filled message template requesting invitation packages & pricing.
  - Configured `target="_blank"` and `rel="noopener noreferrer"`.
  - Added subtle gold typography, cursor pointer, and elegant hover text-shadow & dashed gold underline effect.

### [2026-07-29] Navigation Overhaul (Manual Scroll Snap & Optional Auto Play Mode)
- Disabled default auto-slide; enabled manual user control by default.
- Implemented CSS Section Scroll Snap (`scroll-snap-type: y mandatory; scroll-snap-align: start;`) so scrolling/swiping always snaps cleanly to section tops without stopping midway.
- Added vertical Side Dot Navigation Bar (`#nav-dots-container`) on right side with tooltips and active dot highlights via `IntersectionObserver`.
- Added floating **Auto Play Toggle Button** (`#btn-autoplay-toggle`) with glowing blue pulse animation when active.
- Configured 8-second smooth auto-slide interval when Auto Play is enabled.
- Implemented **Auto-Stop on User Interaction**: Auto Play stops instantly if user scrolls, swipes, presses navigation keys, or clicks a navigation dot.

### [2026-07-29] Custom Minang Bridal Photo Update for Cover Overlay
- Copied uploaded high-res couple artwork (`media__1785326906337.jpg`) featuring M. Alfikri & Anisa Ramadini in full traditional Minang attire with ornate gold Suntiang crown & Rumah Gadang background to `assets/images/minang_couple_cover.jpg`.
- Updated `#cover-overlay` image src in `index.html` to display the new custom Minang bridal portrait.

### [2026-07-29] Bride Name Spelling Fix (Anisa Rahmadini)
- Corrected bride's name spelling from `Anisa Ramadini` to **`Anisa Rahmadini`** (added letter 'h') across all files:
  - `index.html`: Meta tags, Cover overlay header, Hero section, Profile card, and Footer.
  - `js/app.js`: Script header commentary.
  - Updated `GEMINI.md` project log.

### [2026-07-29] GitHub Pages Deployment Readiness & CI/CD Setup
- Verified all asset paths in `index.html`, `css/style.css`, and `js/app.js` use 100% relative paths.
- Created `.nojekyll` to bypass Jekyll static generator processing on GitHub Pages.
- Created `.gitignore` to exclude system files and temporary logs.
- Created `.github/workflows/deploy.yml` for automated GitHub Actions deployment to GitHub Pages upon pushing to the `main` branch.

### [2026-07-29] Cover Subtitle Update (TASYAKURAN PERNIKAHAN)
- Updated `index.html`:
  - Replaced sub-heading `"THE WEDDING OF"` on the cover screen (`#cover-overlay`) with **`"TASYAKURAN PERNIKAHAN"`**.
  - Updated `og:title` meta tag to `"Tasyakuran Pernikahan Alfikri & Anisa"`.
