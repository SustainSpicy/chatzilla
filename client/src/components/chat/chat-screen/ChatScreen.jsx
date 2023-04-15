//utils
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { connect } from "react-redux";

//components
import { BottomRow, Centered, Head, TopRow } from "../../common/common";
import { SendIcon } from "../../svgIcons";
import { useChatContext } from "../../../providers/chat/ChatProvider";
import { CiSearch } from "react-icons/ci";
import ChatPanel from "./ChatPanel";

const ChatScreen = ({ authData }) => {
  const {
    currentChatRoom,
    chatRoom,
    utils,
    socket,
    chatText,
    setChatText,
    typing,
    requesting,
    SendChatMessage,
  } = useChatContext();
  const { name } = currentChatRoom || {};

  const handleInputChange = (e) => {
    e.preventDefault();
    setChatText(e.target.value);
  };
  const handleInputTyping = (e) => {
    e.preventDefault();

    utils.handleTyping(socket.current, authData, chatRoom);
  };
  const handleMessageSend = (e) => {
    e.preventDefault();
    SendChatMessage(chatRoom, currentChatRoom, authData);
  };

  return (
    <>
      <Top>
        <Head>
          <h2>{name}</h2>
          <span className="icons">
            <CiSearch />
          </span>
        </Head>
      </Top>
      {currentChatRoom ? (
        <ChatScreenDiv>
          <ChatPanel
            authData={authData}
            currentChatRoom={currentChatRoom}
            chatRoom={chatRoom}
            requesting={requesting}
            typing={typing}
          />

          {chatRoom && (
            <>
              <div
                style={{
                  fontSize: "12px",
                  margin: "0 5px",
                }}
              >
                {typing}
              </div>
              <SendMessage>
                <input
                  type="text"
                  name="chat"
                  onChange={handleInputChange}
                  value={chatText}
                  onKeyUp={handleInputTyping}
                  placeholder="Type here..."
                />
                <SendIcon onClick={handleMessageSend} />
              </SendMessage>
            </>
          )}
        </ChatScreenDiv>
      ) : (
        <ChatScreenDiv>
          <Centered>
            <div className="placeholderDiv">Start a Chart</div>
          </Centered>
        </ChatScreenDiv>
      )}
    </>
  );
};
const mapStateToProps = ({ auth }) => {
  return {
    authData: auth?.authData,
  };
};
export default connect(mapStateToProps)(ChatScreen);

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
  grid-template-rows: 1fr 20px 40px;
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
