import { LanguageCode, Level, Pos, VocabEntry } from "@/lib/types";
import { Rng, sample } from "./rng";

/**
 * CEFR-graded, themed lexicon.
 *
 * Words are tagged with a CEFR level (A1–B2), a part of speech, a theme, and
 * 1–3 natural example sentences. Selection is level-aware (teach at-level with
 * light scaffolding from one level below) and theme-aware (driven by the
 * learner's interest + topic). English is the deepest bank; other languages
 * carry curated core sets.
 */

export const LEVEL_ORDER: Record<Level, number> = { A1: 1, A2: 2, B1: 3, B2: 4 };

const E = (
  word: string,
  pos: Pos,
  level: Level,
  theme: string,
  gloss: string,
  examples: string[],
  ipa?: string
): VocabEntry => ({ word, pos, level, theme, gloss, examples, ipa });

const EN: VocabEntry[] = [
  // technology
  E("app", "noun", "A1", "technology", "a program you use on a phone", ["I open this app every morning.", "She built a small app for school."]),
  E("online", "adjective", "A1", "technology", "connected to the internet", ["We are online now.", "The class is online today."]),
  E("device", "noun", "A2", "technology", "a piece of electronic equipment", ["My new device is very fast.", "Turn off your device at night."]),
  E("update", "noun", "A2", "technology", "a newer version of something", ["The app got a big update.", "Please install the update."]),
  E("password", "noun", "A2", "technology", "a secret word to log in", ["Choose a strong password.", "I forgot my password again."]),
  E("algorithm", "noun", "B1", "technology", "a set of steps a computer follows", ["The algorithm recommends videos.", "Nobody fully understands the algorithm."]),
  E("privacy", "noun", "B1", "technology", "keeping personal information safe", ["People worry about their privacy online.", "The new law protects user privacy."]),
  E("automation", "noun", "B2", "technology", "using machines to do human tasks", ["Automation changed many factory jobs.", "Automation can help and harm workers."]),
  E("surveillance", "noun", "B2", "technology", "closely watching people, often with technology", ["Cameras enable mass surveillance.", "Critics fear constant surveillance."]),
  E("breakthrough", "noun", "B2", "technology", "an important new discovery", ["Scientists announced a breakthrough.", "This breakthrough could change medicine."]),

  // sports
  E("team", "noun", "A1", "sports", "a group that plays together", ["My team won the game.", "She joined a new team."]),
  E("win", "verb", "A1", "sports", "to finish first in a game", ["I hope we win today.", "They win almost every match."]),
  E("player", "noun", "A1", "sports", "a person who plays a sport", ["He is my favourite player.", "The player scored twice."]),
  E("match", "noun", "A2", "sports", "a sports game between two sides", ["The match starts at eight.", "It was a close match."]),
  E("score", "verb", "A2", "sports", "to get a point or goal", ["She can score from anywhere.", "They scored in the last minute."]),
  E("coach", "noun", "A2", "sports", "a person who trains a team", ["The coach was proud of us.", "Our coach changed the plan."]),
  E("tournament", "noun", "B1", "sports", "a series of games to find a winner", ["The tournament lasts two weeks.", "They reached the tournament final."]),
  E("supporter", "noun", "B1", "sports", "a fan of a team", ["Thousands of supporters filled the stadium.", "Loyal supporters travel everywhere."]),
  E("rivalry", "noun", "B2", "sports", "intense competition between two sides", ["Their rivalry goes back decades.", "The rivalry makes every game tense."]),
  E("underdog", "noun", "B2", "sports", "the team expected to lose", ["Everyone loves an underdog.", "The underdog shocked the champions."]),

  // music
  E("song", "noun", "A1", "music", "a short piece of music with words", ["This song is beautiful.", "I know every word of the song."]),
  E("band", "noun", "A1", "music", "a group of musicians", ["Their band plays every Friday.", "She started a band at school."]),
  E("listen", "verb", "A1", "music", "to pay attention to sound", ["I listen to music while I study.", "Listen to this new track."]),
  E("concert", "noun", "A2", "music", "a live music performance", ["The concert was sold out.", "We waited hours for the concert."]),
  E("album", "noun", "A2", "music", "a collection of songs released together", ["Her new album is amazing.", "The album has twelve songs."]),
  E("audience", "noun", "A2", "music", "the people who watch or listen", ["The audience sang along.", "A huge audience watched online."]),
  E("lyrics", "noun", "B1", "music", "the words of a song", ["The lyrics tell a sad story.", "I finally understood the lyrics."]),
  E("rhythm", "noun", "B1", "music", "a regular pattern of sound", ["The rhythm makes you want to dance.", "She has a great sense of rhythm."]),
  E("genre", "noun", "B2", "music", "a style or category of music", ["This genre mixes jazz and pop.", "He listens to every genre."]),

  // environment
  E("clean", "adjective", "A1", "environment", "not dirty", ["We want clean air.", "The beach is clean again."]),
  E("weather", "noun", "A1", "environment", "the state of the sky and air", ["The weather is nice today.", "Bad weather stopped the game."]),
  E("recycle", "verb", "A2", "environment", "to use materials again", ["We recycle paper and glass.", "Please recycle your bottles."]),
  E("pollution", "noun", "A2", "environment", "harmful substances in the air or water", ["Pollution is bad for our health.", "The city is fighting pollution."]),
  E("energy", "noun", "A2", "environment", "power used to do work", ["Solar energy is clean.", "We must save energy at home."]),
  E("emissions", "noun", "B1", "environment", "gases released into the air", ["The country pledged to cut emissions.", "Cars produce a lot of emissions."]),
  E("renewable", "adjective", "B1", "environment", "energy that does not run out", ["Wind is a renewable source.", "They invest in renewable power."]),
  E("drought", "noun", "B1", "environment", "a long period without rain", ["The drought damaged the harvest.", "Farmers fear another drought."]),
  E("sustainability", "noun", "B2", "environment", "using resources without using them up", ["Sustainability guides their design.", "The report focuses on sustainability."]),
  E("ecosystem", "noun", "B2", "environment", "living things and their environment together", ["Plastic harms the ocean ecosystem.", "A healthy ecosystem needs balance."]),

  // media / news literacy
  E("news", "noun", "A1", "media", "reports about recent events", ["I watch the news at night.", "That is good news."]),
  E("report", "noun", "A2", "media", "a spoken or written account of something", ["The report was on every channel.", "She wrote a report about it."]),
  E("headline", "noun", "A2", "media", "the title of a news story", ["The headline was dramatic.", "Read past the headline."]),
  E("source", "noun", "B1", "media", "where information comes from", ["Always check the source.", "The article gave no source."]),
  E("evidence", "noun", "B1", "media", "facts that support a claim", ["Reporters looked for evidence.", "There was no clear evidence."]),
  E("bias", "noun", "B1", "media", "an unfair preference for one side", ["Every outlet has some bias.", "They found bias in the report."]),
  E("coverage", "noun", "B1", "media", "the reporting of an event", ["Coverage was everywhere this week.", "The coverage felt one-sided."]),
  E("perspective", "noun", "B1", "media", "a particular point of view", ["Each country has its own perspective.", "Try to see another perspective."]),
  E("framing", "noun", "B2", "media", "the way a story is presented", ["The framing made readers afraid.", "Notice the framing of the headline."]),
  E("propaganda", "noun", "B2", "media", "biased information used to promote a view", ["Wartime propaganda spread quickly.", "They dismissed it as propaganda."]),

  // daily life
  E("friend", "noun", "A1", "daily", "a person you like and know well", ["I have a good friend.", "My friend lives nearby."]),
  E("morning", "noun", "A1", "daily", "the early part of the day", ["I read in the morning.", "Good morning!"]),
  E("family", "noun", "A1", "daily", "your parents, children and relatives", ["My family is large.", "We visit family on Sundays."]),
  E("buy", "verb", "A1", "daily", "to get something for money", ["I want to buy a coffee.", "She bought a new phone."]),
  E("routine", "noun", "A2", "daily", "things you usually do", ["My morning routine is simple.", "Exercise is part of my routine."]),
  E("neighbour", "noun", "A2", "daily", "a person who lives near you", ["My neighbour is very kind.", "The neighbours had a party."]),
  E("commute", "noun", "B1", "daily", "the journey to work or school", ["My commute takes an hour.", "The commute is faster by train."]),

  // economy
  E("money", "noun", "A1", "economy", "coins and notes used to buy things", ["I need more money.", "She saves her money."]),
  E("job", "noun", "A1", "economy", "the work someone does for pay", ["He found a new job.", "I love my job."]),
  E("price", "noun", "A2", "economy", "how much something costs", ["The price went up.", "What is the price?"]),
  E("market", "noun", "A2", "economy", "a place or system for buying and selling", ["The stock market fell today.", "We shop at the local market."]),
  E("salary", "noun", "A2", "economy", "money paid for a job each month", ["Her salary increased.", "The salary is quite low."]),
  E("inflation", "noun", "B1", "economy", "a general rise in prices", ["Inflation worries families.", "High inflation reduces savings."]),
  E("unemployment", "noun", "B1", "economy", "the state of having no job", ["Unemployment rose last year.", "The town has high unemployment."]),
  E("recession", "noun", "B2", "economy", "a period of economic decline", ["The country entered a recession.", "A recession can cost jobs."]),

  // science / general knowledge
  E("study", "verb", "A1", "science", "to learn about a subject", ["I study every evening.", "They study the ocean."]),
  E("experiment", "noun", "A2", "science", "a scientific test", ["We did an experiment in class.", "The experiment failed twice."]),
  E("research", "noun", "B1", "science", "careful study to find new facts", ["Their research took years.", "New research supports the idea."]),
  E("theory", "noun", "B1", "science", "an idea that explains something", ["It is only a theory.", "The theory fits the data."]),
  E("hypothesis", "noun", "B2", "science", "an idea to be tested", ["They tested the hypothesis.", "The hypothesis was wrong."]),

  // culture
  E("food", "noun", "A1", "culture", "things people eat", ["I love spicy food.", "The food here is great."]),
  E("tradition", "noun", "A2", "culture", "a custom passed down over time", ["It is a family tradition.", "Every country has traditions."]),
  E("festival", "noun", "A2", "culture", "a special celebration", ["The music festival lasts three days.", "We met at a food festival."]),
  E("heritage", "noun", "B1", "culture", "traditions and history passed down", ["They are proud of their heritage.", "The city protects its heritage."]),
  E("identity", "noun", "B1", "culture", "who or what someone is", ["Language is part of identity.", "She explored her cultural identity."]),
  E("diversity", "noun", "B2", "culture", "a range of different people or things", ["The city celebrates diversity.", "Diversity makes teams stronger."]),

  // general (connectors / evaluative — mostly higher levels)
  E("important", "adjective", "A1", "general", "mattering a lot", ["This is important.", "Sleep is important."]),
  E("opinion", "noun", "A2", "general", "what you think about something", ["In my opinion, it is fair.", "Everyone has an opinion."]),
  E("agree", "verb", "A2", "general", "to have the same idea", ["I agree with you.", "We could not agree."]),
  E("however", "adverb", "B1", "general", "used to add a contrasting idea", ["It is cheap; however, it works.", "However, not everyone agrees."]),
  E("although", "phrase", "B1", "general", "in spite of the fact that", ["Although it rained, we played.", "Although small, it is powerful."]),
  E("significant", "adjective", "B1", "general", "large or important enough to matter", ["There was a significant change.", "The gap is significant."]),
  E("consequence", "noun", "B2", "general", "a result of an action", ["Every choice has a consequence.", "They ignored the consequences."]),
  E("nevertheless", "adverb", "B2", "general", "in spite of that", ["It was hard; nevertheless, we finished.", "Nevertheless, doubts remain."]),
];

const FR: VocabEntry[] = [
  E("ami", "noun", "A1", "daily", "friend", ["J'ai un bon ami."], "a-mi"),
  E("manger", "verb", "A1", "daily", "to eat", ["Je mange une pomme."], "mɑ̃-ʒe"),
  E("musique", "noun", "A1", "music", "music", ["J'aime la musique."], "my-zik"),
  E("équipe", "noun", "A1", "sports", "team", ["Mon équipe a gagné."], "e-kip"),
  E("argent", "noun", "A1", "economy", "money", ["Je n'ai pas d'argent."], "ar-ʒɑ̃"),
  E("actualité", "noun", "A2", "media", "current news", ["Je lis l'actualité chaque matin."], "ak-tɥa-li-te"),
  E("match", "noun", "A2", "sports", "match / game", ["Le match est ce soir."], "matʃ"),
  E("concert", "noun", "A2", "music", "concert", ["Le concert commence à huit heures."], "kɔ̃-sɛʁ"),
  E("pollution", "noun", "A2", "environment", "pollution", ["La pollution augmente en ville."], "pɔ-ly-sjɔ̃"),
  E("travail", "noun", "A2", "economy", "work / job", ["Je vais au travail."], "tʁa-vaj"),
  E("source", "noun", "B1", "media", "source of information", ["Vérifie toujours la source."], "suʁs"),
  E("preuve", "noun", "B1", "media", "evidence", ["Il n'y a pas de preuve."], "pʁœv"),
  E("énergie", "noun", "B1", "environment", "energy", ["L'énergie solaire est propre."], "e-nɛʁ-ʒi"),
  E("opinion", "noun", "B1", "general", "opinion", ["Chacun a son opinion."], "ɔ-pi-njɔ̃"),
  E("cependant", "adverb", "B1", "general", "however", ["C'est cher; cependant, c'est utile."], "s(ə)-pɑ̃-dɑ̃"),
  E("cadrage", "noun", "B2", "media", "framing", ["Le cadrage change notre émotion."], "ka-dʁaʒ"),
  E("inflation", "noun", "B2", "economy", "inflation", ["L'inflation inquiète les gens."], "ɛ̃-fla-sjɔ̃"),
  E("durabilité", "noun", "B2", "environment", "sustainability", ["La durabilité est essentielle."], "dy-ʁa-bi-li-te"),
];

const ES: VocabEntry[] = [
  E("amigo", "noun", "A1", "daily", "friend", ["Tengo un buen amigo."], "a-mi-go"),
  E("comer", "verb", "A1", "daily", "to eat", ["Como una manzana."], "ko-mer"),
  E("música", "noun", "A1", "music", "music", ["Me gusta la música."], "mu-si-ka"),
  E("equipo", "noun", "A1", "sports", "team", ["Mi equipo ganó."], "e-ki-po"),
  E("dinero", "noun", "A1", "economy", "money", ["No tengo dinero."], "di-ne-ro"),
  E("noticia", "noun", "A2", "media", "news story", ["Leo las noticias cada día."], "no-ti-sja"),
  E("partido", "noun", "A2", "sports", "match / game", ["El partido es esta noche."], "par-ti-ðo"),
  E("concierto", "noun", "A2", "music", "concert", ["El concierto empieza a las ocho."], "kon-sjer-to"),
  E("contaminación", "noun", "A2", "environment", "pollution", ["La contaminación crece en la ciudad."], "kon-ta-mi-na-sjon"),
  E("trabajo", "noun", "A2", "economy", "work / job", ["Voy al trabajo."], "tra-βa-xo"),
  E("fuente", "noun", "B1", "media", "source", ["Revisa siempre la fuente."], "fwen-te"),
  E("prueba", "noun", "B1", "media", "evidence / proof", ["No hay pruebas."], "prwe-βa"),
  E("energía", "noun", "B1", "environment", "energy", ["La energía solar es limpia."], "e-ner-xi-a"),
  E("opinión", "noun", "B1", "general", "opinion", ["Cada uno tiene su opinión."], "o-pi-njon"),
  E("sin embargo", "phrase", "B1", "general", "however", ["Es caro; sin embargo, es útil."], "sin em-bar-go"),
  E("enfoque", "noun", "B2", "media", "framing / focus", ["El enfoque cambia lo que sentimos."], "en-fo-ke"),
  E("inflación", "noun", "B2", "economy", "inflation", ["La inflación preocupa a la gente."], "in-fla-sjon"),
  E("sostenibilidad", "noun", "B2", "environment", "sustainability", ["La sostenibilidad es esencial."], "sos-te-ni-βi-li-ðað"),
];

const ZH: VocabEntry[] = [
  E("朋友", "noun", "A1", "daily", "friend", ["我有一个好朋友。"], "péngyou"),
  E("吃", "verb", "A1", "daily", "to eat", ["我吃苹果。"], "chī"),
  E("音乐", "noun", "A1", "music", "music", ["我喜欢音乐。"], "yīnyuè"),
  E("球队", "noun", "A1", "sports", "team", ["我的球队赢了。"], "qiúduì"),
  E("新闻", "noun", "A2", "media", "news", ["我每天看新闻。"], "xīnwén"),
  E("比赛", "noun", "A2", "sports", "match / game", ["比赛今晚开始。"], "bǐsài"),
  E("污染", "noun", "A2", "environment", "pollution", ["城市的污染越来越严重。"], "wūrǎn"),
  E("工作", "noun", "A2", "economy", "work / job", ["我去工作。"], "gōngzuò"),
  E("来源", "noun", "B1", "media", "source", ["要检查信息的来源。"], "láiyuán"),
  E("证据", "noun", "B1", "media", "evidence", ["没有证据。"], "zhèngjù"),
  E("能源", "noun", "B1", "environment", "energy", ["太阳能是清洁能源。"], "néngyuán"),
  E("观点", "noun", "B1", "general", "point of view", ["每个人都有自己的观点。"], "guāndiǎn"),
  E("框架", "noun", "B2", "media", "framing", ["框架会影响我们的感受。"], "kuàngjià"),
  E("通货膨胀", "noun", "B2", "economy", "inflation", ["通货膨胀让人担心。"], "tōnghuò péngzhàng"),
];

const JA: VocabEntry[] = [
  E("友達", "noun", "A1", "daily", "friend", ["私には友達がいます。"], "tomodachi"),
  E("食べる", "verb", "A1", "daily", "to eat", ["私はりんごを食べます。"], "taberu"),
  E("音楽", "noun", "A1", "music", "music", ["音楽が好きです。"], "ongaku"),
  E("チーム", "noun", "A1", "sports", "team", ["私のチームが勝ちました。"], "chīmu"),
  E("ニュース", "noun", "A2", "media", "news", ["毎日ニュースを見ます。"], "nyūsu"),
  E("試合", "noun", "A2", "sports", "match / game", ["試合は今夜です。"], "shiai"),
  E("汚染", "noun", "A2", "environment", "pollution", ["都市の汚染が増えています。"], "osen"),
  E("仕事", "noun", "A2", "economy", "work / job", ["仕事に行きます。"], "shigoto"),
  E("情報源", "noun", "B1", "media", "information source", ["情報源を確認します。"], "jōhōgen"),
  E("証拠", "noun", "B1", "media", "evidence", ["証拠がありません。"], "shōko"),
  E("エネルギー", "noun", "B1", "environment", "energy", ["太陽エネルギーはクリーンです。"], "enerugī"),
  E("意見", "noun", "B1", "general", "opinion", ["人それぞれ意見があります。"], "iken"),
  E("フレーミング", "noun", "B2", "media", "framing", ["フレーミングで印象が変わります。"], "furēmingu"),
  E("インフレ", "noun", "B2", "economy", "inflation", ["インフレが心配です。"], "infure"),
];

const KO: VocabEntry[] = [
  E("친구", "noun", "A1", "daily", "friend", ["저는 좋은 친구가 있어요."], "chingu"),
  E("먹다", "verb", "A1", "daily", "to eat", ["저는 사과를 먹어요."], "meokda"),
  E("음악", "noun", "A1", "music", "music", ["저는 음악을 좋아해요."], "eumak"),
  E("팀", "noun", "A1", "sports", "team", ["우리 팀이 이겼어요."], "tim"),
  E("뉴스", "noun", "A2", "media", "news", ["매일 뉴스를 봐요."], "nyuseu"),
  E("경기", "noun", "A2", "sports", "match / game", ["경기는 오늘 밤이에요."], "gyeonggi"),
  E("오염", "noun", "A2", "environment", "pollution", ["도시의 오염이 심해져요."], "oyeom"),
  E("일", "noun", "A2", "economy", "work / job", ["일하러 가요."], "il"),
  E("출처", "noun", "B1", "media", "source", ["출처를 확인하세요."], "chulcheo"),
  E("증거", "noun", "B1", "media", "evidence", ["증거가 없어요."], "jeunggeo"),
  E("에너지", "noun", "B1", "environment", "energy", ["태양 에너지는 깨끗해요."], "eneoji"),
  E("관점", "noun", "B1", "general", "point of view", ["사람마다 관점이 달라요."], "gwanjeom"),
  E("프레이밍", "noun", "B2", "media", "framing", ["프레이밍이 인상을 바꿔요."], "peureiming"),
  E("인플레이션", "noun", "B2", "economy", "inflation", ["인플레이션이 걱정돼요."], "inpeulleisyeon"),
];

const AR: VocabEntry[] = [
  E("صديق", "noun", "A1", "daily", "friend", ["لدي صديق جيد."], "ṣadīq"),
  E("يأكل", "verb", "A1", "daily", "to eat", ["آكل تفاحة."], "yaʾkul"),
  E("موسيقى", "noun", "A1", "music", "music", ["أحب الموسيقى."], "mūsīqā"),
  E("فريق", "noun", "A1", "sports", "team", ["فاز فريقي."], "farīq"),
  E("أخبار", "noun", "A2", "media", "news", ["أقرأ الأخبار كل يوم."], "akhbār"),
  E("مباراة", "noun", "A2", "sports", "match / game", ["المباراة الليلة."], "mubārāh"),
  E("تلوث", "noun", "A2", "environment", "pollution", ["التلوث يزداد في المدينة."], "talawwuth"),
  E("عمل", "noun", "A2", "economy", "work / job", ["أذهب إلى العمل."], "ʿamal"),
  E("مصدر", "noun", "B1", "media", "source", ["تحقق من المصدر."], "maṣdar"),
  E("دليل", "noun", "B1", "media", "evidence", ["لا يوجد دليل."], "dalīl"),
  E("طاقة", "noun", "B1", "environment", "energy", ["الطاقة الشمسية نظيفة."], "ṭāqah"),
  E("رأي", "noun", "B1", "general", "opinion", ["لكل شخص رأيه."], "raʾy"),
  E("تأطير", "noun", "B2", "media", "framing", ["التأطير يغيّر شعورنا."], "taʾṭīr"),
  E("تضخم", "noun", "B2", "economy", "inflation", ["التضخم يقلق الناس."], "taḍakhkhum"),
];

export const BANK: Record<LanguageCode, VocabEntry[]> = {
  en: EN,
  fr: FR,
  es: ES,
  zh: ZH,
  ja: JA,
  ko: KO,
  ar: AR,
};

// interest / topic → theme
const INTEREST_THEME: Record<string, string> = {
  football: "sports", soccer: "sports", sport: "sports", sports: "sports",
  basketball: "sports", tennis: "sports", cricket: "sports", rugby: "sports",
  ai: "technology", tech: "technology", technology: "technology", computer: "technology",
  coding: "technology", programming: "technology", gaming: "technology", games: "technology", internet: "technology",
  music: "music", song: "music", concert: "music", pop: "music", rap: "music",
  climate: "environment", environment: "environment", nature: "environment", weather: "environment", energy: "environment",
  news: "media", politics: "media", media: "media", journalism: "media",
  economy: "economy", money: "economy", business: "economy", finance: "economy", jobs: "economy",
  science: "science", space: "science", health: "science", medicine: "science",
  culture: "culture", food: "culture", travel: "culture", fashion: "culture",
  art: "culture", film: "culture", movies: "culture", books: "culture",
};

export function themesFor(interest: string, topic: string): string[] {
  const key = interest.trim().toLowerCase();
  const hay = `${interest} ${topic}`.toLowerCase();
  const set = new Set<string>();
  if (INTEREST_THEME[key]) set.add(INTEREST_THEME[key]);
  for (const [k, v] of Object.entries(INTEREST_THEME)) {
    if (hay.includes(k)) set.add(v);
  }
  set.add("media"); // media & information literacy is always in scope
  if (set.size === 1) set.add("daily");
  return [...set];
}

function dedupe(entries: VocabEntry[]): VocabEntry[] {
  const seen = new Set<string>();
  return entries.filter((e) => (seen.has(e.word) ? false : seen.add(e.word)));
}

/**
 * Choose vocabulary at the target CEFR level, scaffolded with a little from one
 * level below, biased toward the learner's themes. Sorted easy → hard.
 */
export function selectVocabulary(
  rng: Rng,
  lang: LanguageCode,
  themes: string[],
  level: Level,
  count: number
): VocabEntry[] {
  const bank = BANK[lang] ?? BANK.en;
  const lvl = LEVEL_ORDER[level];
  const inRange = bank.filter(
    (e) => LEVEL_ORDER[e.level] <= lvl && LEVEL_ORDER[e.level] >= lvl - 1
  );
  const themed = dedupe(inRange.filter((e) => themes.includes(e.theme)));
  const general = dedupe(inRange.filter((e) => e.theme === "general" || e.theme === "media"));

  let pool = themed.slice();
  // Always fold in a couple of general/media words for balance.
  pool = dedupe([...pool, ...sample(rng, general, 3)]);
  // Backfill if the theme is thin (e.g. non-English banks).
  if (pool.length < count) {
    pool = dedupe([...pool, ...inRange, ...bank.filter((e) => LEVEL_ORDER[e.level] <= lvl)]);
  }

  const chosen = sample(rng, pool, count);
  return chosen.sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);
}

/** A few below-level words to revisit (spaced repetition). */
export function reviewWords(rng: Rng, lang: LanguageCode, level: Level): string[] {
  const bank = BANK[lang] ?? BANK.en;
  const lvl = LEVEL_ORDER[level];
  const below = bank.filter((e) => LEVEL_ORDER[e.level] < lvl);
  const pickFrom = below.length ? below : bank;
  return sample(rng, pickFrom, 3).map((e) => e.word);
}

function uniqueStrings(arr: string[]): string[] {
  return [...new Set(arr)];
}

/** Distractor glosses for MCQ, avoiding the given gloss. */
export function distractorGlosses(rng: Rng, lang: LanguageCode, avoid: string, n: number): string[] {
  const bank = BANK[lang] ?? BANK.en;
  const options = uniqueStrings(bank.map((e) => e.gloss).filter((g) => g !== avoid));
  return sample(rng, options, n);
}

/** Distractor words for fill-in-the-blank, avoiding the given word. */
export function distractorWords(rng: Rng, lang: LanguageCode, avoid: string, n: number): string[] {
  const bank = BANK[lang] ?? BANK.en;
  const options = uniqueStrings(bank.map((e) => e.word).filter((w) => w !== avoid));
  return sample(rng, options, n);
}
