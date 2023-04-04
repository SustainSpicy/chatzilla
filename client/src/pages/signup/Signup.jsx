import React, { useState } from "react";
import styled from "styled-components";
import { useAuthContext } from "../../providers/auth/AuthProvider";
import { Dots } from "./Carousel";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import { Button, Card, Container, Wrapper } from "./signup.styles";
const Signup = () => {
  const { render, step, setStep, prevStep, nextStep, isNext } =
    useAuthContext();

  const refresh = useRefreshToken();
  return (
    <Wrapper>
      <Container>
        <Card>
          <div className="cardHead">
            <h2 className="title">Sign up new account</h2>
          </div>
          <div className="cardBody">{render[step]}</div>
          <div className="cardFooter">
            <div
              className="toggle-button"
              style={{
                marginTop: "1rem",
                display: "flex",
                gap: "15px",
                justifyContent: "center",
              }}
            >
              {step !== Object.keys(render).length - 1 && (
                <>
                  <Button onClick={prevStep}>Prev</Button>
                  <Button onClick={nextStep} disabled={isNext}>
                    Next
                  </Button>
                </>
              )}
            </div>
            <Dots
              formList={Object.keys(render)}
              step={step}
              setStep={setStep}
            />
          </div>
          <p className="signup-link" style={{ marginTop: "1rem" }}>
            No account?{"   "}
            <Link to="/login">Sign in</Link>
          </p>
        </Card>
      </Container>
    </Wrapper>
  );
};

export default Signup;
