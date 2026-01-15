const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    preferences: {
      topics: {
        type: [String],
        default: ["technology"]
      },
      language: {
        type: String,
        default: "en"
      },
      country: {
        type: String,
        default: "in"
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
