import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import movieRoutes from "./routes/movies.js";
import cors from "cors";

// express app
const app = express();

// middleware
app.use();
app.use(express.json());

// routes
app.use("/api/movies", movieRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database... OK!");
    // listen to port
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server... OK!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
