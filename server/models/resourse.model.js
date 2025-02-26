const mongoose = require("mongoose");

const resourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Mindfulness", "Stress", "Sleep", "Relationships"],
    default: "Mindfulness",
  },
  tags: [String], // e.g., ["meditation", "yoga"]
  author: {
    type: mongoose.Schema.Types.ObjectId, // admin who added the resource
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
//   popularity: {  // track views/usage
//     type: Number,
//     default: 0,
//   },
});

module.exports = mongoose.model("Resourse", resourseSchema);
