import { Schema, model, Types } from "mongoose";
import { MESSAGE_TYPE } from "../constants/index.js";
const readBySchema = Schema(
  {
    _id: false,
    readByUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);
const messageSchema = Schema(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    messageText: { type: String, required: true },
    type: {
      type: String,
      default: () => MESSAGE_TYPE.TEXT,
    },
    readBy: [readBySchema],
  },
  { timestamps: true }
);

messageSchema.statics.getAllMessagesByRoomId = async function (roomId) {
  return await this.aggregate([
    { $match: { roomId: new Types.ObjectId(roomId) } },
    {
      $lookup: {
        from: "users",
        localField: "postedBy",
        foreignField: "_id",
        as: "postedBy",
      },
    },
    { $unwind: "$postedBy" },
    // {
    //   $lookup: {
    //     from: "rooms",
    //     localField: "roomId",
    //     foreignField: "_id",
    //     as: "roomId",
    //   },
    // },
    { $unwind: "$roomId" },
    {
      $group: {
        _id: "$_id",
        postedBy: {
          $last: {
            _id: "$postedBy._id",
            username: "$postedBy.username",
          },
        },
        room: { $last: "$roomId" },
        messageText: { $last: "$messageText" },
        type: { $last: "$type" },
        readBy: { $last: "$readBy" },
        createdAt: { $last: "$createdAt" },
        updatedAt: { $last: "$updatedAt" },
      },
    },
    { $sort: { createdAt: 1 } },
  ]);
};
messageSchema.statics.createMessage = async function (roomData) {
  return await this.create(roomData);
};

messageSchema.statics.getMessageByFied = async function (field) {
  return await this.findOne(field);
};
messageSchema.statics.getMessageById = async function (roomId) {
  return await this.findOne({ _id: roomId });
};

messageSchema.statics.updateMessageById = async function (messageId, roomData) {
  return await this.updateOne({ _id: messageId }, { $set: roomData });
};

messageSchema.statics.deleteMessageById = async function (messageId) {
  return await this.deleteOne({ _id: messageId });
};
messageSchema.statics.markMessageRead = async function (
  roomId,
  currentUserOnlineId
) {
  try {
    return this.updateMany(
      {
        roomId,
        "readBy.readByUserId": { $ne: currentUserOnlineId },
      },
      {
        $addToSet: {
          readBy: { readByUserId: currentUserOnlineId },
        },
      },
      {
        multi: true,
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const RoomModel = model("Message", messageSchema);

export default RoomModel;
