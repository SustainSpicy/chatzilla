//utils
import React from "react";
import { Link } from "react-router-dom";

//providers
import { useAuthContext } from "../../providers/auth/AuthProvider";

//components
import { Dots } from "./Carousel";

//hooks
import useRefreshToken from "../../hooks/useRefreshToken";

//styles
import { ButtonDefault, Card, Container, Wrapper } from "./signup.styles";

const Signup = () => {
  const { render, step, setStep, prevStep, nextStep, isNext } =
    useAuthContext();

  const toogleDivStyle = {
    marginTop: "1rem",
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  };
  // const refresh = useRefreshToken();
  return (
    <Wrapper>
      <Container>
        <Card>
          <div className="cardHead">
            <h2 className="title">Sign up new account</h2>
          </div>
          <div className="cardBody">{render[step]}</div>
          <div className="cardFooter">
            <div className="toggle-button" style={toogleDivStyle}>
              {step !== Object.keys(render).length - 1 && (
                <>
                  <ButtonDefault onClick={prevStep}>Prev</ButtonDefault>
                  <ButtonDefault onClick={nextStep} disabled={isNext}>
                    {`Next `}
                  </ButtonDefault>
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
