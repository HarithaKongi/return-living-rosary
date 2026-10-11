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
- Interactive 50-bead rosary explorer, daily Scripture verse, and reflections.
- Personal prayer intentions saved locally on the device.
- Prayer completion history, completed Rosary count, and gentle current streak statistics.
- Browser speech playback for selected English and Telugu prayers (voice availability depends on the device).
- Night mode, larger prayer text, and keyboard focus support.
- Installable PWA manifest and service worker for caching the app shell for offline reopening.
- Optional daily reminder using browser notifications while the app is open and notification permission is granted.

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

Audio uses built-in browser speech synthesis, not recorded narration. Telugu playback depends on an installed Telugu speech voice. Reminder notifications are checked while the app is open; reliable reminders after closing the app require a push-notification backend. Offline caching begins after a successful online visit, and browser support varies. Intentions and statistics are stored locally and do not sync between devices.

## License

No license has been added yet. Choose a license before inviting outside contributions or allowing reuse.
