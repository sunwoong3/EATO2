import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "#src/routes/index.js";
import cors from "cors";

import { socket } from "./socket.js";

dotenv.config();

const app = express();
const socketOptions = {};
const corsOption = {
  origin: "http://localhost:3002",
  credentials: true,
};

const { PORT, MONGO_URI } = process.env;

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

await mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

let server = app.listen(PORT, () => {
  console.log(`EATO2 listening on PORT ${PORT}`);
});

socket(server, socketOptions, app);
