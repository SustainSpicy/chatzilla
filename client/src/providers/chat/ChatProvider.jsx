//utils
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as api from "../../api/index";
import API from "../../api/index";
// import validation from "../../../utils/validation.js";
import io from "socket.io-client";
import { socketActions } from "./chat-utils";
import utils from "./chat-utils.js";
const ChatContext = createContext();

const ChatContextProvider = ({ children, authData }) => {
  const socket = useRef();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChatRoom, setCurrentChatRoom] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [chatRoom, setChatRoom] = useState(null);
  const [typing, setTyping] = useState(null);
  const [requesting, setRequesting] = useState(false);
  const [chatText, setChatText] = useState("");
  const { user_typing, get_active_users, new_message, message_read } =
    socketActions;

  useEffect(() => {
    async function fetchData() {
      let activeChat = await utils.getActiveUsers(authData.id);
      let allUsers = await utils.getAllUsers();

      if (activeChat.success) setActiveUsers(activeChat.rooms);
      if (allUsers.success) setAllUsers(allUsers.users);
    }
    // if (authData) {
    //   fetchData();
    // }
  }, [authData]);

  useEffect(() => {
    if (authData) {
      socket.current = utils.initializeSocket(process.env.REACT_APP_BASE_URL);
      utils.intializeUserInSocket(socket.current, authData?.id);

      //set active users
      socket.current.on(get_active_users, (users) => {
        setOnlineUsers(users);
      });
      // typing status
      socket.current.on(user_typing, (data) => {
        setTyping(
          <p>
            <em>{` ${data} is typing`}</em>
          </p>
        );
        setTimeout(() => {
          setTyping(null);
        }, 5000);
      });
      //add new message in to message list
      socket.current.on(new_message, (data) => {
        setChatRoom((prevState) => ({
          ...prevState,
          conversation: [...prevState.conversation, data],
        }));
      });
      //update message list
      socket.current.on(message_read, (room) => {
        console.log("message_read");
        updateChat(room);
      });
    }
  }, [authData]);

  async function updateChat(room) {
    console.log("updateChat");
    const convo = await utils.getAllConversationInChatroom(room.roomId);
    console.log(convo);
    if (convo.success) {
      setChatRoom((prevState) => ({
        ...prevState,
        conversation: convo.data.conversation,
      }));
    }
  }

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

  async function populateChatScreen(room, loggedUser) {
    let chatRoomMeta = utils.generateChatScreenObject(room, loggedUser);
    setCurrentChatRoom(chatRoomMeta);
    setRequesting(true);
    let convo = await utils.populateChatScreen(chatRoomMeta, socket.current);
    if (convo.success) {
      setChatRoom({
        chatRoomId: chatRoomMeta.roomId,
        conversation: convo.data.conversation,
        users: chatRoomMeta.members,
      });

      setRequesting(false);
      await utils.markMessagesRead(chatRoomMeta);
      return;
    }
    setRequesting(false);
  }
  const handleMessageInitialize = async (e, room) => {
    e.preventDefault();
    console.log("init chat");
    const { members } = room;
    if (members) {
      populateChatScreen(room, authData);
    } else {
      setRequesting(true);

      let new_room = await utils.initializeChat(room);
      const { success, chatRoom } = new_room;
      const { chatRoomId } = chatRoom;

      if (success) {
        let fetchedRoom = await utils.getRoomById(chatRoomId);
        let { room } = fetchedRoom;
        populateChatScreen(room, authData);
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
      socket.current.emit(new_message, messageData);
      setChatText("");

      await utils.postNewMessage(
        chatRoom.chatRoomId,
        messageData.message.messageText
      );
    }
  };

  return (
    <ChatContext.Provider
      value={{
        utils,
        socket,
        requesting,
        typing,
        onlineUsers,

        chatRoom,
        chatText,
        currentChatRoom,

        setChatText,
        handleMessageSend,
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
