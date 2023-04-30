import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDb = (cb) => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      return cb();
    })
    .catch((err) => {
      console.log(err);
      return cb(err);
    });
};
