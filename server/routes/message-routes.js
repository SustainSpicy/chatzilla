import { Router } from "express";
import messageController from "../controllers/message-controller.js";

const router = Router();

router
  .get("/:roomId", messageController.getAllMessagesInRoom)
  .post("/", messageController.createMessage)
  .put("/:messageId", messageController.updateMessage)
  .delete("/:messageId", messageController.deleteMessage)
  .put("/:roomId/mark-read", messageController.markConversationReadByRoomId);
export default router;
