const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: "Invalid inputs passed" });
  }

  const { userName, password, role, privacySettings } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ userName });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Signup failed while searching user" });
  }

  if (existingUser) {
    if (existingUser.role === "student") {
      return res.status(422).json({ message: "Student already exists" });
    } else if (existingUser.role === "admin") {
      return res.status(422).json({ message: "Admin already exists" });
    }
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Signup failed while hashing password" });
  }

  const createdUser = new User({
    userName,
    password,
    role,
    privacySettings: {},
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Signup failed while creating User" });
  }

  return res
    .status(200)
    .json({
      message: `${createdUser.role} created`,
      user: createdUser.userName,
    });
};

module.exports = { signup };
