const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Replace with your User model

// Register push token route
router.post("/send-notifications", async (req, res) => {
  try {
    const { token } = req.body;

    // Check if the token already exists
    let user = await User.findOne({ pushToken: token });
    if (!user) {
      user = new User({ pushToken: token });
      await user.save();
    }

    res.status(200).json({ message: "Push token registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
