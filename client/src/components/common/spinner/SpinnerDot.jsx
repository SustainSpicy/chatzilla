import React from "react";
import styled from "styled-components";

const SpinnerDot = () => {
  return (
    <Wrapper className="loader">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </Wrapper>
  );
};

export default SpinnerDot;

const Wrapper = styled.div`
  $dim: 3rem;
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
  animation: spin988 2s linear infinite;

  & .circle {
    $color: #333;
    $dim: 1.2rem;
    width: 1rem;
    height: 1rem;
    background-color: #333;
    border-radius: 50%;
    position: absolute;

    &:nth-child(1) {
      top: 0;
      left: 0;
    }
    &:nth-child(2) {
      top: 0;
      right: 0;
    }
    &:nth-child(3) {
      bottom: 0;
      left: 0;
    }
    &:nth-child(4) {
      bottom: 0;
      right: 0;
    }
  }
  @keyframes spin988 {
    0% {
      transform: scale(1) rotate(0);
    }

    20%,
    25% {
      transform: scale(1.3) rotate(90deg);
    }

    45%,
    50% {
      transform: scale(1) rotate(180deg);
    }

    70%,
    75% {
      transform: scale(1.3) rotate(270deg);
    }

    95%,
    100% {
      transform: scale(1) rotate(360deg);
    }
  }
`;
