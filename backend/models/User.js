const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Sttring,
    required: true,
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);