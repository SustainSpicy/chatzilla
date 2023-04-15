//utils
import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

//components
import { BottomRow, Centered } from "../common/common";
import ChatHead from "./ChatHead";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import SpinnerDot from "../common/spinner/SpinnerDot";
import { Head, TopRow } from "../../components/common/common";

//providers
import { useChatContext } from "../../providers/chat/ChatProvider";
import { useState } from "react";

const ChatList = ({ authData }) => {
  const {
    checkOnlineStatus,
    handleMessageInitialize,
    onlineUsers,
    getAllUsers,
    getActiveUsers,
    utils,
  } = useChatContext();
  const [tab, setTab] = useState(0);
  const [activeChats, setActiveChats] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [requesting, setRequesting] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let activeChat = await utils.getActiveUsers(authData.id);
      let allUsers = await utils.getAllUsers();

      if (activeChat.success) setActiveChats(activeChat.rooms);
      if (allUsers.success) setAllUsers(allUsers.users);
    }
    if (authData) {
      setRequesting(true);
      fetchData();
      setRequesting(false);
    }
  }, [authData, tab]);

  const TabPanel = ({ tab }) => {
    if (tab === 0) {
      return <ChatPanel list={activeChats} tab={tab} />;
    }
    if (tab === 1) {
      return <ChatPanel list={allUsers} tab={tab} />;
    }
  };
  const ChatPanel = ({ list, tab }) => {
    if (list && list.length) {
      return list.map((item) => {
        return (
          <ChatHead
            key={item._id}
            data={{ ...item, status: 2 }}
            isOnline={utils.checkOnlineStatus(item, onlineUsers, authData)}
            onClick={(e) => handleMessageInitialize(e, item)}
            tab={tab}
          />
        );
      });
    }
    if (!list || requesting) {
      return (
        <Centered>
          <SpinnerDot />
        </Centered>
      );
    }
    return "No chats to show";
  };
  return (
    <>
      <Top>
        <Head>
          <h2>Chats</h2>
        </Head>
      </Top>
      <Bottom>
        <Header>
          <span onClick={() => setTab(0)}>Active Chats</span>|
          <span onClick={() => setTab(1)}>All Users</span>
        </Header>

        <TabPanel tab={tab} />
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
export const Top = styled(TopRow)`
  background-color: ${({ theme }) => theme.plain_white};
`;
