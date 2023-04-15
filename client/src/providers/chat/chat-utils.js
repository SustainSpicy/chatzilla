import * as api from "../../api/index";
import API from "../../api/index";
import io from "socket.io-client";

export const socketActions = {
  identify_user: "identity",
  user_typing: "typing",
  get_active_users: "get-online-users",
  new_message: "new_message",
  message_read: "message_read",
};

export default {
  getAllUsers: async () => {
    try {
      const { data } = await api.getAllUsersAPI();

      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getActiveUsers: async (id) => {
    try {
      const { data } = await api.getAllActiveChatsAPI(id);

      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getRoomById: async (id) => {
    try {
      const { data } = await api.getRoomByIdAPI(id);

      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getAllConversationInChatroom: async (id) => {
    try {
      const { data } = await api.getAllConversationByRoomId(id);

      return data;
    } catch (error) {
      console.error(error);
    }
  },
  checkOnlineStatus: (chat, onlineUsers, currentUser) => {
    const chatMember = chat?.members?.find(
      (member) => member?._id !== currentUser.id
    );
    const online = onlineUsers.find((user) => user.userId === chatMember?._id);
    return online ? true : false;
  },
  generateChatScreenObject: (room, loggedUser) => {
    const { _id, chatInitiator, members, createdAt } = room;
    let selectedUser = room.members.find(
      (member) => member._id !== loggedUser._id
    );
    let chatRoomMeta = {
      id: _id,
      name: selectedUser.username,
      chatInitiator: chatInitiator,
      members: members,
      otherMembers: selectedUser,
      createdAt: createdAt,
    };
    console.log(chatRoomMeta, "room");
    return chatRoomMeta;
  },
  populateChatScreen: async (chatRoomMeta, socket) => {
    try {
      socket.emit("subscribe-to-chat", chatRoomMeta.roomId);
      const { data } = await api.getAllConversationByRoomId(
        chatRoomMeta.roomId
      );
      console.log(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  },
  markMessagesRead: async (chatRoomMeta) => {
    try {
      const { data } = await api.markRead(chatRoomMeta.roomId);

      return data;
    } catch (error) {
      console.error(error);
    }
  },
  initializeChat: async (room) => {
    try {
      let { data } = await api.initializeChat({
        members: [room._id],
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  initializeSocket: (url) => {
    return io.connect(url);
  },
  intializeUserInSocket: (socket, userId) => {
    socket.emit(socketActions.identify_user, userId);
  },
  postNewMessage: async (id, chatText) => {
    let message = {
      messageText: chatText,
    };
    try {
      await api.postMessage(id, message);
    } catch (error) {
      console.error(error);
    }
  },
  readMessages: (e, room, socket) => {
    e.preventDefault();
    socket.emit(socketActions.message_read, room);
  },
  handleTyping: (e, socket, currentUser, currentChatroom) => {
    e.preventDefault();
    socket.emit("typing", {
      username: currentUser.username,
      room: currentChatroom.chatRoomId,
    });
  },
  checkReadStatus: (data) => {
    let otherMembers = data.otherMembers;

    var readStatus = data.readByRecipients.some(
      (member) => member.readByUserId === otherMembers._id
    );
    return readStatus;
  },
};
