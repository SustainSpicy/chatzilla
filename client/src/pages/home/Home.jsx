import React from "react";
import styled from "styled-components";
import { signout } from "../../api";
import { BottomRow, Head, TopRow } from "../../components/common/common";
import ChatScreen from "../../components/chat/ChatScreen";
import MessageList from "../../components/chat/ChatList";
import Nav from "../../components/nav/Nav";
import useRefreshToken from "../../hooks/useRefreshToken";
import ChatList from "../../components/chat/ChatList";
import {
  Card,
  Container,
  LeftColumn,
  RightColumn,
  Wrapper,
} from "./home.styles";
import { Route, Routes } from "react-router-dom";
import MessagesTab from "../tabs/MessagesTab";
import DashboardTab from "../tabs/DashboardTab";

const Home = () => {
  const refresh = useRefreshToken();
  return (
    <Wrapper>
      <Container>
        <Card>
          <LeftColumn className="navbar">
            <Nav />
          </LeftColumn>
          <RightColumn>
            <Routes>
              <Route element={<ChatScreen />}>
                <Route path="" element={<DashboardTab />} />
                <Route path="message" element={<MessagesTab />} />
                <Route path="contact" element={<h1>contact</h1>} />
              </Route>
            </Routes>
          </RightColumn>

          {/* <LeftColumn className="messages">
            <ChatList />
          </LeftColumn>
          <RightColumn className="chatScreen">
            <ChatScreen />
          </RightColumn> */}
        </Card>
        {/* Home
      <button onClick={refresh}>Refresh</button>
      <button onClick={signout}>Refresh</button> */}
        {/* <Nav />
      <ChatBody /> */}
      </Container>
    </Wrapper>
  );
};

export default Home;
