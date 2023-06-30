import express from "express";
import mongoose from "mongoose";
import apiRoute, { apiProtected } from "./routes/api.js";
import { uri } from "./utils/constants.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from 'cors';

const app = express();

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const PORT = 3009;

app.use(cors());

app.use(express.json());

app.use("/api/", apiRoute);

app.use("/api/", AuthMiddleware, apiProtected);

app.listen(PORT, () => console.log("server is running"));
