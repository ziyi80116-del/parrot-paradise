# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

鹦鹉乐园 (Parrot Paradise) — a static multi-page website introducing three pet parrots with photos, care guides, and videos. Designed as an Awwwards-level responsive site with a warm, modern-minimal aesthetic. **No build tools, no framework** — pure HTML/CSS/JS, open `index.html` directly in a browser.

## Architecture

```
index.html          # Homepage — full-screen card waterfall for all 3 parrots
fukang.html         # 福康 detail (Monk Parakeet, 8 content sections)
jinji.html          # 金吉 detail (Cockatiel, 8 content sections)
pinganxile.html     # 平安喜乐 detail (Lovebirds, includes family tree for 2 parents + 6 babies)
about.html          # About me — social accounts (小红书/抖音)
css/style.css       # All styles: design tokens, layout, responsive, animations (~780 lines)
js/main.js          # All interactivity: nav scroll, hamburger, lightbox, video modal, scroll animations
images/             # Parrot photos organized by subfolder (fukang/ jinji/ pinganxile/)
videos/             # Videos excluded from git — stored locally only
```

## Key Design Patterns

### CSS Design System (css/style.css)
All visual properties use CSS custom properties defined in `:root`:
- **Colors**: `--cream-white`, `--cream`, `--warm-apricot`, `--mint-green`, `--wood-brown`, `--deep-brown`
- **Spacing**: Scale from `--space-xs` (4px) to `--space-3xl` (64px)
- **Radius**: `--radius-sm` (8px) to `--radius-full` (9999px)
- **Transitions**: `--ease-out-expo`, `--ease-out-quint` easing functions; 3 duration tokens
- **Z-index**: `--z-nav` (100), `--z-overlay` (200), `--z-modal` (300)

Responsive breakpoints: **768px** (tablet — cards go vertical, hamburger appears) and **480px** (mobile — tighter spacing, smaller text, single-column grids).

### JS Behavior (js/main.js)
All scripts run on `DOMContentLoaded`, initialized only if target elements exist (safe for any page):
- **Scroll animation**: `IntersectionObserver` watches `.fade-in` and `.stagger-children` elements, adds `.visible` on intersection
- **Lightbox**: Gallery images wrapped in `.gallery-item` trigger the `.lightbox` overlay; any element with `data-lightbox` attribute also works
- **Video modal**: Elements with `data-video="path/to/video.mp4"` open the `.video-modal` overlay with HTML5 `<video>` player
- **Nav scroll**: `.nav` gets `.scrolled` class after 50px scroll (adds background opacity)
- **Hamburger**: Toggles `.active` on `.hamburger` and `.mobile-menu`; locks body scroll

### Page Structure Convention
Every detail page follows the same pattern:
1. `<nav class="nav">` + `<div class="mobile-menu">` — identical across all pages, only `class="active"` differs
2. `<section class="page-header fade-in">` — back link + title
3. Multiple `<section class="content-section fade-in">` — each has `<h3>` with emoji icon, then one of: `info-grid`, `gallery`, `care-tips`, `highlight-box`
4. `<div class="lightbox">` + `<div class="video-modal">` — at end of body
5. `<button class="back-to-top">` + `<footer class="footer">`

## Deployment

- **Live URL**: `https://ziyi80116-del.github.io/parrot-paradise/`
- **GitHub repo**: `ziyi80116-del/parrot-paradise` (GitHub Pages, branch `main`, root directory)
- **Videos are NOT in the repo** (files too large for GitHub Pages). To add video support, upload videos to Bilibili/YouTube and embed iframe links in the video sections.

## Editing Conventions

- The `.nav`, `.mobile-menu`, `.lightbox`, `.video-modal`, `.back-to-top`, and `.footer` blocks must be kept **identical** across all 5 HTML pages (only the `class="active"` on the current page's nav link changes)
- When adding a new content section, pick from the predefined CSS patterns: `info-grid` (cards with label/value), `gallery` (image grid → lightbox), `care-tips` (tip cards with icons), `highlight-box` (gradient quote box), `video-card` (thumbnail → video modal)
- All content sections should carry `fade-in` class for scroll-triggered animation
- Gallery images must be inside `.gallery-item` divs to wire up the lightbox
- Video cards need `data-video="path/to/video.mp4"` attribute to wire up the modal player

## Image/Video Sources

Original source materials (not in git, only for reference):
- `福康/` — Word doc + 5 photos + 2 videos for 福康
- `金桔/` — Word doc + 4 photos + 1 video for 金吉 (note: folder name uses 桔, site uses 吉)
- `平安喜乐/` — Word doc + 4 photos + 1 video for 平安喜乐
