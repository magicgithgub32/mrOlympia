const mongoose = require("mongoose");

const bbCinemaSchema = new mongoose.Schema(
  {
    bbName: { type: String, required: true, trim: true },
    movie: { type: String, required: true, trim: true },
    year: { type: Number, required: true, trim: true },
    picture: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    collections: "bbCinema",
  }
);

const BbCinema = mongoose.model("BbCinema", bbCinemaSchema);
module.exports = BbCinema;
