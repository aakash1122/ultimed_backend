const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TipSchema = new Schema({
  title: {
    type: String,
    trim: true,
    minlength: 10,
  },
  desc: { type: String, trim: true, minlength: 100 },
  imageUrl: { type: String, trim: true },
  created_at: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "Doctor" },
});

const Tip = mongoose.model("Tips", TipSchema);

module.exports = Tip;
