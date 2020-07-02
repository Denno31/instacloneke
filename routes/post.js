const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require("../middleware/requirelogin");
router.post("/createpost", requireLogin, async (req, res) => {
  console.log(req.body);
  const { title, body, photo } = req.body;
  if (!title || !body || !photo) {
    return res.status(422).json({ err: "Please add all fields" });
  }
  const postedBy = req.user;
  const post = new Post({
    title,
    body,
    photo,
    postedBy,
  });
  try {
    await post.save();
    return res.json({ post });
  } catch (error) {
    console.log(error);
  }
});
router.get("/allpost", requireLogin, async (req, res) => {
  try {
    const result = await Post.find()
      .populate("postedBy", "-password")
      .populate("comments.postedBy", "_id name");
    res.json({ result });
  } catch (error) {
    console.log(error);
  }
});
router.get("/getSubPost", requireLogin, async (req, res) => {
  try {
    const result1 = await Post.find({
      postedBy: { $in: req.user.following },
    })
      .populate("postedBy", "-password")
      .populate("comments.postedBy", "_id name");
    const result2 = await Post.find({
      postedBy: req.user._id,
    })
      .populate("postedBy", "-password")
      .populate("comments.postedBy", "_id name");
    const result = [...result1, ...result2];
    res.json({ result });
  } catch (error) {
    console.log(error);
  }
});
router.get("/mypost", requireLogin, async (req, res) => {
  try {
    const result = await Post.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );
    res.json({ result });
  } catch (error) {
    console.log(error);
  }
});
router.put("/like", requireLogin, async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "-password")
      .exec();

    res.json({ result });
  } catch (error) {
    console.log(error);
  }
});
router.put("/unlike", requireLogin, async (req, res) => {
  console.log(typeof req.user._id);
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "-password")
      .exec();

    res.json({ result });
  } catch (error) {
    console.log(error);
  }
});
router.put("/comment", requireLogin, async (req, res) => {
  console.log(req.user._id);
  const comment = {
    text: req.body.text,
    postedBy: req.user,
  };
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "-password");
    console.log(result);
    res.json({ result });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/deletepost/:postId", requireLogin, async (req, res) => {
  try {
    const post = await await Post.findOne({ _id: req.params.postId }).populate(
      "postedBy",
      "_id"
    );

    if (!post) return res.status(422).json({ msg: "post not found" });
    if (post.postedBy._id.toString() === req.user._id.toString()) {
      const result = await post.remove();
      res.json({ result });
    } else {
      res.status(401).json({ msg: "you are not authorized" });
    }
  } catch (error) {
    console.log(error);
  }
});
router.put("/deletecomment/:commentId", requireLogin, async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.commentId);
  console.log(typeof id);
  try {
    // const result = await Post.findByIdAndUpdate(
    //   req.body.postId,
    //   {
    //     $pull: { comments: id },
    //   },
    //   { new: true }
    // )
    //   .populate("comments.postedBy", "_id name")
    //   .populate("postedBy", "-password")
    //   .exec();

    // res.json({ result });
    let post = await Post.findById(req.body.postId)
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "-password")
      .exec();
    const comments = post.comments;
    const filtered = comments.filter(
      (c) => c._id.toString() !== req.params.commentId.toString()
    );
    post.comments = filtered;
    await post.save();
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
