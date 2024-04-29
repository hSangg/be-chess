import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv/config";
import cors from "cors";
import router from "./routes/index.route.js";
import fileUpload from "express-fileupload";
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.info("Connected to the Db");
  })
  .catch((e) => {
    console.log("Error", e);
  });

//cloud
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
app.use(fileUpload({ useTempFiles: true }))
//router
app.use("", router);
app.listen(process.env.PORT, () => {
  console.log("listening on port ", process.env.PORT);
});
