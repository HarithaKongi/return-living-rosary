# RETURN — The Living Rosary Path

A mobile-friendly React application to help people begin, pause, and return to Rosary prayer without pressure.

## Current features

- Responsive landing page and RETURN branding.
- English and Telugu interface and prayer text.
- Guided opening prayers, including the Sign of the Cross, Apostles' Creed, Our Father, three Hail Marys, and Glory Be.
- Daily mysteries selected using the user's local weekday.
- Five mysteries and five decades, with ten individually counted Hail Marys per decade.
- Our Father, Glory Be, and optional Fatima Prayer for each decade.
- Closing prayers and a completion screen.
- Previous/next navigation, visible progress, and highlighted beads.
- Local browser storage to resume an unfinished prayer journey.
- No account or server is required; progress stays in the browser.

## Tech stack

- React
- Vite
- CSS

## Run locally

Requirements: Node.js LTS and npm.

\`\`\`bash
npm install
npm run dev
\`\`\`

Open the local URL printed by Vite, usually \`http://localhost:5173\`.

## Production build

\`\`\`bash
npm run build
npm run preview
\`\`\`

The production output is generated in \`dist/\`.

## Project structure

\`\`\`text
return-living-rosary/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
\`\`\`

## Product principles

- Prayer should feel welcoming, not competitive.
- No streak pressure or guilt-inducing messages.
- Personal prayer progress stays local by default.
- Prayer wording and Telugu translations should be reviewed by a knowledgeable Catholic reviewer before public release.

## Notes

The app provides a guided text-based prayer experience. It does not currently include audio narration, offline/PWA support, or server-side syncing.

## License

No license has been added yet. Choose a license before inviting outside contributions or allowing reuse.
