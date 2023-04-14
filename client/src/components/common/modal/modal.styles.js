import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 5rem;
  background-color: red;
  position: absolute;
  z-index: 50;
  background-color: #fff;
  display: block;
  padding: 1rem;
  top: 20rem;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 350px;
  min-width: 350px;
  border-radius: 0.5rem;
  -webkit-box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  & .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    border: 0px solid transparent;
    background-color: #fff;
    transition: all 0.2s linear;

    & > svg {
      transition: all 0.2s linear;
      width: 20px;
      cursor: pointer;
      &:hover {
        transform: scale(0.7);
        fill: #c55d5d;
      }
    }
  }
`;
