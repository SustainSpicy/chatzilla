import { Link } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "./nav.styles";

const NavItem = ({ icon, text, url }) => {
  return (
    <Wrapper className="wrapper" to={url}>
      {icon}
      <div className="text">{text}</div>
    </Wrapper>
  );
};

export default NavItem;
