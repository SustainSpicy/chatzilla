//utils
import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

//components
import { BottomRow, Centered } from "../common/common";
import ChatHead from "./ChatHead";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import SpinnerDot from "../common/spinner/SpinnerDot";

//providers
import { useChatContext } from "../../providers/chat/ChatProvider";
import { useState } from "react";

const ChatList = ({ authData }) => {
  const {
    activeChatList,
    checkOnlineStatus,
    handleMessageInitialize,
    allChatList,
    getAllUsers,
    getActiveUsers,
  } = useChatContext();
  const [activeScreen, setActiveScreen] = useState(true);

  useEffect(() => {
    if (activeScreen) {
      getActiveUsers();
    }
    getAllUsers();

    return () => {};
  }, [activeScreen]);

  return (
    <>
      <Bottom>
        <Header>
          <span onClick={() => setActiveScreen(true)}>All Messages</span>|
          <span onClick={() => setActiveScreen(false)}>All Users</span>
        </Header>
        {activeScreen ? (
          activeChatList.length ? (
            activeChatList.map((item) => {
              return (
                <ChatHead
                  key={item._id}
                  data={item}
                  authUser={authData}
                  isOnline={checkOnlineStatus(item, authData)}
                  onClick={(e) => handleMessageInitialize(e, item)}
                  active={true}
                />
              );
            })
          ) : (
            <Centered>
              <SpinnerDot />
            </Centered>
          )
        ) : allChatList.length ? (
          allChatList.map((item) => {
            return (
              <ChatHead
                key={item._id}
                data={item}
                authUser={authData}
                isOnline={checkOnlineStatus(item, authData)}
                onClick={(e) => handleMessageInitialize(e, item)}
                active={false}
              />
            );
          })
        ) : (
          <Centered>
            <SpinnerDot />
          </Centered>
        )}
      </Bottom>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authData: auth?.authData,
  };
};
export default connect(mapStateToProps)(ChatList);

const Wrapper = styled.section``;
const Bottom = styled(BottomRow)`
  background-color: #fff;
  padding: 15px;
  overflow-y: scroll;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  gap: 5px;
  color: ${({ theme }) => theme.icon_gray};
  & > span {
    cursor: pointer;
  }
`;
const Body = styled.div``;
