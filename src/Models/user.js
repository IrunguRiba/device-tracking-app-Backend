const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  devices: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
