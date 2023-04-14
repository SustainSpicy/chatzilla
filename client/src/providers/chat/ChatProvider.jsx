//utils
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as api from "../../api/index";
import API from "../../api/index";
// import validation from "../../../utils/validation.js";
import io from "socket.io-client";

const ChatContext = createContext();

const ChatContextProvider = ({ children, authData }) => {
  const socket = useRef();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChatRoom, setCurrentChatRoom] = useState(null);
  const [activeChatList, setActiveChatList] = useState([]);
  const [allChatList, setAllChatList] = useState([]);
  const [chatRoom, setChatRoom] = useState(null);
  const [typing, setTyping] = useState(null);
  const [requesting, setRequesting] = useState(false);
  const [chatText, setChatText] = useState("");

  async function getAllUsers() {
    try {
      const { data } = await api.getAllUsersAPI();

      if (data) {
        setAllChatList(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getActiveUsers() {
    try {
      const { data } = await api.getAllActiveChatsAPI(authData.id);

      if (data) {
        setActiveChatList(data.rooms);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Get user's active chats
  // connect socket, getOnlineUsers
  useEffect(() => {
    if (authData) {
      getActiveUsers();
      getAllUsers();
    }
  }, [authData]);

  useEffect(() => {
    if (authData) {
      socket.current = io.connect(process.env.REACT_APP_BASE_URL);
      socket.current.emit("identity", authData?.id);
      socket.current.on("get-online-users", (users) => {
        setOnlineUsers(users);
      });
      // typing status
      socket.current.on("typing", (data) => {
        setTyping(
          <p>
            <em>{` ${data} is typing`}</em>
          </p>
        );
        setTimeout(() => {
          setTyping(null);
        }, 5000);
      });
      //send new message in chat
      socket.current.on("new_message", (data) => {
        console.log("new mess");
        setChatRoom((prevState) => ({
          ...prevState,
          conversation: [...prevState.conversation, data],
        }));
      });
      socket.current.on("message_read", (room) => {
        console.log("message_read");
        updateChat(room);
      });
    }

    return () => {};
  }, [authData]);

  async function updateChat(room) {
    console.log("new updateChat");

    try {
      const convo = await api.getAllConversationByRoomId(room.roomId);
      await setChatRoom((prevState) => ({
        ...prevState,
        conversation: convo.data.conversation,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  //handle socket activity(online/offline user)
  useEffect(() => {
    const handleFocus = () => {
      socket.current.emit("isActive", authData.id);
      socket.current.on("get-online-users", (users) => {
        setOnlineUsers(users);
      });
    };

    const handleBlur = () => {
      socket.current.emit("offline");
    };

    if (authData) {
      window.addEventListener("focus", handleFocus);
      window.addEventListener("blur", handleBlur);
    }

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [authData]);

  //check if current user is online
  const checkOnlineStatus = (chat, currentUser) => {
    const chatMember = chat?.members?.find(
      (member) => member?._id !== currentUser.id
    );
    const online = onlineUsers.find((user) => user.userId === chatMember?._id);
    return online ? true : false;
  };
  async function setScreen(room) {
    let focusedChat = room.members.find((member) => member._id !== authData.id);
    let chatRoomMeta = {
      roomId: room._id,
      username: focusedChat.username,
      chatInitiator: room.chatInitiator,
      members: room.members,
      otherMembers: focusedChat,
      createdAt: room.createdAt,
    };
    console.log(chatRoomMeta, "room");

    setCurrentChatRoom(chatRoomMeta);
    setRequesting(true);

    try {
      socket.current.emit("subscribe-to-chat", chatRoomMeta.roomId);
      const convo = await api.getAllConversationByRoomId(chatRoomMeta.roomId);

      console.log(convo.data);

      await setChatRoom({
        chatRoomId: chatRoomMeta.roomId,
        conversation: convo.data.conversation,
        users: chatRoomMeta.members,
      });

      setRequesting(false);
      await api.markRead(chatRoomMeta.roomId);
    } catch (error) {
      console.log(error);
      setRequesting(false);
    }
  }
  const handleMessageInitialize = async (e, room) => {
    e.preventDefault();
    console.log("init chat");

    if (room?.members) {
      setScreen(room);
    } else {
      setRequesting(true);
      let { data } = await api.initializeChat({
        members: [room._id],
      });
      if (data.success) {
        let result = await api.getRoomByIdAPI(data.chatRoom.chatRoomId);
        let { room } = result.data;
        setScreen(room);
      }
    }
  };

  const handleMessageSend = async (e) => {
    e.preventDefault();
    setTyping(null);
    if (chatText !== "") {
      let messageData = {
        chatRoomId: chatRoom.chatRoomId,
        created: Date.now(),
        message: { messageText: chatText },
        postedByUser: { _id: authData.id },
        readByRecipients: [currentChatRoom.otherMembers],
        type: "Text",
      };
      socket.current.emit("new_message", messageData);
      setChatText("");
      try {
        await api.postMessage(chatRoom.chatRoomId, {
          messageText: chatText,
        });
      } catch (error) {
        console.log(console.error());
      }
    }
  };

  const readMessages = (e, room) => {
    e.preventDefault();
    socket.current.emit("message_read", room);
  };
  const handleTyping = (e) => {
    e.preventDefault();

    socket.current.emit("typing", {
      username: authData.username,
      room: chatRoom.chatRoomId,
    });
  };
  const checkReadStatus = (data) => {
    let otherMembers = data?.otherMembers;

    var readStatus = data?.readByRecipients?.some(
      (member) => member.readByUserId === otherMembers._id
    );
    return readStatus;
  };

  return (
    <ChatContext.Provider
      value={{
        socket,
        requesting,
        typing,
        activeChatList,
        chatRoom,
        chatText,
        currentChatRoom,
        allChatList,
        readMessages,
        setActiveChatList,
        checkReadStatus,
        setChatText,
        getActiveUsers,
        getAllUsers,
        handleTyping,
        handleMessageSend,
        checkOnlineStatus,
        handleMessageInitialize,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
const mapStateToProps = ({ auth }) => {
  return {
    authData: auth?.authData,
  };
};

export default connect(mapStateToProps)(ChatContextProvider);

export const useChatContext = () => {
  return useContext(ChatContext);
};
