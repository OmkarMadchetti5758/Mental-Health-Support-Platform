const Therapist = require("../models/therapist.model");

const matchTherapist = async (req, res, next) => {
  const specialization = req.query.specialization;
  try {
    const therapist = await Therapist.find({
      specialization: { $in: specialization },
    });
    console.log(therapist);
    const therapistNames = therapist.map((t) => t.fullName);
    return res
      .status(200)
      .json({ message: "Found", therapist: therapistNames });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const addTherapist = async (req, res, next) => {
  const {
    fullName,
    bio,
    specialization,
    availability,
    contact,
    photoUrl,
    isVerified,
  } = req.body;

  if (!fullName || !bio || !specialization || !availability || !contact) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  let existingTherapist;
  try {
    existingTherapist = await Therapist.findOne({
      fullName: { $regex: new RegExp(`^${fullName}$`, "i") },
    });
    if (existingTherapist) {
      console.error("Error finding therapist:", err);
      return res.status(422).json({ message: "Therapist already exists" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }

  const createdTherapist = new Therapist({
    fullName,
    bio,
    specialization,
    availability,
    contact,
    photoUrl: photoUrl || "",
    isVerified: isVerified || false,
  });

  try {
    await createdTherapist.save();
    return res.status(201).json({
      message: "Therapist created successfully",
      data: createdTherapist,
    });
  } catch (err) {
    console.error("Error saving therapist:", err);
    return res.status(422).json({ message: "Cannot create therapist" });
  }
};

const updateTherapist = async (req, res, next) => {
  const { bio, specialization, availability, contact, photoUrl, isVerified } =
    req.body;

  if (!bio || !specialization || !availability || !contact) {
    return res.status(422).json({ message: "Missing required fields" });
  }

  let therapist;
  try {
    therapist = await Therapist.findByIdAndUpdate(req.params.id);
    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    therapist.bio = bio;
    therapist.specialization = specialization;
    therapist.availability = availability;
    therapist.contact = contact;
    therapist.photoUrl = photoUrl || therapist.photoUrl;
    therapist.isVerified = isVerified ?? therapist.isVerified;
    therapist = await therapist.save();
    return res
      .status(200)
      .json({ message: "Updated successfully", therapist });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { matchTherapist, addTherapist, updateTherapist };
