//utils
import express from "express";

//controllers
import { handleRefreshToken } from "../controllers/refreshToken-controller.js";

const router = express.Router();

router.get("/", handleRefreshToken);
export default router;
