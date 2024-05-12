const mongoose = require("mongoose");

const SongSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  artist: {
    type: String,
    required: true,
  },
  albumTitle: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  genre: {
    type: String,
  },
  releaseYear: {
    type: Number,
  },
});

module.exports = mongoose.model("Song", SongSchema);
