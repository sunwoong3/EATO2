import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "#src/routes/index.js";

dotenv.config();

const app = express();
const { PORT, MONGO_URI } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

await mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

app.listen(PORT, () => {
  console.log(`EATO2 listening on PORT ${PORT}`);
});
