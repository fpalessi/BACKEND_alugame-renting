import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import carRoute from "./routes/car.js";
import rentalRoute from "./routes/rental.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const imgMiddleware = multer({ dest: "uploads/" });

app.use("/uploads", express.static(__dirname + "/uploads"));

// env files
dotenv.config();

// parse json
app.use(express.json());

// parse cookies
app.use(cookieParser());

// cors
app.use(
  cors({
    credentials: true,
    origin: "https://alugame.onrender.com",
    // origin: "http://127.0.0.1/5173",
  })
);

// db
mongoose.set("strictQuery", false).connect(process.env.MONGO_URI);

// routes
app.use("/users", userRoute);
app.use("/cars", carRoute);
app.use("/rentals", rentalRoute);

app.post("/upload", imgMiddleware.array("photos", 100), (req, res) => {
  // files are uploading to our server with no extension
  // renaming path so we add it a extension
  const imagesArray = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = `${path}.${extension}`;
    // rename path on server
    fs.renameSync(path, newPath);
    imagesArray.push(newPath.replace("uploads/", ""));
  }
  // if the imgMiddleware uploads anything, there's info inside our req (uploaded files)
  res.json(imagesArray);
});

// port
app.listen(4000);
