import React, { useEffect, useState } from "react";
import { BottomRow, Head, TopRow } from "../common/common";
import ChatHead from "./ChatHead";
import { TbMessage } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import styled from "styled-components";

import ActiveChat from "./ActiveChat";
import { Outlet } from "react-router-dom";

const ChatScreen = ({ title }) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ChatScreen;
const Top = styled(TopRow)`
  border-top-right-radius: 10px;
`;
const Bottom = styled(BottomRow)`
  background-color: ${({ theme }) => theme.chat_screen};
  padding: 5px;
  overflow: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom-right-radius: 10px;
`;
const Header = styled.div``;
const Body = styled.div`
  /* width: 100%; */
`;
