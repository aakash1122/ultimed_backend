const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 40,
  },
  licenceNo: {
    type: String,
    required: true,
    unique: true,
  },
  degree: {
    type: String,
    required: true,
  },
  chamberLocation: {
    type: String,
  },
  phone: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  tipses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tips" }],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
