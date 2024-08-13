const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const appointment = require("./../models/appointment");

const userSchema = new Schema({
  firstName: {
    type: String,
    default: "NA",
    required: true,
  },
  lastName: { type: String, default: "NA", required: true },
  licenseNo: {
    type: String,
    default: "NA",
    required: true,
  },
  age: {
    type: Number,
    default: 0,
    unique: false,
    required: true,
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  carDetails: {
    make: { type: String, default: "NA", required: true },
    model: { type: String, default: "NA", required: true },
    year: { type: Number, default: 0, required: true },
    plateNo: { type: String, default: "NA", required: true },
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: appointment,
    required: false,
  },
  testType: { type: String },
  comment: { type: String },
  result: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("user", userSchema);
