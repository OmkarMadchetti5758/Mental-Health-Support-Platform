const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post(
  "/signup",
  [
    check("userName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.signup
);

router.post(
  "/login",
  [check("userName").not().isEmpty(), check("password").isLength({ min: 6 })],
  userController.login
);

module.exports = router;
