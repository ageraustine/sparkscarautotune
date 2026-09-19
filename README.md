# SparksCar Auto Tune Ltd — Website

A static, multi-page, mobile-friendly website for SparksCar Auto Tune Ltd (Kahawa Wendani, Nairobi), built with plain HTML/CSS/JS — no build step, ready for GitHub Pages.

## Structure

```
index.html             Home
about.html              About Us (mission, vision, values, who we serve)
services.html           Services offered + full repair coverage
partners.html           Individual & insurance clients, insurer logos, claims process
contact.html            Both branches (HQ Bay & Bay 2), maps, quote form
assets/css/style.css    Styles
assets/js/main.js       Nav toggle, scroll reveal, before/after sliders, contact form
assets/img/             Photos from the company profile + logo
assets/img/partners/    Insurance partner logos
.nojekyll               Tells GitHub Pages to skip Jekyll processing
```

Each page shares the same header/nav and footer (duplicated per file since this is a build-free static site); the active page is highlighted in the nav.

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `sparkscar-website`).
2. Push these files to the repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Pick branch `main` and folder `/ (root)`, then **Save**.
6. Wait a minute or two — your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

### Using a custom domain (optional)
Add a `CNAME` file at the repo root containing your domain (e.g. `sparkscarautotune.co.ke`), then point your domain's DNS to GitHub Pages per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Editing content

- **Text**: edit directly in the relevant `.html` file — sections are labeled with HTML comments (`<!-- ===== About ===== -->`, etc.). If you add/rename a page, update the nav links in every page's `<nav class="nav">` block and the footer's Quick Links.
- **Colors**: edit the CSS variables at the top of `assets/css/style.css` (`:root { --navy, --red, --green ... }`).
- **Images**: replace files in `assets/img/` (keep filenames, or update `src` attributes). Insurance logos live in `assets/img/partners/`.
- **Branches**: HQ Bay's exact address wasn't confirmed at build time (only "~800m from Bay 2, Kahawa Wendani") — update the address text and the Google Maps embed URL in `contact.html` and `index.html` once you have the precise location/pin.
- **Insurance partners**: add or remove logos in `partners.html` (`.partners-grid`) and the homepage trust strip (`index.html`, `.trust-logos`).
- **Contact form**: the form opens the visitor's email app pre-filled (via `mailto:`), addressed to `info@sparkscarautotune.co.ke`. To collect submissions directly (no email client needed), connect a service like [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) and swap the form's `action`/JS in `assets/js/main.js`.

## Local preview

Just open `index.html` in a browser, or run a tiny local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
