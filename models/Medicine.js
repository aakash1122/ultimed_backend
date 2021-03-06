const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
  },
  desc: { type: String, trim: true },
  groupName: { type: String, trim: true },
  company: { type: String, trim: true },
  date: { type: Date, default: Date.now },
  packSize: { type: Number, required: true },
  price: Number,
});

const Medicine = mongoose.model("Medicine", MedicineSchema);

module.exports = Medicine;
