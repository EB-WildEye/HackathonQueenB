// server/seeds/redFlags.seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const RedFlagTopic = require("../models/RedFlagTopic");

const templates = [
  {
    _id: "self_harm",
    category: "red_flag",
    severity: "high",
    title: { he: "", ar: "", en: "" },
    keywords: { he: [], ar: [], en: [] },
    response_template: { he: "", ar: "", en: "" },
    actions: {
      hotline: { name: "ERAN", phone: "1201" },
      suggest_trusted_adult: true,
      suggest_emergency_if_immediate_danger: true
    }
  },
  {
    _id: "sexual_abuse",
    category: "red_flag",
    severity: "high",
    title: { he: "", ar: "", en: "" },
    keywords: { he: [], ar: [], en: [] },
    response_template: { he: "", ar: "", en: "" },
    actions: {
      hotline: { name: "ERAN", phone: "1201" },
      suggest_trusted_adult: true
    }
  },
  {
    _id: "eating_disorder",
    category: "red_flag",
    severity: "medium",
    title: { he: "", ar: "", en: "" },
    keywords: { he: [], ar: [], en: [] },
    response_template: { he: "", ar: "", en: "" },
    actions: {
      hotline: { name: "ERAN", phone: "1201" },
      suggest_content_library: true
    }
  },
  {
    _id: "sexual_pressure",
    category: "red_flag",
    severity: "medium",
    title: { he: "", ar: "", en: "" },
    keywords: { he: [], ar: [], en: [] },
    response_template: { he: "", ar: "", en: "" },
    actions: {
      hotline: { name: "ERAN", phone: "1201" },
      suggest_boundary_tips: true
    }
  },
  {
    _id: "loneliness_depression",
    category: "red_flag",
    severity: "medium",
    title: { he: "", ar: "", en: "" },
    keywords: { he: [], ar: [], en: [] },
    response_template: { he: "", ar: "", en: "" },
    actions: {
      hotline: { name: "ERAN", phone: "1201" },
      suggest_small_steps: true
    }
  },
  {
    _id: "identity_confusion",
    category: "red_flag",
    severity: "low",
    title: { he: "", ar: "", en: "" },
    keywords: { he: [], ar: [], en: [] },
    response_template: { he: "", ar: "", en: "" },
    actions: {
      hotline: { name: "ERAN", phone: "1201" },
      suggest_content_library: true
    }
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI in .env");

  await mongoose.connect(uri);

  // Upsert so you can run it multiple times safely
  for (const t of templates) {
    await RedFlagTopic.updateOne({ _id: t._id }, { $set: t }, { upsert: true });
  }

  console.log(`✅ Seeded ${templates.length} red-flag templates (no strings)`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
