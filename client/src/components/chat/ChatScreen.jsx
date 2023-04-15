//utils
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

//components
import { BottomRow, Centered, Head, TopRow } from "../common/common";
import SpinnerDot from "../common/spinner/SpinnerDot";
import ActiveChat from "./ActiveChat";
import { SendIcon } from "../svgIcons";
import { useChatContext } from "../../providers/chat/ChatProvider";
import moment from "moment";
import { CiSearch } from "react-icons/ci";

const ChatScreen = ({ authData }) => {
  const scroll = useRef();
  const {
    currentChatRoom,
    chatRoom,
    chatText,
    handleTyping,
    setChatText,
    typing,
    readMessages,
    requesting,
    handleMessageSend,
  } = useChatContext();

  const { username } = currentChatRoom;

  // scroll to bottom
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatRoom]);

  if (requesting) {
    return (
      <Centered>
        <SpinnerDot />
      </Centered>
    );
  }

  const RoomHeader = (roomData) => {
    const { username, createdAt, members } = currentChatRoom;

    return (
      <Head>
        <div
          style={{
            margin: "0 auto",
            textAlign: "center",
            fontSize: "12px",
          }}
        >
          <p>
            Chat with
            {username},
          </p>
          <p>Created: {moment(createdAt).fromNow()}</p>
          <p>{members?.length} total memebers</p>
        </div>
      </Head>
    );
  };
  const ChatPanel = ({ list, ref, currentRoomData }) => {
    if (list.length) {
      list.map((chat, index) => {
        return (
          <div
            ref={ref}
            key={index}
            onClick={(e) => readMessages(e, currentRoomData)}
          >
            <ActiveChat
              data={{ ...chat, ...currentRoomData }}
              authData={authData}
              typing={typing}
            />
          </div>
        );
      });
      return;
    }
    return "No chats to show";
  };
  if (chatRoom) {
    const { conversation } = chatRoom;
    return (
      <>
        <ChatScreenDiv>
          <div style={{ overflow: "auto" }}>
            <>
              <ChatDiv>
                <RoomHeader roomData={currentChatRoom} />
                <ChatPanel
                  list={[]}
                  ref={scroll}
                  currentRoomData={currentChatRoom}
                />
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "12px",
                  }}
                >
                  {typing}
                </div>
              </ChatDiv>
            </>
          </div>
          {/* <Centered> */}
          <SendMessage>
            <input
              type="text"
              name="chat"
              onChange={(e) => setChatText(e.target.value)}
              value={chatText}
              onKeyUp={handleTyping}
              placeholder="Type Here..."
            />
            <SendIcon onClick={handleMessageSend} />
          </SendMessage>
          {/* </Centered> */}
        </ChatScreenDiv>
      </>
    );
  }
  return (
    <>
      <Top>
        <Head>
          <h2>{username}</h2>
          <span className="icons">
            <CiSearch />
          </span>
        </Head>
      </Top>
      <ChatScreenDiv>
        <Centered>
          <div className="placeholderDiv">Start a Chart</div>
        </Centered>
      </ChatScreenDiv>
    </>
  );
};

export default ChatScreen;
const ChatDiv = styled(BottomRow)`
  background-color: ${({ theme }) => theme.chat_screen};
  padding: 5px;
  overflow: scroll;

  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom-right-radius: 10px;
`;
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
const ChatScreenDiv = styled(BottomRow)`
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
export const Top = styled(TopRow)`
  background-color: ${({ theme }) => theme.plain_white};
`;
