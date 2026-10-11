import { useEffect, useMemo, useState } from "react";

const safeRead = (key, fallback) => {
  try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; }
};
const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage may be unavailable */ } };
const UI = {
  en: {
    title: "A little more for your prayer journey", subtitle: "Your space, your pace — private on this device.",
    beads: "Explore the rosary", beadsHint: "Choose a bead to pause and reflect. Continue your guided prayer whenever you are ready.",
    decade: "Decade", bead: "Bead", intentions: "Prayer intentions", intentionsHint: "Keep a private intention for your time in prayer.", placeholder: "What would you like to pray for?", add: "Add intention", remove: "Remove", empty: "Your intentions will appear here.", verse: "A verse for today", reflection: "Reflection", versePrompt: "Carry this verse gently into your day.", stats: "Your prayer journey", completed: "Rosaries completed", streak: "Current streak", days: "days", minutes: "A quiet moment counts, too.", settings: "Prayer settings", dark: "Night mode", large: "Larger prayer text", audio: "Listen to a prayer", audioHint: "Uses the voices available in your browser. Telugu speech depends on device voice support.", choosePrayer: "Choose prayer", play: "Play prayer", stop: "Stop audio", noSpeech: "Speech playback is not supported in this browser.", noVoice: "No Telugu voice is available on this device. You can still read the Telugu prayer.", reminders: "Daily prayer reminder", reminderTime: "Reminder time", enableReminder: "Enable reminder", disableReminder: "Turn reminder off", reminderHint: "Notifications can be shown while this app is open. Background reminders when the app is closed need a push-notification service.", permission: "Allow notifications", permissionDenied: "Notifications are blocked in browser settings.", install: "Install RETURN", installHint: "Keep your prayer space close at hand.", offline: "Offline support is enabled after this app has loaded once while online.", saved: "Saved on this device", noIntentions: "No intentions saved yet.", rosary: "Rosary", ourFather: "Our Father", hailMary: "Hail Mary", gloryBe: "Glory Be", fatima: "Fatima Prayer", close: "Close", reminderOn: "Daily reminder is set.", browserUnsupported: "Your browser does not support this feature.", reminderReceived: "It is time for a quiet moment of prayer.", today: "Today"
  },
  te: {
    title: "మీ ప్రార్థనా ప్రయాణానికి మరికొన్ని సౌకర్యాలు", subtitle: "మీ స్థలం, మీ వేగం — ఈ పరికరంలోనే గోప్యంగా.",
    beads: "జపమాలను అన్వేషించండి", beadsHint: "ధ్యానం కోసం ఒక పూసను ఎంచుకోండి. సిద్ధమైనప్పుడు మార్గదర్శక ప్రార్థనను కొనసాగించండి.",
    decade: "దశకం", bead: "పూస", intentions: "ప్రార్థనా ఉద్దేశాలు", intentionsHint: "మీ ప్రార్థన కోసం వ్యక్తిగత ఉద్దేశాన్ని భద్రపరచండి.", placeholder: "మీరు దేనికోసం ప్రార్థించాలనుకుంటున్నారు?", add: "ఉద్దేశాన్ని జోడించండి", remove: "తొలగించండి", empty: "మీ ఉద్దేశాలు ఇక్కడ కనిపిస్తాయి.", verse: "ఈ రోజు బైబిల్ వాక్యం", reflection: "ధ్యానం", versePrompt: "ఈ వాక్యాన్ని మీ రోజులో ప్రశాంతంగా గుర్తుంచుకోండి.", stats: "మీ ప్రార్థనా ప్రయాణం", completed: "పూర్తిచేసిన జపమాలలు", streak: "ప్రస్తుత వరుస రోజులు", days: "రోజులు", minutes: "కొద్దిసేపు ప్రశాంతంగా ఉండటమూ విలువైనదే.", settings: "ప్రార్థనా సెట్టింగులు", dark: "రాత్రి మోడ్", large: "పెద్ద అక్షరాలు", audio: "ప్రార్థనను వినండి", audioHint: "మీ బ్రౌజర్‌లో అందుబాటులో ఉన్న వాయిస్‌ను ఉపయోగిస్తుంది. తెలుగు ఆడియో పరికరంలోని వాయిస్ మద్దతుపై ఆధారపడి ఉంటుంది.", choosePrayer: "ప్రార్థనను ఎంచుకోండి", play: "ప్రార్థనను వినిపించండి", stop: "ఆడియో ఆపండి", noSpeech: "ఈ బ్రౌజర్‌లో మాటల ఆడియో అందుబాటులో లేదు.", noVoice: "ఈ పరికరంలో తెలుగు వాయిస్ అందుబాటులో లేదు. తెలుగు ప్రార్థనను చదవవచ్చు.", reminders: "రోజువారీ ప్రార్థనా గుర్తుచూపు", reminderTime: "గుర్తుచూపు సమయం", enableReminder: "గుర్తుచూపును ప్రారంభించండి", disableReminder: "గుర్తుచూపును ఆపండి", reminderHint: "యాప్ తెరిచి ఉన్నప్పుడు నోటిఫికేషన్ చూపవచ్చు. యాప్ మూసి ఉన్నప్పుడూ గుర్తుచూపు రావాలంటే పుష్ నోటిఫికేషన్ సేవ అవసరం.", permission: "నోటిఫికేషన్ అనుమతించండి", permissionDenied: "బ్రౌజర్ సెట్టింగుల్లో నోటిఫికేషన్లు నిలిపివేయబడ్డాయి.", install: "RETURN ఇన్‌స్టాల్ చేయండి", installHint: "మీ ప్రార్థనా స్థలాన్ని దగ్గరగా ఉంచుకోండి.", offline: "ఆన్‌లైన్‌లో ఒకసారి తెరిచిన తర్వాత ఆఫ్‌లైన్ మద్దతు అందుబాటులో ఉంటుంది.", saved: "ఈ పరికరంలో భద్రపరచబడింది", noIntentions: "ఇంకా ఉద్దేశాలు లేవు.", rosary: "జపమాల", ourFather: "మా తండ్రీ", hailMary: "హైల్ మేరీ", gloryBe: "తండ్రికి మహిమ", fatima: "ఫాతిమా ప్రార్థన", close: "మూసివేయండి", reminderOn: "రోజువారీ గుర్తుచూపు అమర్చబడింది.", browserUnsupported: "మీ బ్రౌజర్‌లో ఈ సౌకర్యం లేదు.", reminderReceived: "ప్రశాంతంగా ప్రార్థించడానికి ఇది సమయం.", today: "ఈ రోజు"
  }
};
const VERSES = [
  { ref: "Philippians 4:6–7", en: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", te: "దేనినిగూర్చియు చింతపడక, ప్రతి విషయములోను ప్రార్థన విజ్ఞాపనల ద్వారా కృతజ్ఞతతో మీ విన్నపములను దేవునికి తెలియజేయుడి." },
  { ref: "Psalm 46:10", en: "Be still, and know that I am God.", te: "ఊరకుండుడి; నేనే దేవుడనని తెలిసికొనుడి." },
  { ref: "Matthew 11:28", en: "Come to me, all you who are weary and burdened, and I will give you rest.", te: "ప్రయాసపడి భారములు మోసికొనుచున్న సమస్త జనులారా, నా యొద్దకు రండి; నేను మీకు విశ్రాంతి కలుగజేతును." },
  { ref: "Psalm 23:1", en: "The Lord is my shepherd; I shall not want.", te: "యెహోవా నా కాపరి; నాకు లేమి కలుగదు." },
  { ref: "John 14:27", en: "Peace I leave with you; my peace I give you.", te: "శాంతి మీకనుగ్రహించి వెళుచున్నాను; నా శాంతినే మీకిచ్చుచున్నాను." },
  { ref: "Proverbs 3:5", en: "Trust in the Lord with all your heart and lean not on your own understanding.", te: "నీ పూర్ణహృదయముతో యెహోవాయందు నమ్మకముంచుము; నీ స్వబుద్ధిని ఆధారము చేసికొనకుము." },
  { ref: "Romans 12:12", en: "Be joyful in hope, patient in affliction, faithful in prayer.", te: "నిరీక్షణగలవారై సంతోషించుడి; శ్రమలో ఓర్పుగలవారై యుండుడి; ప్రార్థనయందు పట్టుదల కలిగియుండుడి." }
];
const PRAYERS = {
  en: [
    { key: "ourFather", title: "Our Father", text: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen." },
    { key: "hailMary", title: "Hail Mary", text: "Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen." },
    { key: "gloryBe", title: "Glory Be", text: "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen." },
    { key: "fatima", title: "Fatima Prayer", text: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those who have most need of your mercy. Amen." }
  ],
  te: [
    { key: "ourFather", title: "మా తండ్రీ", text: "పరలోకమందున్న మా తండ్రీ, నీ నామము పవిత్రపరచబడుగాక; నీ రాజ్యము వచ్చుగాక; నీ చిత్తము పరలోకమందు నెరవేరునట్లు భూమిమీదను నెరవేరుగాక. మా అనుదిన ఆహారమును నేడు మాకు దయచేయుము. మాకు అపరాధము చేసినవారిని మేము క్షమించినట్లే మా అపరాధములను క్షమించుము. మమ్మును శోధనలోనికి తేక, కీడు నుండి మమ్మును రక్షించుము. ఆమేన్." },
    { key: "hailMary", title: "హైల్ మేరీ", text: "కృపతో నిండిన మరియమ్మా, నీకు వందనము; ప్రభువు నీతో ఉన్నాడు. స్త్రీలలో నీవు ఆశీర్వదింపబడినదానవు; నీ గర్భఫలమైన యేసు ఆశీర్వదింపబడినవాడు. పవిత్ర మరియమ్మా, దేవుని తల్లీ, పాపులమైన మా కొరకు ఇప్పుడును మా మరణ సమయమందును ప్రార్థించుము. ఆమేన్." },
    { key: "gloryBe", title: "తండ్రికి మహిమ", text: "తండ్రికిని కుమారునికిని పరిశుద్ధాత్మకును మహిమ కలుగును గాక. ఆదిలో ఉన్నట్లే ఇప్పుడును ఎల్లప్పుడును యుగయుగములకును కలుగును గాక. ఆమేన్." },
    { key: "fatima", title: "ఫాతిమా ప్రార్థన", text: "ఓ నా యేసూ, మా పాపములను క్షమించుము. నరకాగ్ని నుండి మమ్మును రక్షించుము. సమస్త ఆత్మలను పరలోకమునకు నడిపించుము; ముఖ్యంగా నీ కరుణకు అత్యంత అవసరమైన ఆత్మలను రక్షించుము. ఆమేన్." }
  ]
};
function dayKey(date = new Date()) { return date.getFullYear() + "-" + String(date.getMonth()+1).padStart(2,"0") + "-" + String(date.getDate()).padStart(2,"0"); }
function streakFor(history) {
  const days = new Set(history.map((item) => item.date));
  let cursor = new Date();
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate()-1);
  let streak = 0;
  while (days.has(dayKey(cursor)) && streak < 3660) { streak++; cursor.setDate(cursor.getDate()-1); }
  return streak;
}

export default function FeatureHub({ language = "en" }) {
  const t = UI[language] || UI.en;
  const [intentions, setIntentions] = useState(() => safeRead("return-rosary-intentions-v1", []));
  const [draft, setDraft] = useState("");
  const [history, setHistory] = useState(() => safeRead("return-rosary-history-v1", []));
  const [activeBead, setActiveBead] = useState(0);
  const [dark, setDark] = useState(() => safeRead("return-rosary-dark-v1", false));
  const [largeText, setLargeText] = useState(() => safeRead("return-rosary-large-text-v1", false));
  const [prayerKey, setPrayerKey] = useState("hailMary");
  const [audioStatus, setAudioStatus] = useState("");
  const [reminderTime, setReminderTime] = useState(() => safeRead("return-rosary-reminder-time-v1", "20:00"));
  const [reminderEnabled, setReminderEnabled] = useState(() => safeRead("return-rosary-reminder-enabled-v1", false));
  const [notice, setNotice] = useState("");
  const [installEvent, setInstallEvent] = useState(null);
  const todayVerse = useMemo(() => VERSES[Math.floor(Date.now() / 86400000) % VERSES.length], []);
  const selectedPrayer = PRAYERS[language].find((p) => p.key === prayerKey) || PRAYERS[language][1];
  const decade = Math.floor(activeBead / 10) + 1;
  const beadNumber = (activeBead % 10) + 1;

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    save("return-rosary-dark-v1", dark);
  }, [dark]);
  useEffect(() => { document.documentElement.classList.toggle("large-prayer-text", largeText); save("return-rosary-large-text-v1", largeText); }, [largeText]);
  useEffect(() => { save("return-rosary-intentions-v1", intentions); }, [intentions]);
  useEffect(() => { save("return-rosary-reminder-time-v1", reminderTime); }, [reminderTime]);
  useEffect(() => { save("return-rosary-reminder-enabled-v1", reminderEnabled); }, [reminderEnabled]);
  useEffect(() => { save("return-rosary-history-v1", history); }, [history]);
  useEffect(() => {
    const onCompleted = (event) => {
      const completedAt = event?.detail?.date || new Date().toISOString();
      setHistory((old) => {
        const next = [...old, { date: dayKey(new Date(completedAt)), at: completedAt }];
        save("return-rosary-history-v1", next);
        return next;
      });
    };
    window.addEventListener("return-prayer-completed", onCompleted);
    return () => window.removeEventListener("return-prayer-completed", onCompleted);
  }, []);
  useEffect(() => {
    const onInstall = (event) => { event.preventDefault(); setInstallEvent(event); };
    window.addEventListener("beforeinstallprompt", onInstall);
    return () => window.removeEventListener("beforeinstallprompt", onInstall);
  }, []);
  useEffect(() => {
    if (!reminderEnabled || !("Notification" in window) || Notification.permission !== "granted") return undefined;
    const check = () => {
      const now = new Date();
      const target = reminderTime.split(":").map(Number);
      const minute = dayKey(now) + " " + reminderTime;
      if (now.getHours() === target[0] && now.getMinutes() === target[1] && now.getSeconds() < 30 && safeRead("return-rosary-last-reminder-v1", "") !== minute) {
        save("return-rosary-last-reminder-v1", minute);
        try {
          if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.ready.then((registration) => registration.showNotification("RETURN — a moment to pray", { body: t.reminderReceived, icon: "/icons/return.svg", tag: "return-daily-prayer" }));
          } else new Notification("RETURN — a moment to pray", { body: t.reminderReceived });
        } catch { /* notification APIs vary by browser */ }
      }
    };
    check();
    const timer = window.setInterval(check, 15000);
    return () => window.clearInterval(timer);
  }, [reminderEnabled, reminderTime, t.reminderReceived]);

  function addIntention(event) {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;
    setIntentions((old) => [{ id: Date.now() + "-" + Math.random().toString(36).slice(2, 7), text: value, createdAt: new Date().toISOString() }, ...old].slice(0, 100));
    setDraft("");
  }
  function playPrayer() {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) { setAudioStatus(t.noSpeech); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(selectedPrayer.text);
    utterance.lang = language === "te" ? "te-IN" : "en-US";
    utterance.rate = 0.86;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => language === "te" ? /^te(-|$)/i.test(v.lang) : /^en(-|$)/i.test(v.lang));
    if (language === "te" && !voice) { setAudioStatus(t.noVoice); }
    else setAudioStatus("");
    if (voice) utterance.voice = voice;
    utterance.onend = () => setAudioStatus("");
    utterance.onerror = () => setAudioStatus(t.noSpeech);
    window.speechSynthesis.speak(utterance);
  }
  function stopAudio() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setAudioStatus("");
  }
  async function enableReminder() {
    if (!("Notification" in window)) { setNotice(t.browserUnsupported); return; }
    const permission = Notification.permission === "default" ? await Notification.requestPermission() : Notification.permission;
    if (permission !== "granted") { setNotice(permission === "denied" ? t.permissionDenied : t.browserUnsupported); return; }
    setReminderEnabled(true);
    setNotice(t.reminderOn);
  }
  async function installApp() {
    if (!installEvent) return;
    await installEvent.prompt();
    setInstallEvent(null);
  }

  return <section className="feature-hub" aria-label={t.title}>
    <div className="feature-intro"><p className="eyebrow">RETURN · YOUR PRAYER SPACE</p><h2>{t.title}</h2><p className="description">{t.subtitle}</p></div>
    <section className="rosary-audio-section" aria-labelledby="full-rosary-audio-title">
      <div className="rosary-audio-heading">
        <p className="feature-kicker">PRAY ALONG</p>
        <h3 id="full-rosary-audio-title">{language === "te" ? "పూర్తి జపమాల ఆడియో ప్రార్థన" : "Pray the full Rosary with audio"}</h3>
        <p>{language === "te" ? "మీకు నచ్చిన భాషలో ప్రార్థనను ఎంచుకుని ప్లే నొక్కండి." : "Choose your language and press play to pray along with the complete Rosary."}</p>
      </div>
      <div className="rosary-audio-grid">
        <article className={"rosary-audio-card "+(language === "en" ? "language-current" : "")}>
          <div className="rosary-audio-card-heading"><h4>English Rosary</h4><a href="https://youtu.be/gmzvvtuajIk?si=StGeIZzorhOIcSPF" target="_blank" rel="noopener noreferrer">Open on YouTube ↗</a></div>
          <div className="rosary-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/gmzvvtuajIk?rel=0" title="Full Rosary prayer in English on YouTube" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
          <p className="feature-muted">English · Complete Rosary</p>
        </article>
        <article className={"rosary-audio-card "+(language === "te" ? "language-current" : "")}>
          <div className="rosary-audio-card-heading"><h4>తెలుగు జపమాల</h4><a href="https://youtu.be/c3EGZ8NL6lw?si=7mQd_5XHL-6ugbkA" target="_blank" rel="noopener noreferrer">YouTube లో తెరవండి ↗</a></div>
          <div className="rosary-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/c3EGZ8NL6lw?rel=0" title="పూర్తి తెలుగు జపమాల ప్రార్థన YouTube లో" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
          <p className="feature-muted">తెలుగు · పూర్తి జపమాల</p>
        </article>
      </div>
      <p className="rosary-audio-note">{language === "te" ? "ఆడియోను ప్లే చేయడానికి ఇంటర్నెట్ అవసరం. వీడియోలు YouTube నుండి అందించబడతాయి." : "Internet is required to play these videos. Audio is streamed from YouTube, so it will not play offline."}</p>
    </section>
    <div className="feature-grid">
      <article className="feature-card feature-verse"><p className="feature-kicker">{t.verse}</p><blockquote>{todayVerse[language]}</blockquote><p className="verse-ref">{todayVerse.ref}</p><p>{t.versePrompt}</p></article>
      <article className="feature-card feature-stats"><p className="feature-kicker">{t.stats}</p><div className="stats-row"><div><strong>{history.length}</strong><span>{t.completed}</span></div><div><strong>{streakFor(history)}</strong><span>{t.streak} ({t.days})</span></div></div><p className="feature-muted">{t.minutes}</p><p className="privacy-note">◈ {t.saved}</p></article>
      <article className="feature-card feature-beads">
        <p className="feature-kicker">{t.beads}</p><p>{t.beadsHint}</p>
        <div className="interactive-rosary" role="group" aria-label={t.beads}>
          {Array.from({length:50},(_,i)=><button key={i} type="button" className={"interactive-bead "+(i===activeBead?"selected":"")+(Math.floor(i/10)===Math.floor(activeBead/10)?" in-decade":"")} aria-label={t.decade+" "+(Math.floor(i/10)+1)+", "+t.bead+" "+(i%10+1)} aria-pressed={i===activeBead} onClick={()=>setActiveBead(i)}>{i%10===0?"✦":"•"}</button>)}
        </div><p className="bead-selection">{t.decade} {decade} · {t.bead} {beadNumber} / 10</p>
      </article>
      <article className="feature-card feature-intentions">
        <p className="feature-kicker">{t.intentions}</p><p>{t.intentionsHint}</p>
        <form className="intention-form" onSubmit={addIntention}><label className="sr-only" htmlFor="prayer-intention">{t.placeholder}</label><textarea id="prayer-intention" value={draft} onChange={(e)=>setDraft(e.target.value)} maxLength={500} placeholder={t.placeholder} rows={2}/><button className="primary-button" type="submit" disabled={!draft.trim()}>{t.add}</button></form>
        {intentions.length===0?<p className="feature-muted">{t.empty}</p>:<ul className="intention-list">{intentions.map((item)=><li key={item.id}><span>{item.text}</span><button className="text-button" type="button" onClick={()=>setIntentions((old)=>old.filter((entry)=>entry.id!==item.id))} aria-label={t.remove+": "+item.text}>{t.remove}</button></li>)}</ul>}
      </article>
      <article className="feature-card feature-audio">
        <p className="feature-kicker">{t.audio}</p><label htmlFor="prayer-audio-select">{t.choosePrayer}</label><select id="prayer-audio-select" value={prayerKey} onChange={(e)=>{stopAudio();setPrayerKey(e.target.value);}}>{PRAYERS[language].map((prayer)=><option value={prayer.key} key={prayer.key}>{prayer.title}</option>)}</select>
        <div className="feature-actions"><button className="primary-button" type="button" onClick={playPrayer}>{t.play}</button><button className="secondary-button" type="button" onClick={stopAudio}>{t.stop}</button></div><p className="feature-muted">{t.audioHint}</p>{audioStatus&&<p className="feature-status" role="status">{audioStatus}</p>}
      </article>
      <article className="feature-card feature-settings">
        <p className="feature-kicker">{t.settings}</p><label className="setting-row"><span>{t.dark}</span><input type="checkbox" checked={dark} onChange={(e)=>setDark(e.target.checked)}/></label><label className="setting-row"><span>{t.large}</span><input type="checkbox" checked={largeText} onChange={(e)=>setLargeText(e.target.checked)}/></label>
      </article>
      <article className="feature-card feature-reminders">
        <p className="feature-kicker">{t.reminders}</p><label htmlFor="reminder-time">{t.reminderTime}</label><input id="reminder-time" type="time" value={reminderTime} onChange={(e)=>setReminderTime(e.target.value)}/><div className="feature-actions">{reminderEnabled?<button className="secondary-button" type="button" onClick={()=>{setReminderEnabled(false);setNotice("");}}>{t.disableReminder}</button>:<button className="primary-button" type="button" onClick={enableReminder}>{t.enableReminder}</button>}</div><p className="feature-muted">{t.reminderHint}</p>{notice&&<p className="feature-status" role="status">{notice}</p>}
      </article>
      <article className="feature-card feature-install">
        <p className="feature-kicker">RETURN · APP</p><h3>{t.install}</h3><p>{t.installHint}</p>{installEvent?<button className="primary-button" type="button" onClick={installApp}>{t.install}</button>:<p className="feature-muted">{t.offline}</p>}
      </article>
    </div>
  </section>;
}
