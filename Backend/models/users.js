const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requird: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_At: {
    type: String,
    default: () => {
      return Date.now();
    },
  },
});

module.exports = mongoose.model("user", userSchema);
