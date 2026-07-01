import { DialogueScript, LanguageCode, VocabEntry } from "@/lib/types";
import { pick, Rng } from "./rng";

/**
 * Dialogue engine.
 *
 * English lessons draw from several *scenarios* (news reaction, café chat,
 * opinion clash, interview). Every turn has multiple phrasings picked at
 * random, so two lessons on the same topic rarely produce the same script —
 * the fix for "dialogues feel templated and robotic".
 *
 * Other languages use curated, glossed scripts (2 scenarios each).
 */

type Builder = (rng: Rng, topic: string, interest: string, vocab: VocabEntry[]) => DialogueScript;

const enScenarios: Builder[] = [
  (rng, topic, interest) => ({
    scenario: "Reacting to the news",
    setting: `Two friends spot a headline about ${topic}.`,
    register: "casual",
    lines: [
      { speaker: "Maya", role: "curious", line: pick(rng, [`Did you see the news about ${topic}?`, `Have you read anything on ${topic} today?`]) },
      { speaker: "Leo", role: "engaged", line: pick(rng, [`Yeah — but every site tells it differently.`, `A little. Honestly, the headlines confused me.`]) },
      { speaker: "Maya", role: "reflective", line: pick(rng, [`The ${interest} angle made it feel personal.`, `One version actually made me a bit worried.`]) },
      { speaker: "Leo", role: "skeptical", line: pick(rng, [`That's the framing. Who wrote it, though?`, `Right — but where's the actual evidence?`]) },
      { speaker: "Maya", role: "agreeable", line: pick(rng, [`Good point. Let's check another source.`, `Fair. We should compare a second source.`]) },
      { speaker: "Leo", role: "closing", line: pick(rng, [`Deal. Same facts, different story, I bet.`, `Agreed. Let's see what each one leaves out.`]) },
    ],
  }),
  (rng, topic, interest) => ({
    scenario: "Café chat",
    setting: `Talking over coffee about ${interest}.`,
    register: "casual",
    lines: [
      { speaker: "Maya", role: "curious", line: pick(rng, [`So how did you get into ${interest}?`, `How long have you been into ${interest}?`]) },
      { speaker: "Leo", role: "warm", line: pick(rng, [`Since I was a kid, honestly.`, `A friend got me into it last year.`]) },
      { speaker: "Maya", role: "curious", line: pick(rng, [`What do you like most about it?`, `What's the best part for you?`]) },
      { speaker: "Leo", role: "thoughtful", line: pick(rng, [`The people and the stories, mostly.`, `Hard to say — probably the excitement.`]) },
      { speaker: "Maya", role: "inviting", line: pick(rng, [`We should do something with ${interest} this weekend.`, `Maybe we could enjoy some ${interest} together soon.`]) },
      { speaker: "Leo", role: "closing", line: pick(rng, [`I'd love that. Let's plan it.`, `Sounds great — count me in.`]) },
    ],
  }),
  (rng, topic) => ({
    scenario: "A friendly disagreement",
    setting: `A relaxed debate about ${topic}.`,
    register: "neutral",
    lines: [
      { speaker: "Maya", role: "assertive", line: pick(rng, [`Honestly, I think ${topic} is a bit overblown.`, `I'm not convinced ${topic} matters as much as they say.`]) },
      { speaker: "Leo", role: "challenging", line: pick(rng, [`Really? I see it completely differently.`, `Hmm, I'd push back on that.`]) },
      { speaker: "Maya", role: "probing", line: pick(rng, [`Okay, give me one solid reason.`, `Alright, convince me then.`]) },
      { speaker: "Leo", role: "reasoning", line: pick(rng, [`The coverage ignores the other side, for one.`, `There's evidence you're just not weighing.`]) },
      { speaker: "Maya", role: "conceding", line: pick(rng, [`Fair — I hadn't seen that perspective.`, `Okay, stronger point than I expected.`]) },
      { speaker: "Leo", role: "closing", line: pick(rng, [`See? That's why we compare sources.`, `Exactly. One story is never the whole story.`]) },
    ],
  }),
  (rng, topic) => ({
    scenario: "A quick interview",
    setting: `One friend interviews the other about ${topic}.`,
    register: "neutral",
    lines: [
      { speaker: "Maya", role: "interviewer", line: pick(rng, [`Can I ask what you think about ${topic}?`, `Quick question — how do you feel about ${topic}?`]) },
      { speaker: "Leo", role: "measured", line: pick(rng, [`Sure. It's more complex than people say.`, `Happily — my view changed recently, actually.`]) },
      { speaker: "Maya", role: "interviewer", line: pick(rng, [`What changed your mind?`, `What made you see it that way?`]) },
      { speaker: "Leo", role: "reflective", line: pick(rng, [`I read the same story from three countries.`, `I noticed how differently outlets framed it.`]) },
      { speaker: "Maya", role: "interviewer", line: pick(rng, [`And what did you learn?`, `So what's your takeaway?`]) },
      { speaker: "Leo", role: "closing", line: pick(rng, [`To always ask who benefits from the story.`, `That framing shapes what we feel first.`]) },
    ],
  }),
];

const NON_EN: Record<Exclude<LanguageCode, "en">, DialogueScript[]> = {
  fr: [
    {
      scenario: "Reacting to the news",
      setting: "Deux amis réagissent à un gros titre.",
      register: "casual",
      lines: [
        { speaker: "Maya", role: "curious", line: "As-tu vu la nouvelle ?", gloss: "Did you see the news?" },
        { speaker: "Leo", role: "engaged", line: "Oui, mais chaque site la raconte différemment.", gloss: "Yes, but every site tells it differently." },
        { speaker: "Maya", role: "reflective", line: "Le titre m'a semblé très émotionnel.", gloss: "The headline seemed very emotional to me." },
        { speaker: "Leo", role: "skeptical", line: "C'est le cadrage. Comparons une autre source.", gloss: "That's framing. Let's compare another source." },
        { speaker: "Maya", role: "closing", line: "Bonne idée. Regardons les titres ensemble.", gloss: "Good idea. Let's look at the headlines together." },
      ],
    },
    {
      scenario: "Do you trust the headlines?",
      setting: "Une conversation sur les médias.",
      register: "neutral",
      lines: [
        { speaker: "Maya", role: "curious", line: "Tu lis souvent les nouvelles ?", gloss: "Do you often read the news?" },
        { speaker: "Leo", role: "measured", line: "Oui, mais je ne fais pas toujours confiance aux titres.", gloss: "Yes, but I don't always trust the headlines." },
        { speaker: "Maya", role: "probing", line: "Pourquoi ?", gloss: "Why?" },
        { speaker: "Leo", role: "reasoning", line: "Parce que le cadrage change tout.", gloss: "Because framing changes everything." },
      ],
    },
  ],
  es: [
    {
      scenario: "Reacting to the news",
      setting: "Dos amigos reaccionan a un titular.",
      register: "casual",
      lines: [
        { speaker: "Maya", role: "curious", line: "¿Viste la noticia?", gloss: "Did you see the news?" },
        { speaker: "Leo", role: "engaged", line: "Sí, pero cada sitio la cuenta diferente.", gloss: "Yes, but each site tells it differently." },
        { speaker: "Maya", role: "reflective", line: "El titular me pareció muy emocional.", gloss: "The headline seemed very emotional." },
        { speaker: "Leo", role: "skeptical", line: "Eso es el enfoque. Comparemos otra fuente.", gloss: "That's framing. Let's compare another source." },
        { speaker: "Maya", role: "closing", line: "Buena idea. Miremos los titulares juntos.", gloss: "Good idea. Let's look at the headlines together." },
      ],
    },
    {
      scenario: "Do you trust the headlines?",
      setting: "Una conversación sobre los medios.",
      register: "neutral",
      lines: [
        { speaker: "Maya", role: "curious", line: "¿Lees las noticias a menudo?", gloss: "Do you read the news often?" },
        { speaker: "Leo", role: "measured", line: "Sí, pero no confío en todos los titulares.", gloss: "Yes, but I don't trust every headline." },
        { speaker: "Maya", role: "probing", line: "¿Por qué?", gloss: "Why?" },
        { speaker: "Leo", role: "reasoning", line: "Porque el enfoque lo cambia todo.", gloss: "Because framing changes everything." },
      ],
    },
  ],
  zh: [
    {
      scenario: "Reacting to the news",
      setting: "两个朋友在讨论一条新闻。",
      register: "casual",
      lines: [
        { speaker: "Maya", role: "curious", line: "你看到这条新闻了吗？", gloss: "Did you see this news?" },
        { speaker: "Leo", role: "engaged", line: "看到了，但每个网站说得都不一样。", gloss: "Yes, but every site says it differently." },
        { speaker: "Maya", role: "reflective", line: "这个标题让我觉得很有情绪。", gloss: "This headline felt very emotional to me." },
        { speaker: "Leo", role: "skeptical", line: "这就是框架。我们比较另一个来源吧。", gloss: "That's framing. Let's compare another source." },
        { speaker: "Maya", role: "closing", line: "好主意，我们一起看看标题。", gloss: "Good idea, let's look at the headlines together." },
      ],
    },
    {
      scenario: "Do you trust the headlines?",
      setting: "一段关于媒体的对话。",
      register: "neutral",
      lines: [
        { speaker: "Maya", role: "curious", line: "你常看新闻吗？", gloss: "Do you often read the news?" },
        { speaker: "Leo", role: "measured", line: "看，但我不完全相信标题。", gloss: "Yes, but I don't fully trust the headlines." },
        { speaker: "Maya", role: "probing", line: "为什么？", gloss: "Why?" },
        { speaker: "Leo", role: "reasoning", line: "因为框架会改变一切。", gloss: "Because framing changes everything." },
      ],
    },
  ],
  ja: [
    {
      scenario: "Reacting to the news",
      setting: "二人の友だちがニュースについて話します。",
      register: "casual",
      lines: [
        { speaker: "Maya", role: "curious", line: "あのニュース見た？", gloss: "Did you see that news?" },
        { speaker: "Leo", role: "engaged", line: "うん、でもサイトごとに書き方が違うね。", gloss: "Yes, but each site writes it differently." },
        { speaker: "Maya", role: "reflective", line: "この見出し、とても感情的に感じた。", gloss: "This headline felt very emotional." },
        { speaker: "Leo", role: "skeptical", line: "それがフレーミングだよ。別の情報源と比べよう。", gloss: "That's framing. Let's compare another source." },
        { speaker: "Maya", role: "closing", line: "いいね、一緒に見出しを見てみよう。", gloss: "Good, let's look at the headlines together." },
      ],
    },
    {
      scenario: "Do you trust the headlines?",
      setting: "メディアについての会話。",
      register: "neutral",
      lines: [
        { speaker: "Maya", role: "curious", line: "よくニュースを読みますか。", gloss: "Do you often read the news?" },
        { speaker: "Leo", role: "measured", line: "はい、でも見出しは全部は信じません。", gloss: "Yes, but I don't believe every headline." },
        { speaker: "Maya", role: "probing", line: "どうして？", gloss: "Why?" },
        { speaker: "Leo", role: "reasoning", line: "フレーミングで印象が変わるからです。", gloss: "Because framing changes the impression." },
      ],
    },
  ],
  ko: [
    {
      scenario: "Reacting to the news",
      setting: "두 친구가 뉴스에 대해 이야기해요.",
      register: "casual",
      lines: [
        { speaker: "Maya", role: "curious", line: "그 뉴스 봤어?", gloss: "Did you see that news?" },
        { speaker: "Leo", role: "engaged", line: "응, 그런데 사이트마다 다르게 말해.", gloss: "Yes, but each site says it differently." },
        { speaker: "Maya", role: "reflective", line: "이 헤드라인은 너무 감정적으로 느껴졌어.", gloss: "This headline felt too emotional." },
        { speaker: "Leo", role: "skeptical", line: "그게 프레이밍이야. 다른 출처랑 비교해 보자.", gloss: "That's framing. Let's compare another source." },
        { speaker: "Maya", role: "closing", line: "좋은 생각이야, 같이 헤드라인을 보자.", gloss: "Good idea, let's look at the headlines." },
      ],
    },
    {
      scenario: "Do you trust the headlines?",
      setting: "미디어에 대한 대화.",
      register: "neutral",
      lines: [
        { speaker: "Maya", role: "curious", line: "뉴스를 자주 봐요?", gloss: "Do you read the news often?" },
        { speaker: "Leo", role: "measured", line: "네, 그런데 헤드라인을 다 믿지는 않아요.", gloss: "Yes, but I don't believe every headline." },
        { speaker: "Maya", role: "probing", line: "왜요?", gloss: "Why?" },
        { speaker: "Leo", role: "reasoning", line: "프레이밍이 모든 걸 바꾸니까요.", gloss: "Because framing changes everything." },
      ],
    },
  ],
  ar: [
    {
      scenario: "Reacting to the news",
      setting: "صديقان يتحدثان عن خبر.",
      register: "casual",
      lines: [
        { speaker: "Maya", role: "curious", line: "هل رأيت الخبر؟", gloss: "Did you see the news?" },
        { speaker: "Leo", role: "engaged", line: "نعم، لكن كل موقع يرويه بشكل مختلف.", gloss: "Yes, but each site tells it differently." },
        { speaker: "Maya", role: "reflective", line: "بدا لي العنوان عاطفيًا جدًا.", gloss: "The headline seemed very emotional to me." },
        { speaker: "Leo", role: "skeptical", line: "هذا هو التأطير. لنقارن مصدرًا آخر.", gloss: "That's framing. Let's compare another source." },
        { speaker: "Maya", role: "closing", line: "فكرة جيدة، لننظر إلى العناوين معًا.", gloss: "Good idea, let's look at the headlines together." },
      ],
    },
    {
      scenario: "Do you trust the headlines?",
      setting: "حوار حول وسائل الإعلام.",
      register: "neutral",
      lines: [
        { speaker: "Maya", role: "curious", line: "هل تقرأ الأخبار كثيرًا؟", gloss: "Do you read the news often?" },
        { speaker: "Leo", role: "measured", line: "نعم، لكنني لا أثق بكل العناوين.", gloss: "Yes, but I don't trust every headline." },
        { speaker: "Maya", role: "probing", line: "لماذا؟", gloss: "Why?" },
        { speaker: "Leo", role: "reasoning", line: "لأن التأطير يغيّر كل شيء.", gloss: "Because framing changes everything." },
      ],
    },
  ],
};

export function buildDialogue(
  rng: Rng,
  lang: LanguageCode,
  topic: string,
  interest: string,
  vocab: VocabEntry[]
): DialogueScript {
  if (lang === "en") {
    return pick(rng, enScenarios)(rng, topic, interest, vocab);
  }
  return pick(rng, NON_EN[lang]);
}
