import express from "express";

import chats from "#src/routes/api/chats/index.js";
import document from "#src/routes/api/document/index.js";
import notification from "#src/routes/api/notification/index.js";
import users from "#src/routes/api/users/index.js";

const router = express.Router();

router.use("/chats", chats);
router.use("/document", document);
router.use("/notification", notification);
router.use("/users", users);

export default router;
