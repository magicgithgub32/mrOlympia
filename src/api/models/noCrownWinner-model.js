const mongoose = require("mongoose");

const NoCrownWinnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nationality: { type: String, required: true, trim: true },
    era: { type: String, required: true, trim: true },
    image: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
    collection: "noCrownWinners",
  }
);

const NoCrownWinner = mongoose.model("NoCrownWinner", NoCrownWinnerSchema);
module.exports = NoCrownWinner;
