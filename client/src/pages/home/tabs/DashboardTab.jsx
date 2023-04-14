import React from "react";
import styled from "styled-components";

const DashboardTab = () => {
  return (
    <Container>
      <div className="placeholderDiv">Welcome to Chatzilla</div>
      <div className="placeholderDiv">Start a Chart</div>
    </Container>
  );
};

export default DashboardTab;
export const Container = styled.section`
  display: flex;
  flex-direction: column;

  gap: 1px;
  height: 100%;
  transition: all 0.5s ease-in-out;
  animation: slide 0.5s ease-in-out 1;
  & .placeholderDiv {
    font-size: 35px;
    margin: auto;
    opacity: 0.2;
    font-family: cursive;
  }
  //Mobile Phones
  @media only screen and (max-width: 599px) {
    /* grid-template-columns: 80px 1fr; */
  }
  //Tablets
  @media only screen and (min-width: 600px) and (max-width: 959px) {
    /* grid-template-columns: 200px 100fr; */
  }
  //Laptops and Desktops
  @media only screen and (min-width: 960px) and (max-width: 1279px) {
    /* grid-template-columns: 250px 100fr; */
  }
  //Large Desktops and TVs
  @media only screen and (min-width: 1280px) {
    /* grid-template-columns: 300px 100fr; */
  }
  @keyframes slide {
    0% {
      transform: translateX(-100%);
    }
  }
`;
