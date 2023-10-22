const mongoose = require("mongoose");

const noCrownWinnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nationality: { type: String, required: true, trim: true },
    image: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
    collection: "winners",
  }
);

const NoCrownWinner = mongoose.model("NoCrwonWinner", noCrownWinnerSchema);
module.exports = NoCrownWinner;
