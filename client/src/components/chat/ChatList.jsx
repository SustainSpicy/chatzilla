import React from "react";
import styled from "styled-components";
import { BottomRow, Head, TopRow } from "../common/common";
import ChatHead from "./ChatHead";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import IconButton from "@mui/material/IconButton";

const users = [
  {
    id: "1",
    username: "user1",
    email: "user1@example.com",
    isOnline: true,
  },
  {
    id: "2",
    username: "user2",
    email: "user2@example.com",
    isOnline: false,
  },
  {
    id: "3",
    username: "user3",
    email: "user3@example.com",
    isOnline: true,
  },
  {
    id: "4",
    username: "user4",
    email: "user4@example.com",
    isOnline: true,
  },
  {
    id: "5",
    username: "user5",
    email: "user5@example.com",
    isOnline: false,
  },
  {
    id: "6",
    username: "user6",
    email: "user6@example.com",
    isOnline: true,
  },
];

const ChatList = ({ title, chatList = users }) => {
  return (
    <>
      <TopRow>
        <Head>
          <div className="logo">
            <h2>{title}Message</h2>
          </div>
          <span className="icons">
            <CiSearch />
            {/* <CiSearch /> */}
          </span>
        </Head>
      </TopRow>
      <Bottom>
        <Body>
          <Header>
            <BsFillChatLeftTextFill />
            <span>All Messages</span>
          </Header>
          {chatList.map((item) => {
            return (
              <ChatHead
                key={item.id}
                title={item.username}
                msg=""
                status={0}
                isOnline={item.isOnline}
                time="Yesteday"
              />
            );
          })}
        </Body>
      </Bottom>
    </>
  );
};

export default ChatList;

const Wrapper = styled.section``;
const Bottom = styled(BottomRow)`
  background-color: #fff;
  padding: 15px;
  overflow-y: scroll;
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
const Body = styled.div``;
