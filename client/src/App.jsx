//utils
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

// pages
import Home from "./pages/home/Home";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";

//routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//middleware
import RequireAuth from "./utils/RequireAuth";

const App = () => {
  return (
    <Wrapper>
      <Router>
        <Routes>
          {/* public routes */}
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Signin />} />
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route exact path="/*" element={<Home />}></Route>
            {/* catch all routes */}
            <Route exact path="*" element={<h1>Wrong address</h1>} />
          </Route>
        </Routes>
      </Router>
    </Wrapper>
  );
};

const mapStateToProps = ({ auth }) => {
  console.log(auth);
  return {
    authData: auth?.authData,
    // profile: auth?.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // signupAction: (data) => dispatch(signupAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

const Wrapper = styled.section``;
