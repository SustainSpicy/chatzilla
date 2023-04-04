//utils
import React from "react";
import logo from "../../images/logo.png";
import { connect } from "react-redux";

//components
import NavItem from "./NavItem";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdCall } from "react-icons/io";
import { BsGear } from "react-icons/bs";
import ProfileHead from "../profile/Profile-head";
import { Bottom, Footer, Header, NavList, Top } from "./nav.styles";

const navItemMeta = [
  {
    name: "Dashboard",
    icon: <RxDashboard />,
    url: "/",
  },
  {
    name: "Message",
    icon: <AiOutlineMessage />,
    url: "/message",
  },
  {
    name: "Contact",
    icon: <IoMdCall />,
    url: "/contact",
  },
  {
    name: "Setting",
    icon: <BsGear />,
    url: "/",
  },
];
const Nav = ({ authData }) => {
  return (
    <>
      <Top>
        <Header>
          <img src={logo} alt="logo" />
          <span>Chatzilla</span>
        </Header>
      </Top>
      <Bottom>
        <NavList>
          {navItemMeta.map((item) => {
            return (
              <NavItem
                key={item.name}
                icon={item.icon}
                text={item.name}
                url={item.url}
              />
            );
          })}
        </NavList>
        <Footer>
          <ProfileHead title={authData?.username} msg="" status="" time="" />
        </Footer>
      </Bottom>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authData: auth?.authData,
  };
};

export default connect(mapStateToProps)(Nav);
