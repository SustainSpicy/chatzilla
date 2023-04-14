//utils
import React from "react";
import { Outlet } from "react-router-dom";

const SliderOutlet = ({ title }) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default SliderOutlet;
