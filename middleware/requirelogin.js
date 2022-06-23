const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js/keys");
const User = require("mongoose").model("user");
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "you must be logged in" });
  const token = authorization.replace("Bearer ", "");
  try {
    const payload = await jwt.verify(token, JWT_SECRET);
    const { _id } = payload;
    const userData = await User.findById(_id, "-password");
    req.user = userData;
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ error: "you must be logged in" });
  }
};
