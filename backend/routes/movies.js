import express from "express";
import Movie from "../models/MovieModel.js";

const router = express.Router();

// get all favourite movies
router.post("/getAll", async (req, res) => {
  const movies = await Movie.find({
    list: req.body.list,
    userId: req.body.userId,
  }).exec();
  res.status(200).json(movies);
});

// get movie-in-list
router.post("/checkLists", async (req, res) => {
  const movies = await Movie.find({
    movieId: req.body.movieId,
    userId: req.body.userId,
  }).exec();
  res.status(200).json(movies);
});

// add to favourite
router.post("/addToList", async (req, res) => {
  const { movieId, userId, list } = req.body;
  try {
    const movie = await Movie.create({ movieId, userId, list });
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete movie
router.delete("/deleteFromList", async (req, res) => {
  const movie = await Movie.findOneAndDelete({
    movieId: req.body.movieId,
    userId: req.body.userId,
    list: req.body.list,
  });
  res.status(200).json(movie);
});

export default router;
