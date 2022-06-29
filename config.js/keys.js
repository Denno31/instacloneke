// module.exports = {
//   MONGOURI:
//     "mongodb+srv://dennis:dennis123@cluster0-puyjt.mongodb.net/instaclone?retryWrites=true&w=majority",
//   JWT_SECRET: "adfadfadfaedf",
// };
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}

