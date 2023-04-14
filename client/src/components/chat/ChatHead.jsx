import React, { useState } from "react";
import styled from "styled-components";
import avatar from "../../images/ava.jpg";
import { BiCheckDouble } from "react-icons/bi";
import { useEffect } from "react";

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
const ChatHead = ({ onClick, data, style, isOnline, authUser, active }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (active === true) {
      const currentChatHead = data.members.find(
        (member) => member._id !== authUser.id
      );

      setUserData(currentChatHead);
      return;
    }
    setUserData(data);

    return () => {};
  }, [data]);

  if (active === true) {
    return (
      <Wrapper {...style} onClick={onClick}>
        <div className="avatar">
          {/* <img src={avatar} /> */}
          {isOnline && <span className="greenDot"></span>}
        </div>
        <div className="profileInfo">
          <div className="profileInfo_header">
            <h2>{userData?.username}</h2>
            <span>{userData?.time}</span>
          </div>
          <div className="profileInfo_body">
            {userData?.typing ? (
              <span className="typing">typing...</span>
            ) : (
              <span className="alert">{userData?.msg}</span>
            )}
            <span>{<AlertBadge count={userData?.status} />}</span>
          </div>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper {...style} onClick={onClick}>
      <div className="avatar">
        {/* <img src={avatar} /> */}
        {isOnline && <span className="greenDot"></span>}
      </div>
      <div className="profileInfo">
        <div className="profileInfo_header">
          <h2>{userData?.username}</h2>
          <span>{userData?.time}</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default ChatHead;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
  padding: 0.3rem 0;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    & .avatar {
      outline: 2px solid #0d718579;
    }
  }
  & .avatar {
    outline: 1px solid #3d778379;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #0f6181;
    /* overflow: hidden; */
    position: relative;
    & .greenDot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid white;
      background: green;
      position: absolute;
      bottom: 2px;
      right: -2px;
    }
    & > img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  & .profileInfo {
    flex: 1;

    /* display: none; */
    gap: 5px;
    & .profileInfo_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
      justify-content: space-between;
      font-size: 12px;

      color: ${({ theme }) => theme.icon_gray};
      & .typing {
        /* flex: 1; */
        /* width: 20px; */
        color: ${({ theme }) => theme.green};
        overflow: hidden;
        white-space: nowrap;
        width: 0;
        animation: typing;
        animation-duration: 1.5s;
        animation-timing-function: steps(30, end);
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      }
      & .alert {
        flex: 2;
      }
    }
    //Tablets
    @media only screen and (min-width: 600px) and (max-width: 959px) {
      /* display: flex;
      flex-direction: column; */
      gap: 0px;
    }
    //Laptops and Desktops
    @media only screen and (min-width: 960px) and (max-width: 1279px) {
      display: flex;
      flex-direction: column;
    }
    //Large Desktops and TVs
    @media only screen and (min-width: 1280px) {
      display: flex;
      flex-direction: column;
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
    gap: 10px;
  }
  //Large Desktops and TVs
  @media only screen and (min-width: 1280px) {
    justify-content: flex-start;
    gap: 10px;
  }
`;
