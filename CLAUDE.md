# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static personal website with a vintage-modern, editorial aesthetic. The site uses plain HTML/CSS/JS with no build tools or frameworks - just vanilla web technologies.

## Running the Site

**Local development:**
```bash
python3 -m http.server 8000
# Then open http://localhost:8000
```

Or use the Live Server extension in your editor (right-click `index.html` → "Open with Live Server").

**Deployment:**
- Drag entire folder to [netlify.com/drop](https://netlify.com/drop)
- Or push to GitHub and deploy via Vercel/GitHub Pages

## Design System & Aesthetic

**Color Palette (CSS variables in `style.css`):**
- `--dark-green: #1A3D3A` - Primary background (dark teal)
- `--light-green: #F5EDD8` - Primary text (warm cream)
- `--accent: #D4AF6A` - Gold accent for highlights and ornaments
- `--medium-gray: #B8A888` - Secondary text

**Typography:**
- Font: "Crimson Text" (serif, loaded from Google Fonts)
- Emphasis on generous spacing, large line-heights (1.7-1.9)
- Drop caps on first paragraphs (`.drop-cap` class)
- Larger first paragraphs for editorial feel

**Visual Style:**
- Vintage-modern aesthetic inspired by haleypark.design
- Decorative sparkle ornaments (✦ and ❋) throughout
- Subtle botanical background patterns (SVG vines, sunflowers)
- Animated squiggly underlines (32s loop)
- Hover effects: transforms, sliding underlines, color shifts (0.4s ease-out)

## Architecture

**Page Structure:**
```
index.html          # Homepage with expandable sections (art, archive, working)
about.html          # Personal bio with drop cap styling
art.html            # Films, music, cool websites (all items link externally)
archive.html        # Books, articles, resources combined
working.html        # Projects + expandable recipes
style.css           # Single global stylesheet for entire site
```

**Key Patterns:**

1. **Expandable Sections** (homepage + recipes):
   - Use `onclick="toggleExpand(this)"` pattern
   - Inline `<style>` blocks for component-specific styling
   - JavaScript toggles `.active` class to show/hide content
   - Max-height transitions for smooth expansion

2. **Animations:**
   - `@keyframes fadeIn` - Page load animations
   - `@keyframes float` - Gentle vertical movement (hero title)
   - `@keyframes pulse` - Pulsing opacity for toggles
   - `@keyframes squiggle` - Animated underlines (200px travel)
   - `@keyframes shimmer` - Opacity shimmer for ornaments

3. **CSS Pseudo-elements:**
   - `::before`/`::after` for decorative sparkles (✦ ❋)
   - Background SVG patterns for botanical textures
   - Hover underlines using positioned pseudo-elements
   - Arrow indicators (→) that fade in on hover

4. **Background Patterns:**
   - `body::before` - Layered botanical SVG patterns (vines, sunflowers)
   - `body::after` - Additional wavy vine pattern
   - Fixed position, very low opacity (0.02-0.03)
   - All content sits above with `z-index: 1`

## Content Guidelines

**External Links:**
- All films/music link to IMDb/Spotify with `target="_blank"`
- Archive articles link to original sources
- Use descriptive, editorial-style descriptions

**Typography Hierarchy:**
- Page titles: 2.5rem with sparkle ornaments on sides
- Section titles: 1rem uppercase with decorative symbol before
- Body text: 1.1rem (first paragraph 1.2rem)
- Drop caps: 4rem, gold color, on first paragraph only

**Spacing:**
- Hero margin: 10rem top, 5rem bottom
- Section margins: 5rem between
- List item padding: 2rem vertical
- Footer margin-top: 10rem

## When Making Changes

**Adding new animations:**
- Define `@keyframes` near other animations (after line 115 in style.css)
- Use 0.4s ease-out for hover transitions
- Use longer durations (3s+) for ambient animations

**Adding hover effects:**
- Combine transform, color, and pseudo-element animations
- Standard pattern: `transition: all 0.4s ease-out`
- Colors shift to `var(--accent)` gold on hover
- Include sliding underlines or arrow indicators

**Maintaining aesthetic:**
- Keep backgrounds dark teal, text warm cream
- Use gold (`--accent`) sparingly for emphasis
- Generous whitespace is essential
- Serif typography throughout (Crimson Text)
- Subtle, slow-moving animations only
