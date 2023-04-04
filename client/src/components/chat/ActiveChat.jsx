//utils
import React, { useState } from "react";
import styled from "styled-components";
import avatar from "../../images/ava.jpg";

//components
import { BiCheckDouble } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

const AlertBadge = ({ count }) => {
  if (count < 1) return <BiCheckDouble style={{ color: "#0d9472" }} />;
  return <AlertWrapper>{count}</AlertWrapper>;
};
const AlertWrapper = styled.span`
  background-color: #ce3d3d;
  width: 12px;
  height: 12px;

  border-radius: 50%;
  padding: 3px;
  color: #fff;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ActiveChat = ({
  isAuth,
  title,
  msg,
  time,
  status,
  style,
  collapsable,
}) => {
  const [typing, setTyping] = useState(false);

  return (
    <Wrapper {...style} isAuth={isAuth}>
      <div className="avatar">
        <img src={avatar} />
      </div>
      <div className="profileInfo">
        <div className="profileInfo_header">
          <h2>{title}</h2>
          <span>{time}</span>
        </div>
        <div className="profileInfo_body">
          <span className="message">{msg}</span>

          {typing && <span className="typing">typing...</span>}
          <span>{<AlertBadge count={status} />}</span>
        </div>
      </div>
      <BsThreeDotsVertical />
    </Wrapper>
  );
};

export default ActiveChat;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 20px 0;
  padding: 0.6rem 10px;
  /* width: 80%; */
  flex-direction: ${({ isAuth }) => (isAuth ? "row-reverse" : "")};
  cursor: pointer;

  &:hover {
    & .avatar {
      outline: 1px solid #3d778379;
    }
  }
  & .avatar {
    min-width: 40px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #000;
    overflow: hidden;

    & > img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  & .profileInfo {
    display: flex;
    flex-direction: column;
    gap: 20px;

    & .profileInfo_header {
      gap: 45px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: fit-content;
      flex-direction: ${({ isAuth }) => (isAuth ? "row-reverse" : "")};

      & > h2 {
        font-size: 14px;
      }
      & > span {
        font-size: 12px;
        color: ${({ theme }) => theme.icon_gray};
      }
    }
    & .profileInfo_body {
      display: flex;

      gap: 10px;
      & .message {
        word-break: break-word;
        width: fit-content;
        font-size: 12px;
        background-color: ${({ isAuth }) => (isAuth ? "white" : "blue")};

        border-radius: 0 10px 10px 10px;
        color: ${({ theme }) => theme.icon_gray};
        padding: 1rem;
      }
    }
  }
  & > svg {
    width: 45px;
    font-size: 12px;
  }
`;
