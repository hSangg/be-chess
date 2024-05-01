import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import router from "./routes/index.route.js";
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
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
app.use(fileUpload({ useTempFiles: true }));
//router
app.use("", router);
app.listen(process.env.PORT, () => {
  console.log("listening on port ", process.env.PORT);
});
