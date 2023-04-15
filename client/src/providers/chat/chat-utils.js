import * as api from "../../api/index";
import API from "../../api/index";
import io from "socket.io-client";

export const socketActions = {
  identify_user: "identity",
  user_typing: "typing",
  get_active_users: "get-online-users",
  new_message: "new_message",
  message_read: "message_read",
  subscribe_to_chat: "subscribe-to-chat",
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
      (member) => member._id !== loggedUser.id
    );

    let chatRoomMeta = {
      id: _id,
      name: selectedUser.username,
      chatInitiator: chatInitiator,
      members: members,
      otherMembers: selectedUser,
      createdAt: createdAt,
    };

    return chatRoomMeta;
  },
  getOtherMembersFromArray: (obj, currentUser) => {
    return obj.find((member) => member._id !== currentUser.id);
  },
  populateChatScreen: async (chatRoomMeta, socket) => {
    const { id } = chatRoomMeta;
    const { subscribe_to_chat } = socketActions;

    try {
      socket.emit(subscribe_to_chat, id);
      const { data } = await api.getAllConversationByRoomId(id);
      //   console.log(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  },
  markMessagesRead: async (id) => {
    try {
      const { data } = await api.markRead(id);

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
  readMessages: (room, socket) => {
    const { message_read } = socketActions;
    socket.emit(message_read, room);
  },
  handleTyping: (socket, currentUser, currentChatroom) => {
    const { username } = currentUser;
    const { chatRoomId } = currentChatroom;
    const { user_typing } = socketActions;

    socket.emit(user_typing, {
      username: username,
      room: chatRoomId,
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
