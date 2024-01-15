import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import movieRoutes from "./routes/movies.js";
import cors from "cors";

// express app
const app = express();

// middleware
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Acces-Control-Allow-Methods", "GET, POST, DELETE");
  res.header(
    "Acces-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());

// routes
app.use("/api/movies", movieRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database... OK!");
    // listen to port
    app.listen(() => {
      console.log(`Server... OK!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
