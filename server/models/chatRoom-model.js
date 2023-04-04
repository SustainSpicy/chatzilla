import { Schema, model } from "mongoose";
export const CHAT_ROOM_TYPES = {
  USER_TO_USER: "user-to-user",
  USER_TO_ADMIN: "user-to-admin",
};
const chatRoomSchema = Schema(
  {
    userIds: Array,
    type: String,
    chatInitiator: String,
  },
  { timestamps: true }
);
chatRoomSchema.statics.initiateChat = async function (
  userIds,
  type,
  chatInitiator
) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      type,
    });

    if (availableRoom) {
      return {
        isNew: false,
        message: "retrieving an old chat room",
        chatRoomId: availableRoom._doc._id,
        type: availableRoom._doc.type,
      };
    }

    const newRoom = await this.create({ userIds, type, chatInitiator });
    return {
      isNew: true,
      message: "creating a new chatroom",
      chatRoomId: newRoom._doc._id,
      type: newRoom._doc.type,
    };
  } catch (error) {
    console.log("error on start chat method", error);
    throw error;
  }
};
chatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
  try {
    const room = await this.findOne({ _id: roomId });
    return room;
  } catch (error) {
    throw error;
  }
};
const ChatRoom = model("ChatRoom", chatRoomSchema);
export default ChatRoom;
