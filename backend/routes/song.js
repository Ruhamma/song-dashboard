const express = require("express");
const songRouter = express.Router();
const Song = require("../models/Song");
const { Error } = require("mongoose");

//Get all songs
songRouter.get("/", async (req, res) => {
  try {
    const song = Song.find();
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Get a specific song
songRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json(song);
  } catch (err) {
    if (err instanceof Error.CastError) {
      return res.status(400).json({ message: "Invalid song ID" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Create a song
songRouter.post("/", async (req, res) => {
  const song = new Song(req.body);
  try {
    const newSong = await song.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Edit song
songRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findByIdAndUpdate(id, req.body, { new: true });
    if (!song) {
      return res.status(404).json({ message: "Song does not exist" });
    }
    res.json(song);
  } catch (err) {
    if (err instanceof Error.CastError) {
      return res.status(400).json({ message: "Invalid song ID" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//Delete a song

songRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findByIdAndDelete(id);
    if (!song) {
      return res.status(404).json({ message: "Song does not exist" });
    }
    res.json({ message: "Song deleted successfully" });
  } catch (err) {
    if (err instanceof Error.CastError) {
      return res.status(400).json({ message: "Invalid song ID" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = songRouter;
