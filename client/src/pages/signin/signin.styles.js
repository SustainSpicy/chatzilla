import styled from "styled-components";
import { Btn } from "../../components/common/common";

export const Wrapper = styled.section`
  display: flex;
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

export const Button = styled(Btn)``;
export const Spinner = styled.div`
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #00bfff;
  border-radius: 50%;
  width: ${({ width }) => width ?? "15px"};
  height: ${({ height }) => height ?? "15px"};
  transition: opacity 3s ease-in-out;
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Form = styled.form`
  /* background-color: #fff; */
  display: block;
  padding: 1rem;
  max-width: 350px;
  border-radius: 0.5rem;
  /* -webkit-box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05); */

  & .form-title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    text-align: center;
    color: #000;
    margin-bottom: 15px;
  }
  & > button {
  }
  & .input-container {
    position: relative;

    & > input {
      outline: none;
      border: 1px solid #e5e7eb;
      margin: 8px 0;

      background-color: #fff;
      padding: 1rem;
      padding-right: 3rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      width: 300px;
      border-radius: 0.5rem;
      -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    & > span {
      display: grid;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      padding-left: 1rem;
      padding-right: 1rem;
      place-content: center;
      & > svg {
        color: #9ca3af;
        width: 1rem;
        height: 1rem;
      }
    }
  }

  & .signup-link {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
    & a {
      text-decoration: underline;
    }
  }
`;
