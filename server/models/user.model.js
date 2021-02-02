const mongoose = require("mongoose");
const { tagSchema, taskSchema } = require("./tasks.model.js");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
    },
    statuses: [tagSchema],
    tasks: [taskSchema],
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
    },
  },
  {}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
