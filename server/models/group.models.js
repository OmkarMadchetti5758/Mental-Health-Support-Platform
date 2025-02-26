const mongoose = require("mongoose");

const supportGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 300,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  discussionTopics: [
    {
      title: String,
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  maxMembers: { type: Number, default: 50 }, // limit group size
  schedule: {
    startDate: Date,
    recurrence: { type: String, enum: ["weekly", "biweekly", "monthly"] },
  },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("SupportGroup", supportGroupSchema);
