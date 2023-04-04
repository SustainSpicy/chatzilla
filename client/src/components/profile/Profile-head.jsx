import React from "react";
import styled from "styled-components";
import avatar from "../../images/ava.jpg";
const ProfileHead = ({ title, msg, time, status, style, collapsable }) => {
  return (
    <Wrapper {...style}>
      <div className="avatar">
        <img src={avatar} />
      </div>
      <div className="profileInfo">
        <div className="profileInfo_header">
          <h2>{title}</h2>
        </div>
        <div className="profileInfo_body">
          <span>{msg}</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfileHead;

const Wrapper = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  & .avatar {
    width: 50px;
    height: 50px;
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
    flex: 1;
    display: none;

    & .profileInfo_header {
      display: flex;
      justify-content: space-between;
      & > h2 {
        font-size: 16px;
      }
    }
    & .profileInfo_body {
      display: flex;
      justify-content: space-between;
      & > span {
        font-size: 12px;

        color: ${({ theme }) => theme.icon_gray};
      }
    }
    //Laptops and Desktops
    @media only screen and (min-width: 960px) and (max-width: 1279px) {
      display: initial;
    }
    //Large Desktops and TVs
    @media only screen and (min-width: 1280px) {
      display: initial;
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
