# Rachel's Personal Website

Clean, editorial-style personal website with muted green/beige aesthetic inspired by Offrange. Features a vertical stack of sections with alternating colors.

## Quick Start

### 1. Open in Cursor
- Put all these files in a folder
- Open the folder in Cursor

### 2. Preview
**Using Live Server extension:**
- Right-click on `index.html`
- Choose "Open with Live Server"

**Or use Terminal:**
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser

### 3. Customize Content

Replace placeholder text in each HTML file with your own content.

**Navigation:**
- Only "About" appears in the top right
- All other sections are accessed by clicking the boxes on the home page

**Color Scheme:**
The boxes alternate between two colors:
- Pale green: `#A5B59D`
- Beige: `#EEEBE3`

Edit `style.css` lines 1-8 to change colors.

**Adding Images to Boxes:**
In `index.html`, uncomment the image line in any card:

Change:
```html
<!-- <img src="your-image.jpg" alt="Films" class="card-image"> -->
```

To:
```html
<img src="your-image.jpg" alt="Films" class="card-image">
```

Put your images in the same folder as your HTML files.

### 4. Deploy

**Netlify (easiest):**
1. Drag your entire folder to [netlify.com/drop](https://netlify.com/drop)
2. Done!

**Vercel:**
1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)

**GitHub Pages:**
1. Push to GitHub
2. Settings > Pages > Select main branch

## File Structure
```
.
├── index.html       # Home page with vertical stack
├── music.html       # Music page
├── films.html       # Films page
├── reading.html     # Reading page
├── recipes.html     # Recipes page (NEW!)
├── essays.html      # Essays page
├── writing.html     # Writing page
├── links.html       # Links page
├── about.html       # About page
├── style.css        # All styles
└── README.md        # This file
```

## Layout

The home page features 7 sections stacked vertically:
1. Films (green)
2. Reading (beige)
3. Music (green)
4. Recipes (beige)
5. Essays (green)
6. Writing (beige)
7. Links (green)

Each section is clickable and takes you to that page.

## Tips

- All pages use the same `style.css` - edit once, changes everywhere
- The design is clean and minimal - no grid, just a vertical stack
- Uses Georgia serif font throughout for editorial feel
- Mobile responsive automatically
- Add images to make it look like Offrange!

Enjoy!
