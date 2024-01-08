import express from "express";

import controller from "./mypage.controller.js";

const router = express.Router();

router.get("/:userId", controller.get);
router.patch("/modify", controller.patch);
router.delete("/delete", controller.delete);

export default router;
