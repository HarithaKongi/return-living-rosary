import { useState } from "react";

const content = {
  en: {
    brand: "RETURN",
    subtitle: "THE LIVING ROSARY PATH",
    title: "Come as you are.",
    description: "Begin where you are. Continue at your own pace.",
    button: "Begin Rosary",
    welcome: "Your prayer journey begins here.",
    footer: "A quiet place to pause, pray, and return.",
    languageLabel: "Switch language",
  },
  te: {
    brand: "RETURN",
    subtitle: "జపమాల ప్రార్థనా ప్రయాణం",
    title: "మీరు ఉన్న చోట నుంచే ప్రారంభించండి.",
    description: "మీకు అనుకూలమైన సమయంలో, మీ వేగంతో ప్రార్థించండి.",
    button: "జపమాల ప్రార్థన ప్రారంభించండి",
    welcome: "మీ ప్రార్థనా ప్రయాణం ఇక్కడ ప్రారంభమవుతుంది.",
    footer: "ఆగి, ప్రార్థించి, తిరిగి రావడానికి ఒక ప్రశాంతమైన స్థలం.",
    languageLabel: "భాషను మార్చండి",
  },
};

export default function App() {
  const [language, setLanguage] = useState("en");
  const [started, setStarted] = useState(false);
  const text = content[language];

  function toggleLanguage() {
    setLanguage((current) => (current === "en" ? "te" : "en"));
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="RETURN home">
          {text.brand}
        </a>
        <button
          className="language-button"
          onClick={toggleLanguage}
          aria-label={text.languageLabel}
          type="button"
        >
          {language === "en" ? "తెలుగు" : "English"}
        </button>
      </header>

      <section className="hero" id="home">
        <p className="eyebrow">{text.subtitle}</p>

        <div className="rosary-art" aria-hidden="true">
          <div className="bead-ring">
            {Array.from({ length: 20 }, (_, index) => (
              <span
                className={`bead ${index === 0 ? "active" : ""}`}
                key={index}
                style={{ "--angle": `${index * 18}deg` }}
              />
            ))}
          </div>
          <div className="center-symbol">✝</div>
        </div>

        <h1>{text.title}</h1>
        <p className="description">{text.description}</p>

        <button
          className="primary-button"
          onClick={() => setStarted(true)}
          type="button"
        >
          {text.button}
          <span aria-hidden="true"> →</span>
        </button>

        {started && (
          <p className="welcome-message" role="status">
            {text.welcome}
          </p>
        )}

        <p className="footer-note">{text.footer}</p>
      </section>
    </main>
  );
}
