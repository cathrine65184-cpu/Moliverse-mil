import { LearnerProfile, MentorProfile } from "./types";

export const mentors: MentorProfile[] = [
  {
    id: "emily",
    name: "Emily Tan",
    avatar: "👩🏻‍🎓",
    university: "National University of Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    speaks: ["English", "Mandarin"],
    teaches: ["English", "French"],
    interests: ["Football", "Climate Change", "Music"],
    intro: "I love discussing global news through language learning.",
    availability: "Weekends · 4 slots open",
  },
  {
    id: "luca",
    name: "Luca Moreau",
    avatar: "🧑🏻‍🏫",
    university: "Sorbonne University",
    country: "France",
    flag: "🇫🇷",
    speaks: ["French", "English", "Spanish"],
    teaches: ["French", "Spanish"],
    interests: ["Artificial Intelligence", "Climate Change", "Politics"],
    intro: "Let's read the same story from three countries and see what changes.",
    availability: "Weekday evenings · 3 slots open",
  },
  {
    id: "sara",
    name: "Sara Haddad",
    avatar: "🧕🏽",
    university: "American University of Beirut",
    country: "Lebanon",
    flag: "🇱🇧",
    speaks: ["Arabic", "English", "French"],
    teaches: ["Arabic", "English"],
    interests: ["Music", "Artificial Intelligence", "Football"],
    intro: "Media literacy is a survival skill — let's build it together.",
    availability: "Flexible · 5 slots open",
  },
];

// The default learner used for the "human connection" demo (mock, no auth).
export const currentLearner: LearnerProfile = {
  name: "Aisyah",
  avatar: "🧑🏽‍💻",
  country: "Malaysia",
  flag: "🇲🇾",
  native: "Malay",
  learning: ["French", "English"],
  goals: "Understand international news and study abroad.",
  interests: ["Football", "Climate Change", "Music"],
  intro:
    "I'm from Malaysia and I'm learning French through international news.",
};

/** Interests shared between the learner and a mentor — used to show why they match. */
export function sharedInterests(mentor: MentorProfile): string[] {
  return mentor.interests.filter((i) => currentLearner.interests.includes(i));
}
