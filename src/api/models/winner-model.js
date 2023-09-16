const mongoose = require("mongoose");

const WinnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nationality: { type: String, required: true, trim: true },
    wins: { type: Array, required: true, trim: true },
    image: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
    collection: "winners",
  }
);

const Winner = mongoose.model("Winner", WinnerSchema);
module.exports = Winner;
