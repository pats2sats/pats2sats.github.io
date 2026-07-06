# pats2sats.github.io

Personal portfolio for `pats2sats`, deployed with GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Push to `main`. The GitHub Actions workflow builds the site and deploys `dist/`
to GitHub Pages.

```bash
git add .
git commit -m "Update portfolio"
git push
```

The portfolio URL is:

```text
https://pats2sats.github.io/
```

Project content lives in `src/App.tsx`; styling lives in `src/styles.css`.
