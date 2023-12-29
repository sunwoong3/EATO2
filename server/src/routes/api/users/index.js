import express from "express";
const router = express.Router();

import controller from "#src/routes/api/users/user.controller.js";
import protect from "#src/routes/middleware/index.js";

// users
// router.post("/signUp", controller.createUser, controller.validEmail);
router.post("/login", controller.userLogin);
router.get("/logout", protect, controller.logout);
router.get("/:kana", controller.socialLogin);

// router
//   .route("/userInfo")
//   .patch(protect, controller.updateProfile)
//   .delete(protect, controller.deleteUser);

export default router;
