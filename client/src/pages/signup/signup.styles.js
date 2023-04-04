//style
import styled from "styled-components";

//components
import { Btn } from "../../components/common/common";

export const Wrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 2rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  min-height: 100vh;

  @media screen and (min-width: 768px) {
    width: 60%;
    margin: 0 auto;
    /* height: auto; */
  }
`;

export const Card = styled.div`
  /* background-color: #fff; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  max-width: 700px;
  width: 400px;
  position: fixed;
  /* gap: 10px; */
  margin: 0 auto;
  border-radius: 0.5rem;
  /* -webkit-box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05); */

  & .cardHead {
    padding: 1rem;
    margin-bottom: 30px;
  }

  & .cardBody {
    width: 100%;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  & .cardFooter {
    padding: 0.5rem;
  }
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    height: auto;
  }
`;

export const Button = styled(Btn)`
  background-color: #469de5;

  &:hover {
    background-color: #2f48da;
  }
`;
export const ButtonSuccess = styled(Btn)`
  background-color: #32b9ae;

  width: 80%;

  &:hover {
    background-color: #289c93;
  }
`;
