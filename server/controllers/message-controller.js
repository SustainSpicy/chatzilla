//models
import MessageModel from "../models/message-model.js";
import RoomModel from "../models/room-model.js";
export default {
  getAllMessagesInRoom: async (req, res) => {
    const { roomId } = req.params;

    try {
      const messages = await MessageModel.getAllMessagesByRoomId(roomId);
      // console.log(messages);
      res.status(200).json({ success: true, messages });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  createMessage: async (req, res) => {
    const { roomId, messageText, type } = req.body;
    const { userId: postedBy } = req;

    try {
      const newRoom = await MessageModel.createMessage({
        postedBy,
        roomId,
        messageText,
        type,
      });
      res.status(200).json({ success: true, newRoom });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  markConversationReadByRoomId: async (req, res) => {
    console.log("read");
    try {
      const { roomId } = req.params;
      const room = await RoomModel.getRoomById(roomId);
      if (!room) {
        return res.status(400).json({
          success: false,
          message: "No room exists for this id",
        });
      }

      const currentLoggedUser = req.userId;
      const readResult = await MessageModel.markMessageRead(
        roomId,
        currentLoggedUser
      );

      return res.status(200).json({ success: true, data: readResult });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  },
  updateMessage: async (req, res) => {
    const { messageId } = req.params;
    const { name, members, author, room, text, type } = req.body;

    try {
      const updatedMessage = await MessageModel.updateMessageById(messageId, {
        name,
        members,
        author,
        room,
        text,
        type,
      });
      res.status(200).json({ success: true, updatedMessage });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  deleteMessage: async (req, res) => {
    const { messageId } = req.params;
    try {
      const deletedMessage = await MessageModel.deleteMessageById(messageId);
      res.status(200).json({ success: true, deletedMessage });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
