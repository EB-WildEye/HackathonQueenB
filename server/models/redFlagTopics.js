// server/models/RedFlagTopic.js
const mongoose = require("mongoose");

const LocalizedStringSchema = new mongoose.Schema(
  {
    he: { type: String, default: "" },
    ar: { type: String, default: "" },
    en: { type: String, default: "" }
  },
  { _id: false }
);

const LocalizedStringArraySchema = new mongoose.Schema(
  {
    he: { type: [String], default: [] },
    ar: { type: [String], default: [] },
    en: { type: [String], default: [] }
  },
  { _id: false }
);

const ActionsSchema = new mongoose.Schema(
  {
    hotline: {
      name: { type: String, default: "ERAN" },
      phone: { type: String, default: "1201" }
    },
    suggest_trusted_adult: { type: Boolean, default: false },
    suggest_emergency_if_immediate_danger: { type: Boolean, default: false },
    suggest_content_library: { type: Boolean, default: false },
    suggest_boundary_tips: { type: Boolean, default: false },
    suggest_small_steps: { type: Boolean, default: false }
  },
  { _id: false }
);

const RedFlagTopicSchema = new mongoose.Schema(
  {
    // stable id like: self_harm, sexual_abuse, eating_disorder...
    _id: { type: String, required: true, trim: true },

    category: { type: String, default: "red_flag", trim: true },

    severity: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true
    },

    title: { type: LocalizedStringSchema, default: () => ({}) },

    // Keywords to match on (per language)
    keywords: { type: LocalizedStringArraySchema, default: () => ({}) },

    // What to send back when flagged (per language)
    response_template: { type: LocalizedStringSchema, default: () => ({}) },

    actions: { type: ActionsSchema, default: () => ({}) }
  },
  { timestamps: true, versionKey: false }
);

// Helpful index for quick filtering (optional)
RedFlagTopicSchema.index({ severity: 1 });
RedFlagTopicSchema.index({ category: 1 });

module.exports = mongoose.model("RedFlagTopic", RedFlagTopicSchema);
