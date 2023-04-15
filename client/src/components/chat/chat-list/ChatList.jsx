//utils
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

//components
import { BottomRow } from "../../common/common";
import { Head, TopRow } from "../../../components/common/common";
import ChatListPanel from "./ChatListPanel";

//providers
import { useChatContext } from "../../../providers/chat/ChatProvider";

const ChatList = ({ authData }) => {
  const { utils } = useChatContext();
  const [tab, setTab] = useState(0);
  const [activeChats, setActiveChats] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [requesting, setRequesting] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let activeChat = await utils.getActiveUsers(authData.id);
      let allUsers = await utils.getAllUsers();

      if (activeChat.success) setActiveChats(activeChat.rooms);
      if (allUsers.success)
        setAllUsers(allUsers.users.filter((user) => user._id !== authData.id));
    }
    if (authData) {
      setRequesting(true);
      fetchData();
      setRequesting(false);
    }
  }, [authData, tab]);

  const TabPanel = ({ tab }) => {
    if (tab === 0) {
      return (
        <ChatListPanel
          list={activeChats}
          tab={tab}
          authData={authData}
          requesting={requesting}
        />
      );
    }
    if (tab === 1) {
      return (
        <ChatListPanel
          list={allUsers}
          tab={tab}
          authData={authData}
          requesting={requesting}
        />
      );
    }
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

const Top = styled(TopRow)`
  background-color: ${({ theme }) => theme.plain_white};
`;
