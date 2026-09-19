# SparksCar Auto Tune Ltd — Website

A static, single-page, mobile-friendly website for SparksCar Auto Tune Ltd (Kahawa Wendani, Nairobi), built with plain HTML/CSS/JS — no build step, ready for GitHub Pages.

## Structure

```
index.html            Main page (all sections)
assets/css/style.css   Styles
assets/js/main.js      Nav toggle, scroll reveal, before/after sliders, contact form
assets/img/            Photos from the company profile + logo
.nojekyll              Tells GitHub Pages to skip Jekyll processing
```

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `sparkscar-website`).
2. Push these files to the repository root (or to a `docs/` folder — see below):
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

- **Text**: edit directly in `index.html` — sections are labeled with HTML comments (`<!-- ===== About ===== -->`, etc.).
- **Colors**: edit the CSS variables at the top of `assets/css/style.css` (`:root { --navy, --red, --green ... }`).
- **Images**: replace files in `assets/img/` (keep the same filenames, or update the `src`/`href` in `index.html`).
- **Contact form**: the form currently opens the visitor's email app pre-filled (via `mailto:`), addressed to `sparkscarautotune24@gmail.com`. To collect submissions directly (no email client needed), connect a service like [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) and swap the form's `action`/JS.

## Local preview

Just open `index.html` in a browser, or run a tiny local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
