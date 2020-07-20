const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TipSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  desc: String,
  created_at: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "Doctor" },
});

const Tip = mongoose.model("Tips", TipSchema);

module.exports = Tip;
