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
import { BiLogOut } from "react-icons/bi";
import ProfileHead from "../profile/Profile-head";
import { Bottom, Footer, Header, NavList, Top } from "./nav.styles";
import { useChatContext } from "../../providers/chat/ChatProvider";
import { signOutAction } from "../../redux/auth/auth-actions";
import { useAlertContext } from "../../providers/alert/AlertProvider";

const Nav = ({ authData, signOutAction }) => {
  const { socket } = useChatContext();
  const [openAlertBar] = useAlertContext();

  const handleSignout = () => {
    socket.current.emit("offline");
    signOutAction();
    openAlertBar({
      type: "success",
      msg: "Logout Successfully...",
    });
  };
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
    {
      name: "Logout",
      icon: <BiLogOut />,
      click: handleSignout,
    },
  ];

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
                onClick={item.click}
              />
            );
          })}
        </NavList>
        <Footer>
          <ProfileHead username={authData?.username} msg="" status="" time="" />
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
const mapDispatchToProps = (dispatch) => {
  return {
    signOutAction: () => dispatch(signOutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
