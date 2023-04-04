import React from "react";
import styled from "styled-components";

const BreakSlider = ({ inputProps }) => {
  return (
    <Wrapper>
      <input type="checkbox" className="chk" {...inputProps} />
      <span className="slider"></span>
    </Wrapper>
  );
};

export default BreakSlider;

const Wrapper = styled.label`
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 1.2em;
  height: 3.3em;
  transform: rotate(90deg);

  & .chk {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background-color: limegreen;
    }
    &:focus + .slider {
      box-shadow: 0 0 1px limegreen;
    }
    &:checked + .slider:before {
      transform: translateY(2.3em);
    }
    &:checked + .slider:after {
      transform: rotateZ(90deg) rotateY(180deg) translateY(0.45em)
        translateX(-1.4em);
    }
  }

  & .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: red;
    transition: 0.4s;
    border-radius: 5px;

    &:before {
      position: absolute;
      content: "";
      height: 0.5em;
      width: 2.4em;
      border-radius: 5px;
      left: -0.6em;
      top: 0.2em;
      background-color: #000000;
      box-shadow: 0 6px 7px rgba(0, 0, 0, 0.3);
      transition: 0.4s;
    }

    &:before,
    :after {
      content: "";
      display: block;
    }

    &:after {
      background: linear-gradient(transparent 50%, rgba(255, 255, 255, 0.15) 0)
          0 50% / 50% 100%,
        repeating-linear-gradient(
            90deg,
            rgb(8, 8, 8) 0,
            rgb(0, 0, 0),
            rgb(0, 0, 0) 20%,
            rgb(0, 0, 0) 20%,
            rgb(0, 0, 0) 40%
          )
          0 50% / 50% 100%,
        radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 25%, transparent 26%);
      background-repeat: no-repeat;
      border: 0.25em solid transparent;
      border-left: 0.4em solid #000000;
      border-right: 0 solid transparent;
      transition: border-left-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
      transform: translateX(-22.5%) rotate(90deg);
      transform-origin: 25% 50%;
      position: relative;
      top: 0.5em;
      left: 0.55em;
      width: 2em;
      height: 1em;
      box-sizing: border-box;
    }
  }
`;
