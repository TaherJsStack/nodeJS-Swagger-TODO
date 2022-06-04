const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
require("mongoose-type-email");

const authSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "admin" },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  role: { type: String, required: true, default: "admin" },
  password: { type: String, required: true, trim: true, lowercase: true },
  createdAt: { type: Date, default: new Date() },
});

authSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Auth", authSchema);
