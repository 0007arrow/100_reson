# 100 Reasons I Love You — For Azra Baby 💖

A romantic, personalized web experience built with love for **Azra Baby**. Features a glassmorphic reasons deck, an interactive antigravity floating photo field with 3D parallax, touch swipe gestures, favorites system, and a celebration finale with confetti and a heart-shaped photo constellation.

---

## ✨ Features

- **Antigravity Floating Photos**: Polaroids drift weightlessly in 3D space with parallax response to mouse movements (desktop) and device tilt (mobile gyroscope).
- **Interactive Lightbox**: Tapping any floating photo zooms it into a center polaroid lightbox with its caption.
- **Dynamic Swirl**: Every time a reason is turned, a romantic breeze gently swirls the surrounding photos.
- **Zero-Photo Fallback**: Works gracefully even before adding photos with beautiful, animated romantic cards.
- **100 Curated Reasons**: Crafted specifically for Azra Baby with categories like *Your Warmth*, *Sweet Quirks*, *Inside Jokes*, and *Everyday Magic*.
- **Touch & Gesture Friendly**: Swipe left/right on mobile, use arrow keys on desktop, or tap the large navigation buttons.
- **Favorites System**: Tap the heart icon on any reason to save it; view all saved reasons in the dedicated favorites drawer.
- **Grand Finale**: Completing reason #100 triggers a heart-particle confetti shower, photos converge into a giant heart constellation, and reveals your personal love note.
- **Optional Background Music**: Place any romantic song at `audio/song.mp3` and a music button automatically appears.

---

## 📸 How to Add Her Photos

1. **Drop Photos**: Copy her photos (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`) into the `photos/` folder:
   ```
   love-site/photos/
   ├── our_first_date.jpg
   ├── laughing_at_cafe.png
   └── trip_together.webp
   ```
   *Tip: Name files nicely (e.g., `our_first_trip.jpg`) and the scanner will automatically format them into clean captions like `"Our First Trip"`.*

2. **Scan & Generate**:
   Open a terminal in the project directory and run:
   ```bash
   npm run photos
   ```
   This automatically updates `js/photos.js` with all photos and captions.

3. **Refresh the Browser**:
   Open or reload the website to see her photos floating in the antigravity field!

---

## 🎵 How to Add Background Music (Optional)

1. Rename your favorite song to `song.mp3`.
2. Place it in the `love-site/audio/` folder:
   ```
   love-site/audio/song.mp3
   ```
3. When the site detects `audio/song.mp3`, a music button will automatically appear in the top-right corner. (Music is muted by default to respect browser autoplay policies; she can tap it to play!).

---

## 🚀 Running Locally

You can open the site locally using any static web server:

### Option A: Using npm / npx (Recommended)
```bash
npm start
```
or:
```bash
npx serve love-site
```

### Option B: Using Python
```bash
cd love-site
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

### Option C: VS Code Live Server
Right-click `love-site/index.html` and click **"Open with Live Server"**.

---

## 🌐 How to Deploy & Share with Her

Because this is 100% vanilla HTML, CSS, and JavaScript, you can host it anywhere for free:

### 1. GitHub Pages (Free)
1. Push this folder to a GitHub repository.
2. In your repo settings, go to **Pages**.
3. Under **Branch**, select `main` and set the folder to `/love-site` (or root).
4. Click **Save**. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### 2. Netlify (Drag & Drop — Fastest!)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `love-site` folder directly into the browser.
3. You get an instant shareable link in 10 seconds!

### 3. Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel love-site` and follow prompts.

---

## ✍️ Customizing Reasons

All 100 reasons are in `love-site/js/reasons.js`. You can easily edit any reason or category:

```javascript
{
  id: 1,
  tag: "Your Warmth",
  text: "The radiant warmth of your smile..."
}
```

---

Made with endless love for **Azra Baby** ♥

