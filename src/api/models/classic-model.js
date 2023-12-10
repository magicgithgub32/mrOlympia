const mongoose = require("mongoose");

const ClassicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nationality: { type: String, required: true, trim: true },
    wins: { type: Array, required: true, trim: true },
    image: { type: String, required: false, trim: true },
    era: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
    collection: "classics",
  }
);

const Classic = mongoose.model("Classic", ClassicSchema);
module.exports = Classic;
