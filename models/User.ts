const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const userSchema = new Schema({
  email: {
    type: "string",
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid email address"],
    required: "Please enter a valid email address",
  },
  name: { type: "string", required: "Please enter a valid name", trim: true },
});

export const model = mongoose.model("User", userSchema)
