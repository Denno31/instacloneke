const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js/keys");
const requireLogin = require("../middleware/requirelogin");
// router.get("/", requireLogin, (req, res) => {
//   res.send(req.user);
// });
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  try {
    const savedUser = await User.findOne({ email });
    if (savedUser) {
      return res.status(422).status(422).json({ error: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      name,
    });
    await user.save();
    res.status(200).json({ message: "successfully registered" });
  } catch (error) {
    console.log(error);
  }
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please provide email or password" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(422).json({ error: "invalid email or password" });
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(422).json({ error: "invalid email or password" });
    }
    const token = await jwt.sign({ _id: user._id }, JWT_SECRET);
    const { _id, name, followers, following } = user;
    res.json({
      message: "successfully signed in",
      token,
      user: { _id, email, name, followers, following },
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/auth", requireLogin, async (req, res) => {
  try {
    const { email } = req.user;
    const user = await await User.findOne({ email });
    if (!user) return res.status(422).json({ msg: "user not found" });
    const { _id, name, followers, following, profileImage } = user;
    res.json({
      user: { _id, email, name, followers, following, profileImage },
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
