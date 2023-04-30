//utils
import { Router } from "express";

//controllers
import userController from "../controllers/user-controller.js";

const router = Router();

router
  .get("/", userController.getAllUsers)
  .post("/", userController.createUser)
  .put("/:userId", userController.updateUser)
  .delete("/:userId", userController.deleteUser);
export default router;
