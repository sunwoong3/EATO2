import express from "express";
const router = express.Router();
import api from "#src/routes/api/index.js";

router.use("/v2", api);

export default router;
