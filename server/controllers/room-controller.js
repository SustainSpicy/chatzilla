//models
import RoomModel from "../models/room-model.js";
export default {
  getAllRooms: async (req, res) => {
    try {
      const rooms = await RoomModel.getAllRooms();
      res.status(200).json({ success: true, rooms });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  getAllRoomsByMemberId: async (req, res) => {
    const { memberId } = req.params;

    try {
      const room = await RoomModel.getAllRoomsByMemberId(memberId);
      // console.log(room);
      res.status(200).json({ success: true, room });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  getRoomById: async (req, res) => {
    const { roomId } = req.params;
    try {
      const room = await RoomModel.getRoomById(roomId);
      // console.log(room);
      res.status(200).json({ success: true, room });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  createRoom: async (req, res) => {
    const { members, type } = req.body;
    const { userId: chatInitiator } = req;

    const allUserIds = [...members, chatInitiator];

    try {
      const newRoom = await RoomModel.initiateRoom(
        allUserIds,
        type,
        chatInitiator
      );
      // console.log(newRoom);
      res.status(200).json({ success: true, newRoom });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  initializeRoom: async (req, res) => {
    console.log("initialize");
    const { roomId } = req.params;
    try {
      const room = await RoomModel.getRoomById(roomId);
      res.status(200).json({ success: true, room });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  updateRoom: async (req, res) => {
    const { roomId } = req.params;
    const { name, members, type } = req.body;
    try {
      const updatedRoom = await RoomModel.updateRoomById(roomId, {
        name,
        members,
        type,
      });
      res.status(200).json({ success: true, updatedRoom });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  deleteRoom: async (req, res) => {
    const { roomId } = req.params;
    try {
      const deletedRoom = await RoomModel.deleteRoomById(roomId);
      res.status(200).json({ success: true, deletedRoom });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
