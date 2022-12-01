const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 70 },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    no_of_songs: { type: Number, required: true },
    image_url: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const AlbumModel = mongoose.model("album", albumSchema);
module.exports = { AlbumModel };
