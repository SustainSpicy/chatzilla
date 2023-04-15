import { useEffect, useRef } from "react";
import RoomHeader from "./RoomHeader";
import { BottomRow, Centered } from "../../common/common";
import ChatCard from "./ChatCard";
import styled from "styled-components";
import SpinnerDot from "../../common/spinner/SpinnerDot";
import { useChatContext } from "../../../providers/chat/ChatProvider";

const ChatPanel = ({ authData, currentChatRoom, chatRoom, requesting }) => {
  const scroll = useRef();
  const { utils, socket } = useChatContext();

  // scroll to bottom
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatRoom]);

  const handleRead = (e, currentRoomData, socket) => {
    e.preventDefault();
    utils.readMessages(currentRoomData, socket);
  };

  if (currentChatRoom) {
    const { conversation } = chatRoom || [];

    return (
      <>
        <div
          style={{ overflow: "auto" }}
          onClick={(e) => handleRead(e, currentChatRoom, socket.current)}
        >
          <ChatDiv>
            <RoomHeader roomData={currentChatRoom} />
            {requesting ? (
              <Loading />
            ) : (
              <ChatCard
                innerRef={scroll}
                list={conversation}
                currentRoomData={currentChatRoom}
                authData={authData}
              />
            )}
          </ChatDiv>
        </div>
      </>
    );
  }
};
export default ChatPanel;
const Loading = () => {
  return (
    <Centered>
      <SpinnerDot />
    </Centered>
  );
};
const ChatDiv = styled(BottomRow)`
  background-color: ${({ theme }) => theme.chat_screen};
  padding: 5px;
  overflow: scroll;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom-right-radius: 10px;
`;
