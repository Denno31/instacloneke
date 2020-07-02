const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const User = mongoose.model("user");
const requireLogin = require("../middleware/requirelogin");

router.get("/user/:id", requireLogin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(404).json({ msg: "user not found" });
    const posts = await Post.find({ postedBy: req.params.id }).populate(
      "postedBy",
      "_id name"
    );
    res.json({ user, posts });
  } catch (error) {
    console.log(error);
  }
});
router.put("/follow", requireLogin, async (req, res) => {
  try {
    const follower = await User.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followers: req.user._id },
      },
      { new: true }
    );
    const following = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: req.body.followId },
      },
      { new: true }
    );

    res.json({ following });
  } catch (error) {
    console.log(error);
  }
});
router.put("/unfollow", requireLogin, async (req, res) => {
  try {
    const follower = await User.findByIdAndUpdate(
      req.body.unfollowId,
      {
        $pull: { followers: req.user._id },
      },
      { new: true }
    );
    const following = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: req.body.unfollowId },
      },
      { new: true }
    );

    res.json({ following });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
