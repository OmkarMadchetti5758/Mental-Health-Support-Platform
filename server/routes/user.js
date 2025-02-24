const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/userController");
const router = express.Router();

router.post(
  "/signup",
  [check("userName").not().isEmpty(), check("password").isLength({ min: 6 })],
  userController.signup
);

module.exports = router;
