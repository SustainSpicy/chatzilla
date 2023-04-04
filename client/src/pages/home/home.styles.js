import styled from "styled-components";

export const Wrapper = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
`;
export const Container = styled.section`
  position: fixed;
  max-width: 2200px;
  width: 100vw;
  height: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

export const Card = styled.div`
  display: grid;
  grid-template-columns: 0px 1fr;
  grid-template-rows: 1fr;
  gap: 1px;
  background-color: #c0cedd4b;
  /* overflow: hidden; */
  max-width: 1500px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  padding: 0.4rem;

  //Mobile Phones
  @media only screen and (max-width: 599px) {
    grid-template-columns: 80px 1fr;
  }
  //Tablets
  @media only screen and (min-width: 600px) and (max-width: 959px) {
    grid-template-columns: 80px 1fr;
  }
  //Laptops and Desktops
  @media only screen and (min-width: 960px) and (max-width: 1279px) {
    grid-template-columns: 200px 1fr;
  }
  //Large Desktops and TVs
  @media only screen and (min-width: 1280px) {
    grid-template-columns: 200px 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 1fr;
  gap: 1px;
  overflow: hidden;
  /* padding: 0.2rem 0 0.2rem 0.2rem; */
`;
export const CenterColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 150px 1fr;
  gap: 1px;
  /* overflow: hidden; */
  @media only screen and (max-width: 599px) {
  }
  @media only screen and (min-width: 600px) and (max-width: 959px) {
  }
  @media only screen and (min-width: 960px) and (max-width: 1279px) {
  }
  @media only screen and (min-width: 1280px) {
  }
`;
export const RightColumn = styled.div`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow-x: hidden;

  @media only screen and (max-width: 599px) {
  }
  @media only screen and (min-width: 600px) and (max-width: 959px) {
  }
  @media only screen and (min-width: 960px) and (max-width: 1279px) {
  }
  @media only screen and (min-width: 1280px) {
  }
`;
