import express from "express";

import controller from "./chats.controller.js";
import protect from "#src/routes/middleware/index.js";

const router = express.Router();

router.get("/", protect, controller.chatList); // 채팅리스트 조회
router.get("/:chatId", protect, controller.enterChat); // 채팅 입장

export default router;
