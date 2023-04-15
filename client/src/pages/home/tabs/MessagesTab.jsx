//utils
import styled from "styled-components";
import React from "react";
import { connect } from "react-redux";

//components
import ChatScreen from "../../../components/chat/chat-screen/ChatScreen";
import { BottomRow } from "../../../components/common/common";
import ChatList from "../../../components/chat/chat-list/ChatList";

const MessagesTab = ({}) => {
  return (
    <Container>
      <Left>
        <ChatList />
      </Left>
      <Right>
        <ChatScreen />
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

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  gap: 5px;
  color: ${({ theme }) => theme.icon_gray};

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
export const Left = styled(Wrapper)`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100px 1fr;
  gap: 1px;

  height: 100%;
`;
export const Right = styled(Wrapper)`
  display: grid;
  grid-template-columns: 100fr;
  grid-template-rows: 100px 1fr;
  /* gap: 1px; */
  height: 100%;
  overflow: hidden;
`;

export const Bottom = styled(BottomRow)`
  padding: 1rem;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.plain_white};
`;
export const Container = styled.section`
  display: grid;
  grid-template-columns: 0 100%;
  grid-template-rows: 100%;

  height: 100%;
  transition: all 0.5s ease-in-out;
  animation: slide 0.5s ease-in-out 1;
  //Mobile Phones
  @media only screen and (max-width: 599px) {
    grid-template-columns: 0px 1fr;
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
