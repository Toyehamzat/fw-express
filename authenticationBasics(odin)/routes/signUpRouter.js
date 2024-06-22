const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Render signup form
router.get("/", (req, res) => {
  res.render("sign-up-form");
});

// Handle signup form submission
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.redirect("/"); // Redirect to home page or login page after signup
  } catch (error) {
    console.error(error);
    res.send("Error saving user");
  }
});

module.exports = router;
