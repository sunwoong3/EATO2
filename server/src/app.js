import express from "express";
import routes from "#src/routes/index.js";

const app = express();
const port = 3002;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
