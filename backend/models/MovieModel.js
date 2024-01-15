import mongoose from "mongoose";

const Schema = mongoose.Schema;
const MovieSchema = new Schema(
  {
    movieId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    list: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//module.exports = mongoose.model("movies", MovieSchema);
export default mongoose.model("movies", MovieSchema);
