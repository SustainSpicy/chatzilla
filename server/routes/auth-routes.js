//utils
import { Router } from "express";

//controllers
import authController from "../controllers/auth-controller.js";

let router = Router();

router.post("/login", authController.login);
router.get("/logout", authController.logout);

export default router;
