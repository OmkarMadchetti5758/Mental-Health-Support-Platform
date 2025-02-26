const mongoose = require("mongoose");

const therapistSchema = new mongoose.Schema({
  fullName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  specialization: {
    type: [String],
    required: true,
  },
  availability: {
    days: { type: [String], enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    hours: { type: [String] },
  },
  contact: {
    email: { type: String, required: true },
    phone: { type: Number },
  },
  photoUrl: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Therapist", therapistSchema);
