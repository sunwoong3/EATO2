import express from "express";

import api from "#src/routes/api/index.js";

const router = express.Router();

router.use("/v2", api);

export default router;
