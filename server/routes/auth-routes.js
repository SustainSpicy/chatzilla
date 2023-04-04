//utils
import express from "express";

//controllers
import auth from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/signin", auth.signIn);
router.get("/signout", auth.signOut);

export default router;
