import { Schema, model } from "mongoose";
export const CHAT_ROOM_TYPES = {
  USER_TO_USER: "user-to-user",
  USER_TO_ADMIN: "user-to-admin",
};
const chatRoomSchema = Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "Userr" }],
    type: String,
    chatInitiator: { type: Schema.Types.ObjectId, ref: "Userr" },
  },
  { timestamps: true }
);
chatRoomSchema.statics.initiateChat = async function (
  members,
  type,
  chatInitiator
) {
  try {
    const availableRoom = await this.findOne({
      members: {
        $size: members.length,
        $all: [...members],
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

    const newRoom = await this.create({ members, type, chatInitiator });
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
chatRoomSchema.statics.getUserCurrentRooms = async function (userId) {
  try {
    const rooms = await this.find({
      members: { $in: [userId] },
    })
      .populate("members")
      .populate("chatInitiator");
    // console.log(rooms);
    return rooms;
  } catch (error) {
    throw error;
  }
};
const ChatRoom = model("ChatRoom", chatRoomSchema);
export default ChatRoom;
