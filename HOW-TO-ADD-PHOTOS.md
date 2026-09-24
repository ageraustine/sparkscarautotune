# Adding gallery photos (no code required)

This folder structure goes inside the `images` subdomain you created in cPanel
(`images.sparkscarautotune.co.ke`), in its document root — the same folder
shown when you set up the subdomain.

## One-time setup

1. In cPanel **File Manager**, open the `images` folder (the subdomain's document root).
2. Upload `.htaccess` into that folder (this file — enables the website to read from here).
3. Create a folder inside it called `gallery`.
4. Upload `gallery.json` into the `images` folder (NOT inside `gallery/` — it stays at the top level, next to the `gallery` folder).

You should end up with:
```
images/                  (document root of the subdomain)
├── .htaccess
├── gallery.json
└── gallery/
    ├── axio-before.jpg
    ├── axio-after.jpg
    └── ...
```

## Adding a new before/after job

1. Rename your two photos clearly, e.g. `civic-before.jpg` and `civic-after.jpg` (no spaces — use hyphens).
2. Upload both into the `gallery/` folder via File Manager.
3. Open `gallery.json` in File Manager (right-click → **Edit**, or the "Code Editor").
4. Add a new entry to the list, following the same pattern as the example already there. Every entry except the last one needs a comma after its closing `}`:

```json
[
  {
    "title": "Toyota Axio – accident repair",
    "before": "gallery/axio-before.jpg",
    "after": "gallery/axio-after.jpg"
  },
  {
    "title": "Honda Civic – full respray",
    "before": "gallery/civic-before.jpg",
    "after": "gallery/civic-after.jpg"
  }
]
```

5. Save. Refresh the Gallery page on the live website (`sparkscarautotune.co.ke/gallery.html`) after a minute — your new before/after pair will appear automatically. No GitHub, no redeploying, nothing else to touch.

## Tips

- Newest entries can go at the top or bottom of the list — whichever order you want them to appear on the site.
- Keep photo file sizes reasonable (under ~1–2MB each) so the gallery loads quickly — most phone cameras produce files larger than needed for the web.
- If a photo doesn't show up, double-check: the filename in `gallery.json` matches the uploaded file exactly (including capitalization), and there's no missing comma or bracket in the JSON.