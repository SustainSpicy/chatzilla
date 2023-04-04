//utils
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import * as api from "../../api/index";
import API from "../../api/index";
import moment from "moment";
import { connect } from "react-redux";
import io from "socket.io-client";
import { socket } from "../../utils/socket";

//icons
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

//components
import ActiveChat from "../../components/chat/ActiveChat";
import ChatHead from "../../components/chat/ChatHead";
import {
  BottomRow,
  Centered,
  Head,
  Spinner,
  TopRow,
} from "../../components/common/common";
import SpinnerDot from "../../components/common/spinner/SpinnerDot";
import { SendIcon } from "../../components/svgIcons";

const MessagesTab = ({ authData }) => {
  const [chatList, setChatList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [chatRoom, setChatRoom] = useState(null);
  const [chatText, setChatText] = useState("");
  const [typing, setTyping] = useState(null);
  const [requesting, setRequesting] = useState(false);
  const messageEl = useRef(null);

  API.interceptors.request.use((req) => {
    if (authData) {
      req.headers.authorization = `Bearer ${authData.authorization}`;
    }

    return req;
  });

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    messageEl.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatRoom]);
  useEffect(() => {
    async function getUsers() {
      const result = await api.getAllUsersAPI();

      const { data } = result;
      if (data) {
        setChatList(data.users);
      }
    }

    if (authData) {
      getUsers();
    }

    return () => {};
  }, [authData]);

  useEffect(() => {
    const socket = io.connect("http://localhost:5000");

    socket.on("typing", (username) => {
      setTyping(username);
      setTimeout(() => {
        setTyping(null);
      }, 3000);
    });
    socket.on("new_message", (data) => {
      // console.log("new_message", data);

      setChatRoom((prevState) => ({
        ...prevState,
        conversation: [...prevState.conversation, data.message],
      }));
      // setMessageList((list) => [...list, data.message]);
    });

    return () => {};
  }, []);

  const handleMessageInitialize = async (e, userId) => {
    e.preventDefault();
    console.log("init chat");
    setRequesting(true);
    setMessageList([]);
    try {
      const result = await api.initializeChat({
        userIds: [userId],
        type: "user-to-user",
      });
      const { data } = await result;

      if (data.success) {
        const result2 = await api.getConversationByRoomId(
          data.chatRoom.chatRoomId
        );

        // console.log(result2.data);

        await setChatRoom({
          chatRoomId: data.chatRoom.chatRoomId,
          conversation: result2.data.conversation,
          users: result2.data.users,
        });
        setRequesting(false);
      }
    } catch (error) {
      setRequesting(false);
    }
  };
  const handleMessageSend = async (e) => {
    e.preventDefault();
    if (chatText !== "") {
      console.log("Send message");

      setChatText("");
      const result = await api.postMessage(chatRoom.chatRoomId, {
        messageText: chatText,
      });
      // console.log(result.data);
    }
  };

  const handleTyping = (e) => {
    e.preventDefault();

    // socket.emit("typing", authData.username);
  };
  return (
    <Container>
      <Left>
        <Top>
          <Head>
            {/* <h2>Message</h2> */}

            <span className="icons">
              {/* <CiSearch /> */}
              {/* <CiSearch /> */}
            </span>
          </Head>
        </Top>
        <Bottom>
          <Header>
            <BsFillChatLeftTextFill />
            <span>All Messages</span>
          </Header>
          {chatList.length ? (
            chatList.map((item) => {
              return (
                <ChatHead
                  key={item._id}
                  title={item.username}
                  typing={typing === item.username}
                  msg=""
                  status={0}
                  isOnline={item.isOnline}
                  time=""
                  onClick={(e) => handleMessageInitialize(e, item._id)}
                />
              );
            })
          ) : (
            <Centered>
              <SpinnerDot />
            </Centered>
          )}
        </Bottom>
      </Left>
      <Right>
        <Top>
          <Head>
            <h2>Message</h2>

            <span className="icons">
              <CiSearch />
              {/* <CiSearch /> */}
            </span>
          </Head>
        </Top>
        {requesting ? (
          <Centered>
            <SpinnerDot />
          </Centered>
        ) : (
          <ChatScreen>
            {!chatRoom ? (
              <Centered>
                <div className="placeholderDiv">Start a Chart</div>
              </Centered>
            ) : (
              <>
                <div style={{ overflow: "auto" }}>
                  {chatRoom && (
                    <>
                      <ChatDiv ref={messageEl}>
                        <Head>
                          {`Welcome to chatroom ${chatRoom?.chatRoomId.substring(
                            0,
                            6
                          )}...,  ${chatRoom?.users?.length}  total memebers`}

                          <p>{}</p>
                        </Head>
                        {chatRoom?.conversation.map((chat, index) => {
                          // console.log(chat);
                          return (
                            <ActiveChat
                              key={index}
                              title={chat?.postedByUser?.username}
                              msg={chat?.message?.messageText}
                              status={0}
                              typing={typing === chat?.username}
                              time={moment(chat?.createdAt).fromNow()}
                              isAuth={chat?.postedByUser?._id === authData.id}
                            />
                          );
                        })}
                        {/* {messageList?.map((chat, index) => {
                    // console.log(chat.postedByUser.username);

                    return (
                      <ActiveChat
                        key={index}
                        title={chat.postedByUser.username}
                        msg={chat.message.messageText}
                        status={0}
                        typing={typing === chat.username}
                        time={moment(chat.createdAt).fromNow()}
                        isAuth={chat.postedByUser._id ==1
                          4= authData.id}
                      />
                    );
                  })} */}
                        <div ref={messageEl}></div>
                      </ChatDiv>
                    </>
                  )}
                </div>
                <Centered>
                  <SendMessage>
                    <input
                      type="text"
                      name="chat"
                      onChange={(e) => setChatText(e.target.value)}
                      value={chatText}
                      onKeyUp={handleTyping}
                    />
                    <SendIcon onClick={handleMessageSend} />
                  </SendMessage>
                </Centered>
              </>
            )}
          </ChatScreen>
        )}
      </Right>
    </Container>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authData: auth?.authData,
  };
};
export default connect(mapStateToProps)(MessagesTab);
const SendMessage = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  grid-template-rows: 100%;
  grid-column: 20px;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 5px;
  /* border-radius: 10px; */
  background-color: #40414f;

  & > input {
    border-radius: 5px;
    background-color: transparent;
    border: none;
    outline: none;
    height: 100%;
    color: white;
    padding: 10px;
  }

  & svg {
    width: 30px;
    height: 30px;
    border-width: 50px;
    background-size: 10px;
    border-radius: 10px;
    transition: 0.3s;
    cursor: pointer;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  gap: 5px;
  color: ${({ theme }) => theme.icon_gray};
  & > span {
    display: none;
    //Laptops and Desktops
    @media only screen and (min-width: 960px) and (max-width: 1279px) {
      display: block;
    }
    //Large Desktops and TVs
    @media only screen and (min-width: 1280px) {
      display: block;
    }
  }
  //Mobile Phones
  @media only screen and (max-width: 599px) {
  }
  //Tablets
  @media only screen and (min-width: 600px) and (max-width: 959px) {
  }
  //Laptops and Desktops
  @media only screen and (min-width: 960px) and (max-width: 1279px) {
    justify-content: flex-start;
  }
  //Large Desktops and TVs
  @media only screen and (min-width: 1280px) {
    justify-content: flex-start;
  }
`;
export const Wrapper = styled.section`
  height: 100%;
`;
const Left = styled(Wrapper)`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100px 1fr;
  gap: 1px;
  height: 100%;
`;
const Right = styled(Wrapper)`
  display: grid;
  grid-template-columns: 100fr;
  grid-template-rows: 100px 1fr;
  gap: 1px;
  height: 100%;
  overflow: hidden;
`;
const ChatDiv = styled(BottomRow)`
  background-color: ${({ theme }) => theme.chat_screen};
  padding: 5px;
  overflow: scroll;

  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom-right-radius: 10px;
`;
const ChatScreen = styled(BottomRow)`
  background-color: ${({ theme }) => theme.chat_screen};
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 40px;
  gap: 1px;
  overflow: hidden;

  & .placeholderDiv {
    font-size: 35px;
    margin: auto;
    opacity: 0.2;
    font-family: cursive;
  }
`;
const Top = styled(TopRow)`
  background-color: ${({ theme }) => theme.plain_white};
`;
const Bottom = styled(BottomRow)`
  padding: 1rem;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.plain_white};
`;

export const Container = styled.section`
  display: grid;
  grid-template-columns: 0 100%;
  grid-template-rows: 100%;
  gap: 1px;
  height: 100%;
  transition: all 0.5s ease-in-out;
  animation: slide 0.5s ease-in-out 1;
  //Mobile Phones
  @media only screen and (max-width: 599px) {
    /* grid-template-columns: 80px 1fr; */
  }
  //Tablets
  @media only screen and (min-width: 600px) and (max-width: 959px) {
    grid-template-columns: 200px 100fr;
  }
  //Laptops and Desktops
  @media only screen and (min-width: 960px) and (max-width: 1279px) {
    grid-template-columns: 250px 100fr;
  }
  //Large Desktops and TVs
  @media only screen and (min-width: 1280px) {
    grid-template-columns: 300px 100fr;
  }
  @keyframes slide {
    0% {
      transform: translateX(-100%);
    }
  }
`;
