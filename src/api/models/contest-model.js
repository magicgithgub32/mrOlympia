const mongoose = require("mongoose");

const ContestSchema = new mongoose.Schema(
  {
    year: { type: String, required: true, trim: true },

    winner: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
        ref: "Winner",
      },
    ],
    age: { type: Number, required: true, trim: true },
  },
  {
    timestamps: true,
    collection: "contests",
  }
);

const Contest = mongoose.model("Contest", ContestSchema);
module.exports = Contest;
