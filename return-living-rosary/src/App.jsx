import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "return-rosary-progress-v1";

const copy = {
  en: {
    brand: "RETURN", subtitle: "THE LIVING ROSARY PATH", title: "Come as you are.",
    description: "Begin where you are. Continue at your own pace.", button: "Begin Rosary",
    footer: "A quiet place to pause, pray, and return.", languageLabel: "Switch language",
    welcomeTitle: "Let us begin our prayer.", welcome: "Take a quiet moment. There is no need to hurry. Begin where you are, and pray at your own pace.",
    startPrayer: "Begin Prayer", home: "Return home", resume: "Resume prayer", restart: "Start a new Rosary",
    previous: "Previous", next: "Next prayer", continue: "Continue", skip: "Skip optional prayer",
    opening: "Opening prayers", mysteriesLabel: "The Mysteries", decade: "Decade", of: "of",
    hailMary: "Hail Mary", ourFather: "Our Father", gloryBe: "Glory Be", fatima: "Fatima Prayer",
    reflection: "Reflection", progress: "Prayer journey", complete: "Your prayer is complete. Go in peace.",
    completeTitle: "Peace be with you.", completedText: "Thank you for spending this time in prayer.",
    prayAgain: "Pray again", currentMystery: "Current mystery", step: "Step", ofSteps: "of",
    close: "Closing prayers", openingComplete: "Opening prayers complete", decadeComplete: "Decade complete",
    resumeQuestion: "You have a Rosary in progress. Would you like to continue where you left off?",
    resumeButton: "Resume where I left off", newButton: "Begin again", optional: "Optional",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    mysterySets: {
      joyful: "Joyful Mysteries", sorrowful: "Sorrowful Mysteries",
      glorious: "Glorious Mysteries", luminous: "Luminous Mysteries"
    },
    prayers: {
      cross: { title: "Sign of the Cross", text: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen." },
      creed: { title: "The Apostles’ Creed", text: "I believe in God, the Father almighty, Creator of heaven and earth; and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen." },
      ourFather: { title: "Our Father", text: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen." },
      hailMary: { title: "Hail Mary", text: "Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen." },
      gloryBe: { title: "Glory Be", text: "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen." },
      fatima: { title: "Fatima Prayer", text: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those who have most need of your mercy. Amen." },
      hailHolyQueen: { title: "Hail, Holy Queen", text: "Hail, holy Queen, Mother of mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen." },
      closing: { title: "Concluding Prayer", text: "O God, whose Only Begotten Son, by his life, Death, and Resurrection, has purchased for us the rewards of eternal life, grant, we beseech thee, that while meditating on these mysteries of the most holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen." }
    },
    mysteries: {
      joyful: [
        ["The Annunciation", "The angel Gabriel announces to Mary that she will be the Mother of God. Reflect on listening with trust and saying yes to God."],
        ["The Visitation", "Mary visits Elizabeth and shares the joy of God's presence. Reflect on carrying love to others through humble service."],
        ["The Nativity", "Jesus is born in Bethlehem. Reflect on the humility of Christ and welcome him into your heart."],
        ["The Presentation", "Mary and Joseph present Jesus in the Temple. Reflect on offering your life and gifts to God."],
        ["The Finding of Jesus in the Temple", "Mary and Joseph find Jesus among the teachers. Reflect on seeking God faithfully, even in uncertainty."]
      ],
      sorrowful: [
        ["The Agony in the Garden", "Jesus prays in Gethsemane and entrusts himself to the Father. Bring your fears to God and ask for courage."],
        ["The Scourging at the Pillar", "Jesus endures suffering with love. Pray for all who suffer in body or spirit."],
        ["The Crowning with Thorns", "Jesus is mocked and crowned with thorns. Reflect on humility and pray for those who are humiliated."],
        ["The Carrying of the Cross", "Jesus carries the cross toward Calvary. Unite your burdens with his and remember those carrying heavy crosses."],
        ["The Crucifixion", "Jesus gives his life on the Cross. Rest in the depth of his self-giving love and pray for peace."]
      ],
      glorious: [
        ["The Resurrection", "Jesus rises from the dead. Ask for renewed hope and faith in the promise of new life."],
        ["The Ascension", "The risen Jesus returns to the Father. Reflect on your heavenly calling and your mission in the world."],
        ["The Descent of the Holy Spirit", "The Holy Spirit comes upon Mary and the apostles. Ask for wisdom, courage, and a heart open to the Spirit."],
        ["The Assumption of Mary", "Mary is assumed body and soul into heavenly glory. Reflect on the hope of eternal life with God."],
        ["The Coronation of Mary", "Mary is crowned Queen of Heaven and Earth. Ask her to guide you closer to her Son."]
      ],
      luminous: [
        ["The Baptism of Jesus in the Jordan", "The Father reveals Jesus as his beloved Son. Remember your own baptism and your identity as God's beloved."],
        ["The Wedding at Cana", "At Mary's request, Jesus changes water into wine. Trust in Mary's words: do whatever he tells you."],
        ["The Proclamation of the Kingdom of God", "Jesus calls people to conversion and announces God's Kingdom. Ask for a heart ready to change and serve."],
        ["The Transfiguration", "Jesus is revealed in glory on the mountain. Ask for light to recognize God's presence in daily life."],
        ["The Institution of the Eucharist", "Jesus gives himself to us in the Eucharist. Grow in gratitude for his presence and self-giving love."]
      ]
    }
  },
  te: {
    brand: "RETURN", subtitle: "జపమాల ప్రార్థనా ప్రయాణం", title: "మీరు ఉన్న చోట నుంచే ప్రారంభించండి.",
    description: "మీకు అనుకూలమైన సమయంలో, మీ వేగంతో ప్రార్థించండి.", button: "జపమాల ప్రార్థన ప్రారంభించండి",
    footer: "ఆగి, ప్రార్థించి, తిరిగి రావడానికి ఒక ప్రశాంతమైన స్థలం.", languageLabel: "భాషను మార్చండి",
    welcomeTitle: "మన ప్రార్థనను ప్రారంభిద్దాం.", welcome: "కొద్దిసేపు ప్రశాంతంగా ఉండండి. తొందరపడాల్సిన అవసరం లేదు. మీరు ఉన్న చోట నుంచే మీ వేగంతో ప్రార్థించండి.",
    startPrayer: "ప్రార్థన ప్రారంభించండి", home: "ప్రధాన పేజీకి వెళ్ళండి", resume: "ప్రార్థనను కొనసాగించండి", restart: "కొత్త జపమాల ప్రారంభించండి",
    previous: "వెనుకకు", next: "తదుపరి ప్రార్థన", continue: "కొనసాగించండి", skip: "ఐచ్ఛిక ప్రార్థనను దాటవేయండి",
    opening: "ప్రారంభ ప్రార్థనలు", mysteriesLabel: "జపమాల రహస్యాలు", decade: "దశకం", of: "లో",
    hailMary: "హైల్ మేరీ", ourFather: "మా తండ్రీ", gloryBe: "తండ్రికి మహిమ", fatima: "ఫాతిమా ప్రార్థన",
    reflection: "ధ్యానం", progress: "ప్రార్థనా ప్రయాణం", complete: "మీ ప్రార్థన పూర్తయింది. సమాధానంతో వెళ్ళండి.",
    completeTitle: "శాంతి మీతో ఉండుగాక.", completedText: "ఈ సమయాన్ని ప్రార్థనలో గడిపినందుకు ధన్యవాదాలు.",
    prayAgain: "మళ్ళీ ప్రార్థించండి", currentMystery: "ప్రస్తుత రహస్యం", step: "దశ", ofSteps: "లో",
    close: "ముగింపు ప్రార్థనలు", openingComplete: "ప్రారంభ ప్రార్థనలు పూర్తయ్యాయి", decadeComplete: "దశకం పూర్తయింది",
    resumeQuestion: "మీరు ప్రారంభించిన జపమాల ప్రార్థన ఉంది. ఎక్కడ ఆపారో అక్కడి నుంచి కొనసాగించాలనుకుంటున్నారా?",
    resumeButton: "ఆపిన చోటు నుంచి కొనసాగించండి", newButton: "మళ్ళీ ప్రారంభించండి", optional: "ఐచ్ఛికం",
    dayNames: ["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"],
    mysterySets: { joyful: "సంతోష రహస్యాలు", sorrowful: "వ్యథా రహస్యాలు", glorious: "మహిమ రహస్యాలు", luminous: "వెలుగు రహస్యాలు" },
    prayers: {
      cross: { title: "సిలువ గుర్తు", text: "తండ్రి, కుమారుడు, పరిశుద్ధాత్మ నామమున. ఆమేన్." },
      creed: { title: "అపొస్తలుల విశ్వాస ప్రమాణం", text: "సర్వశక్తిమంతుడైన తండ్రియగు దేవునియందు, ఆకాశమును భూమిని సృష్టించినవానియందు విశ్వసించుచున్నాను. ఆయన ఏకైక కుమారుడును మన ప్రభువునైన యేసుక్రీస్తునందు విశ్వసించుచున్నాను. ఆయన పరిశుద్ధాత్మ వలన గర్భమున ధరింపబడి, కన్యక మరియమ్మ నుండి జన్మించి, పొంతి పిలాతు అధికారములో శ్రమపడి, సిలువ వేయబడి, మరణించి సమాధి చేయబడెను. పాతాళమునకు దిగెను; మూడవ దినమున మృతులలోనుండి లేచెను; పరలోకమునకు ఆరోహణమై సర్వశక్తిమంతుడైన తండ్రియగు దేవుని కుడిపార్శ్వమున కూర్చుండియున్నాడు. అక్కడినుండి జీవులకును మృతులకును తీర్పు తీర్చుటకు వచ్చును. పరిశుద్ధాత్మయందు, పవిత్ర కతోలిక సంఘమునందు, పరిశుద్ధుల సహవాసమునందు, పాపక్షమాపణయందు, శరీర పునరుత్థానమునందు, నిత్యజీవమునందు విశ్వసించుచున్నాను. ఆమేన్." },
      ourFather: { title: "మా తండ్రీ", text: "పరలోకమందున్న మా తండ్రీ, నీ నామము పవిత్రపరచబడుగాక; నీ రాజ్యము వచ్చుగాక; నీ చిత్తము పరలోకమందు నెరవేరునట్లు భూమిమీదను నెరవేరుగాక. మా అనుదిన ఆహారమును నేడు మాకు దయచేయుము. మాకు అపరాధము చేసినవారిని మేము క్షమించినట్లే మా అపరాధములను క్షమించుము. మమ్మును శోధనలోనికి తేక, కీడు నుండి మమ్మును రక్షించుము. ఆమేన్." },
      hailMary: { title: "హైల్ మేరీ", text: "కృపతో నిండిన మరియమ్మా, నీకు వందనము; ప్రభువు నీతో ఉన్నాడు. స్త్రీలలో నీవు ఆశీర్వదింపబడినదానవు; నీ గర్భఫలమైన యేసు ఆశీర్వదింపబడినవాడు. పవిత్ర మరియమ్మా, దేవుని తల్లీ, పాపులమైన మా కొరకు ఇప్పుడును మా మరణ సమయమందును ప్రార్థించుము. ఆమేన్." },
      gloryBe: { title: "తండ్రికి మహిమ", text: "తండ్రికిని కుమారునికిని పరిశుద్ధాత్మకును మహిమ కలుగును గాక. ఆదిలో ఉన్నట్లే ఇప్పుడును ఎల్లప్పుడును యుగయుగములకును కలుగును గాక. ఆమేన్." },
      fatima: { title: "ఫాతిమా ప్రార్థన", text: "ఓ నా యేసూ, మా పాపములను క్షమించుము. నరకాగ్ని నుండి మమ్మును రక్షించుము. సమస్త ఆత్మలను పరలోకమునకు నడిపించుము; ముఖ్యంగా నీ కరుణకు అత్యంత అవసరమైన ఆత్మలను రక్షించుము. ఆమేన్." },
      hailHolyQueen: { title: "హైల్, పవిత్ర రాణీ", text: "కరుణామయి పవిత్ర రాణీ, మా జీవమా, మాధుర్యమా, మా నిరీక్షణమా, నీకు వందనము. బహిష్కరింపబడిన ఏవమ్మ సంతానమైన మేము నీకు మొరపెట్టుకొనుచున్నాము. కన్నీటి లోయలో నిట్టూర్పులతోను విలాపములతోను నీకు మొరపెట్టుకొనుచున్నాము. మా న్యాయవాదియైన తల్లీ, నీ కరుణగల కన్నులను మావైపు త్రిప్పుము. మా ప్రవాసము ముగిసిన తరువాత నీ గర్భఫలమైన యేసును మాకు చూపుము. ఓ దయామయి, ప్రేమమయి, మధురమైన కన్యక మరియమ్మా. దేవుని పవిత్ర తల్లీ, క్రీస్తు వాగ్దానాలకు మేము పాత్రులమగునట్లు మా కొరకు ప్రార్థించుము. ఆమేన్." },
      closing: { title: "ముగింపు ప్రార్థన", text: "ఓ దేవా, నీ ఏకైక కుమారుడు తన జీవితం, మరణం, పునరుత్థానం ద్వారా నిత్యజీవ బహుమతిని మాకు సంపాదించి ఇచ్చెను. పవిత్ర కన్యక మరియమ్మ జపమాలలోని ఈ రహస్యాలను ధ్యానించుచు, వాటిలోని బోధలను అనుసరించి, వాటి వాగ్దానాలను పొందునట్లు మాకు అనుగ్రహించుము. మా ప్రభువైన క్రీస్తు ద్వారా వేడుకొనుచున్నాము. ఆమేన్." }
    },
    mysteries: {
      joyful: [
        ["దేవదూత సందేశం", "దేవదూత గాబ్రియేలు మరియమ్మకు దేవుని తల్లిగా ఉండబోవు శుభవార్తను తెలియజేశాడు. దేవుని చిత్తాన్ని విశ్వాసంతో స్వీకరించడాన్ని ధ్యానించండి."],
        ["మరియమ్మ ఎలిజబెత్‌ను దర్శించుట", "మరియమ్మ ఎలిజబెత్‌ను దర్శించి దేవుని సంతోషాన్ని పంచుకుంది. ప్రేమతో ఇతరులకు సేవ చేయడాన్ని ధ్యానించండి."],
        ["యేసు జననం", "యేసు బేత్లెహేములో జన్మించాడు. ఆయన వినయాన్ని ధ్యానించి మీ హృదయంలోకి ఆహ్వానించండి."],
        ["దేవాలయంలో యేసును సమర్పించుట", "మరియమ్మ, యోసేపు యేసును దేవాలయంలో సమర్పించారు. మీ జీవితాన్ని దేవునికి అర్పించడాన్ని ధ్యానించండి."],
        ["దేవాలయంలో యేసును కనుగొనుట", "మరియమ్మ, యోసేపు యేసును బోధకుల మధ్య కనుగొన్నారు. అనిశ్చితిలోనూ దేవుని వెదకడాన్ని ధ్యానించండి."]
      ],
      sorrowful: [
        ["తోటలో యేసు వేదన", "గెత్సేమనే తోటలో యేసు తండ్రికి తనను అప్పగించుకున్నాడు. మీ భయాలను దేవునికి సమర్పించి ధైర్యం కోరండి."],
        ["స్తంభమునకు కట్టి కొరడాలతో కొట్టుట", "యేసు ప్రేమతో బాధను సహించాడు. శరీరంలోను మనసులోను బాధపడుతున్న వారి కోసం ప్రార్థించండి."],
        ["ముళ్ళ కిరీటము ధరింపజేయుట", "యేసును అపహసించి ముళ్ళ కిరీటము పెట్టారు. వినయాన్ని ధ్యానించి అవమానింపబడుతున్న వారి కోసం ప్రార్థించండి."],
        ["సిలువ మోయుట", "యేసు కల్వరి వైపు సిలువను మోశాడు. మీ భారాలను ఆయనతో కలిపి సమర్పించండి."],
        ["యేసు సిలువ మరణం", "యేసు సిలువపై తన ప్రాణాన్ని అర్పించాడు. ఆయన త్యాగప్రేమను ధ్యానించి శాంతి కోసం ప్రార్థించండి."]
      ],
      glorious: [
        ["యేసు పునరుత్థానం", "యేసు మృతులలోనుండి లేచాడు. నూతన ఆశను, నిత్యజీవ వాగ్దానంపై విశ్వాసాన్ని కోరండి."],
        ["యేసు పరలోకారోహణం", "పునరుత్థానుడైన యేసు తండ్రి వద్దకు ఆరోహణమయ్యాడు. మీ పరలోక పిలుపును, లోకంలోని సేవను ధ్యానించండి."],
        ["పరిశుద్ధాత్మ అవతరణ", "మరియమ్మ మరియు అపొస్తలులపై పరిశుద్ధాత్మ దిగివచ్చాడు. జ్ఞానం, ధైర్యం, తెరిచిన హృదయాన్ని కోరండి."],
        ["మరియమ్మ పరలోక మహిమలోకి ఆరోహణం", "మరియమ్మ శరీరాత్మలతో పరలోక మహిమలోకి చేర్చబడింది. దేవునితో నిత్యజీవ నిరీక్షణను ధ్యానించండి."],
        ["మరియమ్మకు కిరీటధారణ", "మరియమ్మ పరలోక రాణిగా కిరీటధారణ పొందింది. ఆమె మిమ్మల్ని తన కుమారుని వైపు నడిపించమని కోరండి."]
      ],
      luminous: [
        ["యోర్దాను నదిలో యేసు బాప్తిస్మం", "తండ్రి యేసును తన ప్రియ కుమారునిగా ప్రకటించాడు. దేవుని ప్రియ సంతానమనే మీ గుర్తింపును జ్ఞాపకం చేసుకోండి."],
        ["కానా వివాహ విందు", "మరియమ్మ విన్నపంతో యేసు నీటిని ద్రాక్షారసంగా మార్చాడు. ఆమె మాటలను విశ్వసించండి: ఆయన మీతో చెప్పినది చేయండి."],
        ["దేవుని రాజ్య ప్రకటన", "యేసు మారుమనస్సు పొంది దేవుని రాజ్యాన్ని స్వీకరించమని పిలిచాడు. మార్పుకు, సేవకు సిద్ధమైన హృదయాన్ని కోరండి."],
        ["రూపాంతరం", "పర్వతంపై యేసు మహిమ వెల్లడైంది. దైనందిన జీవితంలో దేవుని సాన్నిధ్యాన్ని గుర్తించడానికి వెలుగు కోరండి."],
        ["పరిశుద్ధ యూకరిస్తు స్థాపన", "యేసు యూకరిస్తులో తనను మనకు ఇచ్చాడు. ఆయన సాన్నిధ్యానికి, త్యాగప్రేమకు కృతజ్ఞత పెంపొందించుకోండి."]
      ]
    }
  }
};

function mysteryKeyForDay(day) {
  if (day === 1 || day === 6) return "joyful";
  if (day === 2 || day === 5) return "sorrowful";
  if (day === 3 || day === 0) return "glorious";
  return "luminous";
}

function buildJourney(text, setKey) {
  const p = text.prayers;
  const steps = [
    { type: "opening", key: "cross", title: p.cross.title, text: p.cross.text, section: "opening" },
    { type: "opening", key: "creed", title: p.creed.title, text: p.creed.text, section: "opening" },
    { type: "opening", key: "ourFather", title: p.ourFather.title, text: p.ourFather.text, section: "opening" },
    ...[1, 2, 3].map((number) => ({ type: "opening", key: "hailMary", count: number, title: p.hailMary.title + " · " + number + " / 3", text: p.hailMary.text, section: "opening" })),
    { type: "opening", key: "gloryBe", title: p.gloryBe.title, text: p.gloryBe.text, section: "opening" }
  ];
  text.mysteries[setKey].forEach((mystery, index) => {
    const decade = index + 1;
    steps.push({ type: "mystery", decade, title: mystery[0], text: mystery[1], section: "decades" });
    steps.push({ type: "decade-prayer", decade, key: "ourFather", title: p.ourFather.title, text: p.ourFather.text, section: "decades" });
    for (let bead = 1; bead <= 10; bead += 1) {
      steps.push({ type: "hail-bead", decade, bead, key: "hailMary", title: p.hailMary.title + " · " + bead + " / 10", text: p.hailMary.text, section: "decades" });
    }
    steps.push({ type: "decade-prayer", decade, key: "gloryBe", title: p.gloryBe.title, text: p.gloryBe.text, section: "decades" });
    steps.push({ type: "decade-prayer", decade, key: "fatima", title: p.fatima.title, text: p.fatima.text, section: "decades", optional: true });
  });
  steps.push({ type: "closing", key: "hailHolyQueen", title: p.hailHolyQueen.title, text: p.hailHolyQueen.text, section: "closing" });
  steps.push({ type: "closing", key: "closing", title: p.closing.title, text: p.closing.text, section: "closing" });
  steps.push({ type: "closing", key: "cross", title: p.cross.title, text: p.cross.text, section: "closing" });
  return steps;
}

function readSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && typeof saved === "object" && ["en", "te"].includes(saved.language) && Number.isInteger(saved.index) && saved.index >= 0 && saved.index <= 100) return saved;
  } catch {
    // Ignore malformed browser storage and start a fresh journey.
  }
  return null;
}

export default function App() {
  const [savedAtLoad] = useState(() => readSaved());
  const [language, setLanguage] = useState(() => savedAtLoad?.language || localStorage.getItem("return-rosary-language") || "en");
  const [screen, setScreen] = useState("home");
  const [journeyIndex, setJourneyIndex] = useState(savedAtLoad?.index || 0);
  const [hasProgress, setHasProgress] = useState(Boolean(savedAtLoad && !savedAtLoad.complete));
  const [started, setStarted] = useState(false);
  const [complete, setComplete] = useState(Boolean(savedAtLoad?.complete));
  const [mysterySet, setMysterySet] = useState(() => ["joyful", "sorrowful", "glorious", "luminous"].includes(savedAtLoad?.setKey) ? savedAtLoad.setKey : mysteryKeyForDay(new Date().getDay()));
  const text = copy[language];
  const setKey = mysterySet;
  const journey = useMemo(() => buildJourney(text, setKey), [text, setKey]);
  const current = journey[Math.min(journeyIndex, journey.length - 1)];
  const progress = Math.round(((journeyIndex + 1) / journey.length) * 100);
  const mysteryCount = current?.decade || (journeyIndex < 7 ? 0 : 1);
  const sectionLabel = current?.section === "opening" ? text.opening : current?.section === "closing" ? text.close : text.mysteriesLabel;

  useEffect(() => {
    document.documentElement.lang = language === "te" ? "te" : "en";
    try { localStorage.setItem("return-rosary-language", language); } catch { /* ignore unavailable storage */ }
  }, [language]);

  useEffect(() => {
    if (started && screen === "prayer" && !complete) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ language, index: journeyIndex, setKey, complete: false, savedAt: new Date().toISOString() }));
        setHasProgress(true);
      } catch {
        // Prayer still works if storage is unavailable.
      }
    }
  }, [language, journeyIndex, started, screen, complete]);

  function beginFromStart() {
    setMysterySet(mysteryKeyForDay(new Date().getDay()));
    setJourneyIndex(0);
    setStarted(true);
    setComplete(false);
    setScreen("prayer");
  }

  function goHome() {
    setScreen("home");
  }

  function next() {
    if (journeyIndex >= journey.length - 1) {
      setComplete(true);
      setScreen("complete");
      setHasProgress(false);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ language, index: journeyIndex, setKey, complete: true, savedAt: new Date().toISOString() })); } catch { /* ignore */ }
      return;
    }
    setJourneyIndex((index) => Math.min(index + 1, journey.length - 1));
  }

  function previous() {
    if (journeyIndex === 0) {
      setScreen("welcome");
      return;
    }
    setJourneyIndex((index) => Math.max(0, index - 1));
  }

  function startAgain() {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setMysterySet(mysteryKeyForDay(new Date().getDay()));
    setJourneyIndex(0);
    setStarted(false);
    setComplete(false);
    setHasProgress(false);
    setScreen("welcome");
  }

  function beadStatus(step) {
    if (step.type !== "hail-bead") return null;
    return Array.from({ length: 10 }, (_, i) => i + 1);
  }

  const isHome = screen === "home";
  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand brand-button" type="button" onClick={goHome} aria-label="RETURN home">{text.brand}</button>
        <div className="header-actions">
          {screen !== "home" && <button className="text-button home-link" onClick={goHome} type="button">{text.home}</button>}
          <button className="language-button" onClick={() => setLanguage((value) => value === "en" ? "te" : "en")} aria-label={text.languageLabel} type="button">
            {language === "en" ? "తెలుగు" : "English"}
          </button>
        </div>
      </header>

      {isHome && (
        <section className="hero" id="home">
          <p className="eyebrow">{text.subtitle}</p>
          <div className="rosary-art" aria-hidden="true">
            <div className="bead-ring">
              {Array.from({ length: 20 }, (_, index) => (
                <span className={"bead " + (index === 0 ? "active" : "")} key={index} style={{ "--angle": (index * 18) + "deg" }} />
              ))}
            </div>
            <div className="center-symbol">✝</div>
          </div>
          <h1>{text.title}</h1>
          <p className="description">{text.description}</p>
          <button className="primary-button" onClick={() => setScreen("welcome")} type="button">{text.button}<span aria-hidden="true"> →</span></button>
          {hasProgress && !complete && (
            <div className="resume-card">
              <p>{text.resumeQuestion}</p>
              <button className="secondary-button" type="button" onClick={() => { setStarted(true); setScreen("prayer"); }}>{text.resumeButton}</button>
              <button className="text-button" type="button" onClick={startAgain}>{text.newButton}</button>
            </div>
          )}
          <p className="footer-note">{text.footer}</p>
        </section>
      )}

      {screen === "welcome" && (
        <section className="prayer-layout welcome-layout">
          <button className="text-button back-link" type="button" onClick={goHome}>← {text.home}</button>
          <div className="prayer-emblem" aria-hidden="true">✝</div>
          <p className="eyebrow">{text.subtitle}</p>
          <h1>{text.welcomeTitle}</h1>
          <p className="description">{text.welcome}</p>
          <div className="welcome-verse">{text.prayers.cross.text}</div>
          <button className="primary-button" type="button" onClick={beginFromStart}>{text.startPrayer}<span aria-hidden="true"> →</span></button>
          {hasProgress && <button className="text-button" type="button" onClick={() => { setStarted(true); setScreen("prayer"); }}>{text.resumeButton}</button>}
        </section>
      )}

      {screen === "prayer" && current && (
        <section className="prayer-layout" aria-live="polite">
          <div className="prayer-topline">
            <button className="text-button back-link" type="button" onClick={goHome}>← {text.home}</button>
            <span className="section-label">{sectionLabel}</span>
          </div>
          <div className="progress-block">
            <div className="progress-caption"><span>{text.progress}</span><span>{text.step} {journeyIndex + 1} {text.ofSteps} {journey.length}</span></div>
            <div className="progress-track" role="progressbar" aria-label={text.progress} aria-valuemin={0} aria-valuemax={journey.length} aria-valuenow={journeyIndex + 1}><span style={{ width: progress + "%" }} /></div>
          </div>

          {current.type === "mystery" && (
            <div className="mystery-banner">
              <p className="eyebrow">{text.mysterySets[setKey]} · {text.decade} {current.decade} {text.of} 5</p>
              <div className="mystery-number">{["I", "II", "III", "IV", "V"][current.decade - 1]}</div>
              <h2>{current.title}</h2>
              <p className="reflection-label">{text.reflection}</p>
              <p className="reflection-text">{current.text}</p>
            </div>
          )}

          {current.type !== "mystery" && (
            <article className="prayer-card">
              {current.type === "hail-bead" && (
                <div className="bead-progress" aria-label={text.hailMary + " " + current.bead + " of 10"}>
                  {beadStatus(current).map((bead) => <span key={bead} className={"prayer-bead " + (bead === current.bead ? "current" : bead < current.bead ? "passed" : "")} aria-label={text.hailMary + " " + bead} />)}
                </div>
              )}
              {current.type === "decade-prayer" && <p className="eyebrow">{text.decade} {current.decade} {text.of} 5</p>}
              {current.type === "closing" && <p className="eyebrow">{text.close}</p>}
              <div className="prayer-cross" aria-hidden="true">✝</div>
              <h1>{current.title}</h1>
              {current.optional && <span className="optional-label">{text.optional}</span>}
              <p className="prayer-text">{current.text}</p>
              {current.type === "hail-bead" && <p className="bead-count">{text.hailMary} {current.bead} / 10</p>}
            </article>
          )}

          <div className="prayer-navigation">
            <button className="secondary-button" type="button" onClick={previous}>← {text.previous}</button>
            <button className="primary-button" type="button" onClick={next}>{journeyIndex === journey.length - 1 ? text.completeTitle : current.optional ? text.continue : text.next}<span aria-hidden="true"> →</span></button>
          </div>
          {current.optional && <button className="text-button skip-button" type="button" onClick={next}>{text.skip}</button>}
          {current.type === "mystery" && <p className="quiet-note">{text.currentMystery}: {current.decade} / 5</p>}
        </section>
      )}

      {screen === "complete" && (
        <section className="prayer-layout completion-layout">
          <div className="completion-symbol" aria-hidden="true">✝</div>
          <p className="eyebrow">{text.subtitle}</p>
          <h1>{text.completeTitle}</h1>
          <p className="description">{text.complete}</p>
          <p className="completion-note">{text.completedText}</p>
          <button className="primary-button" type="button" onClick={goHome}>{text.home}</button>
          <button className="text-button" type="button" onClick={startAgain}>{text.prayAgain}</button>
        </section>
      )}
    </main>
  );
}
