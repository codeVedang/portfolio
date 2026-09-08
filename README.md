# Vedang Kumar Tripathi Portfolio

A responsive, seven-page portfolio with a light editorial design, self-hosted Manrope typography, Lucide icons, and custom project artwork.

## Pages

- Home: approximately 12 months of experience, TaskPlanet's 100K-user platform reach, and ModeMesh AI. Only these two work highlights appear on the home page.
- Work: professional/personal filters and all four projects.
- Experience: CrowdBuzz (March-July 2026) and 3W Business / TaskPlanet.
- About: approach, technical skills, education, and certifications.
- Contact: direct links, copy email, and an email-draft form.
- TaskPlanet and ModeMesh: individual contribution/project pages.

The user supplied the updated 100K-user figure and approximately 12-month experience wording. The TaskPlanet figure describes platform reach, not sole ownership. The downloadable PDF remains the original supplied resume and may contain earlier figures.

Project artwork is a conceptual illustration, not a screenshot of proprietary software. Generated artwork lives in `assets/taskplanet-system.png` and `assets/modemesh-system.png`. There is no fabricated voice recording or AI-generated personal introduction.

## Run Locally

The committed HTML works directly in a browser. To edit and preview:

```bash
npm ci
npm run build
npm run check
npm run dev
```

Then visit `http://localhost:5175`. Use `npm run dev -- --port 5176` if that port is occupied.

Edit shared page templates/content in `scripts/build.mjs`, styling in `styles.css`, and interactions in `script.js`. Re-run `npm run build` after template edits; it generates the seven HTML files and copies local fonts/icons. No framework or third-party CDN is required in the browser. Dependency licenses are included beside the font and icon files.

The contact form prepares a `mailto:` draft. It does not send or store messages and needs a configured email app. All live project and repository links remain external.

## Vercel Deployment

`vercel.json` explicitly selects a static site (Framework Preset: Other), runs `npm run build`, and publishes `dist/`. The build copies all seven HTML pages, CSS, browser JavaScript, and assets into that directory. Source scripts and development dependencies are not published.

Run `npm run build` and `npm run check:dist` to validate the deployment output locally. Use the repository root as the Vercel Root Directory. The root-level HTML remains available for local previews.
