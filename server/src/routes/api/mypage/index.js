import express from "express";

import controller from "./mypage.controller.js";

const router = express.Router();

router.get("/", controller.get);

export default router;
