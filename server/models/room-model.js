import { Schema, model, Types } from "mongoose";
import { ROOM_TYPE } from "../constants/index.js";

const roomSchema = Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    name: String,
    chatInitiator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [ROOM_TYPE.PUBLIC, ROOM_TYPE.PRIVATE],
      default: () => ROOM_TYPE.PRIVATE,
    },
  },
  { timestamps: true }
);

roomSchema.statics.getAllRooms = async function () {
  return await this.find({});
};
roomSchema.statics.getAllRoomsByMemberId = async function (id) {
  return await this.aggregate([
    { $match: { members: new Types.ObjectId(id) } },
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "members",
      },
    },
    // {
    // $group: {
    //   _id: "$_id",
    //   postedBy: { $last: "$postedBy" },
    //   room: { $last: "$room" },
    //   message: { $last: "$text" },
    //   type: { $last: "$type" },
    //   readByRecipients: { $last: "$readByRecipients" },
    //   chatRoomInfo: { $addToSet: "$chatRoomInfo.userProfile" },
    //   createdAt: { $last: "$createdAt" },
    //   updatedAt: { $last: "$updatedAt" },
    // },
    // },
  ]);
};

roomSchema.statics.initiateRoom = async function (
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
        createdAt: availableRoom._doc.createdAt,
      };
    }

    const newRoom = await this.create({ members, type, chatInitiator });

    return {
      isNew: true,
      message: "creating a new chatroom",
      chatRoomId: newRoom._doc._id,
      type: newRoom._doc.type,
      createdAt: newRoom._doc.createdAt,
    };
  } catch (error) {
    console.log("error on start chat method", error);
    throw error;
  }
};
roomSchema.statics.getRoomByFied = async function (field) {
  return await this.findOne(field);
};
roomSchema.statics.getRoomById = async function (roomId) {
  // return await this.findOne({ _id: roomId });
  const result = await this.aggregate([
    { $match: { _id: new Types.ObjectId(roomId) } },
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "members",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "chatInitiator",
        foreignField: "_id",
        as: "chatInitiator",
      },
    },
    { $unwind: "$chatInitiator" },
    // {
    // $group: {
    // _id: "$_id",
    // postedBy: { $last: "$postedBy" },
    // room: { $last: "$room" },
    // message: { $last: "$text" },
    // type: { $last: "$type" },
    //       readByRecipients: { $last: "$readByRecipients" },
    //       chatRoomInfo: { $addToSet: "$chatRoomInfo.userProfile" },
    //       createdAt: { $last: "$createdAt" },
    //       updatedAt: { $last: "$updatedAt" },
    // },
    // },
  ]);
  return result[0];
};

roomSchema.statics.updateRoomById = async function (roomId, roomData) {
  return await this.updateOne({ _id: roomId }, { $set: roomData });
};

roomSchema.statics.deleteRoomById = async function (roomId) {
  return await this.deleteOne({ _id: roomId });
};

const RoomModel = model("Room", roomSchema);

export default RoomModel;
