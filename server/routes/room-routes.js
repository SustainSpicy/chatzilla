import { Router } from "express";
import roomController from "../controllers/room-controller.js";

const router = Router();

router
  .get("/", roomController.getAllRooms)
  .get("/:memberId", roomController.getAllRoomsByMemberId)
  .post("/", roomController.createRoom)
  .get("/:roomId", roomController.getRoomById)
  .post("/:roomId", roomController.initializeRoom)
  .put("/:roomId", roomController.updateRoom)
  .delete("/:roomId", roomController.deleteRoom);
export default router;
