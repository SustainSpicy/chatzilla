//utils
import React from "react";
import styled from "styled-components";

const DefaultInput = ({ label, value, onChange, inputProps, error }) => {
  const ErrorDiv = ({ forInput }) => {
    if (error && Object.keys(error).length) {
      return <div className="helper-text">{error[forInput]?.msg}</div>;
    }
  };

  return (
    // <Container>
    <InputDiv>
      <label htmlFor={label} className="label">
        {label}
      </label>

      <Input
        // onChange={onChange}
        // // value={value}
        {...inputProps}
        error={Boolean(error ? error[inputProps.name] : false)}
      />
      <span>{inputProps?.icon}</span>
      <ErrorDiv forInput={inputProps.name} />
    </InputDiv>
    // </Container>
  );
};

export default DefaultInput;

export const Spinner = styled.div`
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

export const Container = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;
  width: 80%;
`;

export const Box = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 12rem;
`;
export const Form = styled.form`
  background-color: #fff;
  display: block;
  padding: 1rem;
  max-width: 350px;
  border-radius: 0.5rem;
  -webkit-box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  & .form-title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    text-align: center;
    color: #000;
  }
  & > button {
    outline: none;
    border: 1px solid #e5e7eb;
    margin: 8px 0;
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
  & .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #4f46e5;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    width: 100%;
    border-radius: 0.5rem;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.5s linear;
    &:hover {
      background-color: #3029a9;
      transform: scale(0.95);
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

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 8px; */
  position: relative;
  & > label {
    padding-left: 0.5rem;
    align-self: flex-start;
  }

  & .helper-text {
    padding-left: 1rem;
    /* margin-bottom: 0.4rem; */
    align-self: flex-start;
    color: #915050;
    font-size: 12px;
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
`;

export const Input = styled.input`
  border: 1px solid ${({ error }) => (error === true ? "#c54f4f" : "#e5e7eb")};
  outline: none;
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
`;
