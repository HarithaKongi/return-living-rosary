# RETURN — The Living Rosary Path

A mobile-friendly React web app concept designed to help people begin, pause, and return to Rosary prayer without pressure.

## Current status

**Prototype / Phase 1.** This version includes:
- A welcoming home screen
- English and Telugu interface text toggle
- Responsive styling
- An illustrative bead ring
- A simple start interaction

The Rosary sequence, verified prayer texts, progress saving, offline support, and audio are planned for later phases. The current bead illustration is not yet a functional prayer guide.

## Tech stack

- React
- Vite
- CSS

## Run locally

Requirements: Node.js LTS and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Project structure

```text
return-living-rosary/
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Product principles

- Prayer should feel welcoming, not competitive.
- No streak pressure or guilt-inducing messages.
- Keep personal prayer progress local by default.
- Review translations and prayer order with a knowledgeable Catholic reviewer before release.

## Roadmap

1. Validate the user problem and refine the signature interaction.
2. Implement the traditional Rosary prayer sequence and mysteries.
3. Add functional bead navigation, pause, and resume.
4. Add locally saved progress.
5. Review English and Telugu prayer texts.
6. Add offline/PWA support and test on mobile.
7. Consider an Android release after validating the web version.

## License

No license has been added yet. Choose a license before inviting outside contributions or allowing reuse.
