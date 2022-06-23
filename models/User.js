const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  profileImage: { type: String },
});
mongoose.model("user", userSchema);
