import { Link } from "react-router-dom";
import styled from "styled-components";
import { BottomRow, Head, TopRow } from "../common/common";

export const Top = styled(TopRow)`
  border-top-left-radius: 10px;
`;

export const Header = styled(Head)`
  padding: 0 10px;
  justify-content: flex-start;
  & > img {
    object-fit: contain;
  }
  & > span {
    display: none;
  }
  @media only screen and (max-width: 599px) {
  }
  @media only screen and (min-width: 600px) and (max-width: 959px) {
  }
  @media only screen and (min-width: 960px) and (max-width: 1279px) {
    & > span {
      display: initial;
    }
  }
  @media only screen and (min-width: 1280px) {
    & > span {
      display: initial;
    }
  }
`;

export const Bottom = styled(BottomRow)`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom-left-radius: 10px;
  padding: 0.5rem;
`;
export const NavList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 10px;
`;
export const Footer = styled.div``;

export const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 15px 8px;
  border-radius: 0.6rem;
  text-decoration: none;
  color: #000;
  & > svg {
    font-size: 20px;
    color: ${({ theme }) => theme.icon_gray};
  }
  &:hover {
    color: ${({ theme }) => theme.plain_white};
    background-color: ${({ theme }) => theme.faded_blue};
    -webkit-box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);

    & > svg {
      color: ${({ theme }) => theme.plain_white};
    }
  }
  .text {
    display: none;
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
    .text {
      display: inline-block;
    }
  }
  //Large Desktops and TVs
  @media only screen and (min-width: 1280px) {
    justify-content: flex-start;
    .text {
      display: inline-block;
    }
  }
`;
