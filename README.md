# The Tasty Kitchen

This repository contains a small e-commerce front-end built with Vite, React and Tailwind CSS for The Tasty Kitchen.

Quick start (development):

```powershell
# clone
git clone <YOUR_GIT_URL>
cd the-tasty-kitchen

# install
npm install

# run dev server
npm run dev
```

Build for production:

```powershell
npm run build
# preview the production build locally
npm run preview
```

Deployment

- This project includes a GitHub Actions workflow to build and publish the `dist` folder to GitHub Pages. To deploy from your account:
	1. Create a repository named `the-tasty-kitchen` under your GitHub account.
	2. Push this code to the `main` branch.
	3. The provided workflow will run automatically and publish to `https://<your-username>.github.io/the-tasty-kitchen/`.

Notes

- The project uses local assets for social preview images. Update `index.html` if you want a custom Open Graph image.
- If you change the repository name or host under a custom domain, update `vite.config.ts` `base` to match your production path.

If you want help finishing the deployment steps or customizing the site copy/branding, tell me what you'd like to change.
