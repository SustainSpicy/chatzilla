// utils
import makeValidation from "@withvoid/make-validation";

//models
import ChatRoomModel, { CHAT_ROOM_TYPES } from "../models/chatRoom-model.js";
import UserModel from "../models/user-model.js";
import ChatMessageModel from "../models/chatMessage-model.js";

export default {
  initiate: async (req, res) => {
    console.log("initiate");
    try {
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          members: {
            type: types.array,
            options: { unique: true, empty: false, stringOnly: true },
          },
          // type: { type: types.enum, options: { enum: CHAT_ROOM_TYPES } },
        },
      }));

      if (!validation.success) return res.status(400).json({ ...validation });

      const { members, type } = req.body;
      const { userId: chatInitiator } = req;
      const allUserIds = [...members, chatInitiator];
      const chatRoom = await ChatRoomModel.initiateChat(
        allUserIds,
        type,
        chatInitiator
      );

      return res.status(200).json({ success: true, chatRoom });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error });
    }
  },
  postMessage: async (req, res) => {
    try {
      const { roomId } = req.params;
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          messageText: { type: types.string },
        },
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const messagePayload = {
        messageText: req.body.messageText,
      };
      const currentLoggedUser = req.userId;
      const post = await ChatMessageModel.createPostInChatRoom(
        roomId,
        messagePayload,
        currentLoggedUser
      );

      // global.io.emit("new_message", { message: post });

      // console.log("post", post);
      return res.status(200).json({ success: true, post });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error });
    }
  },
  getAllActiveChatsByUser: async (req, res) => {
    console.log("get all users by chat rooms");
    try {
      const { userId } = req.params;
      const rooms = await ChatRoomModel.getUserCurrentRooms(userId);
      return res.status(200).json({
        success: true,
        rooms,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  },
  getRecentConversation: async (req, res) => {},
  getAllConversationByRoomId: async (req, res) => {
    console.log("get convo");
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId);
      if (!room) {
        return res.status(400).json({
          success: false,
          message: "No room exists for this id",
        });
      }
      const users = await UserModel.getUserByIds(room.userIds);
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };
      const conversation = await ChatMessageModel.getConversationByRoomId(
        roomId,
        options
      );
      return res.status(200).json({
        success: true,
        conversation,
        users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  },
  markConversationReadByRoomId: async (req, res) => {
    console.log("read");
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId);
      if (!room) {
        return res.status(400).json({
          success: false,
          message: "No room exists for this id",
        });
      }

      const currentLoggedUser = req.userId;
      const result = await ChatMessageModel.markMessageRead(
        roomId,
        currentLoggedUser
      );

      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  },
  getRoomById: async (req, res) => {
    console.log("get room by id");
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId);
      return res.status(200).json({
        success: true,
        room,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  },
};
