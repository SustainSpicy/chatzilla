import { useState, createContext, useContext } from "react";
// import AlertBar from "../../components/alertBar/AlertBar";
import styled, { css } from "styled-components";

const AlertContext = createContext();

const AlertContextProvider = ({ children }) => {
  const [barOpen, setBarOpen] = useState(false);
  const [alertData, setAlertData] = useState({ type: "info", msg: "" });

  const openAlertBar = ({ type, msg }) => {
    setBarOpen(true);
    setAlertData({ type, msg });

    setTimeout(() => {
      closeAlertBar();
    }, 6000);
  };

  const closeAlertBar = () => {
    setBarOpen(false);
    setAlertData({ type: "info", msg: "" });
  };

  return (
    <AlertContext.Provider value={[openAlertBar, closeAlertBar]}>
      {children}
      <AlertBar barOpen={barOpen} type={alertData.type}>
        {alertData.msg}
      </AlertBar>
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;

export const useAlertContext = () => {
  return useContext(AlertContext);
};

const show = css`
  display: inherit;
  visibility: visible;
  opacity: 1;
  /* transition: bottom 3s ease-in-out; */
  animation: show 0.5s ease-in-out forwards;

  @keyframes show {
    0% {
      bottom: -10px;
      left: 20px;
    }

    50% {
      bottom: 30px;
      left: 20px;
    }
    60% {
      bottom: 90px;
    }
    70% {
      bottom: 50px;
    }
    80% {
      bottom: 40px;
    }
    100% {
      bottom: 40px;
    }
  }
`;
const hide = css``;
export const AlertBar = styled.section`
  /* background-color: #fff; */
  /* : #bf9e9e; */
  display: block;
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: none;
  visibility: hidden;
  opacity: 0;
  padding: 1rem;
  max-width: 350px;
  min-width: 250px;
  border-radius: 0.2rem;

  z-index: 100;
  ${({ type }) =>
    type === "success" &&
    css`
      background-color: #009688;
      -webkit-box-shadow: 1px 5px 60px 0px #009688;
      box-shadow: 1px 5px 60px 0px #009688;
    `}
  ${({ type }) =>
    type === "error" &&
    css`
      background-color: #a71b1b;
      -webkit-box-shadow: 1px 5px 60px 0px #a71b1b;
      box-shadow: 1px 5px 60px 0px #a71b1b;
    `}
  ${({ type }) =>
    type === "info" &&
    css`
      background-color: #0c84c5;
      -webkit-box-shadow: 1px 5px 60px 0px #0c84c5;
      box-shadow: 1px 5px 60px 0px #0c84c5;
    `}

  ${({ barOpen }) => (barOpen ? show : hide)};
`;
