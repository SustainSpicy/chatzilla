//utils
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

//components
import DefaultInput from "../../components/inputs/DefaultInput";
import { Button, Container, Form, Spinner, Wrapper } from "./signin.styles";
import { EmailIcon, PasswordIcon } from "../../components/svgIcons";

//providers
import { useAuthContext } from "../../providers/auth/AuthProvider";
import { signInAction } from "../../redux/auth/auth-actions";

const Signin = ({}) => {
  const {
    error,
    formData,
    requesting,

    handleSigninSubmit,
    handleInputChange,
  } = useAuthContext();
  const [username] = useState(formData?.username);
  const [password] = useState(formData?.password);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return (
    <Wrapper>
      <Container>
        <Form
          className="form"
          onSubmit={(e) => handleSigninSubmit(e, navigate, from)}
        >
          <p className="form-title">Sign in to your account</p>

          <DefaultInput
            inputProps={{
              name: "username",
              id: "username",
              type: "text",
              placeholder: "Enter Username",
              value: username,
              onChange: handleInputChange,
              icon: <EmailIcon />,
            }}
            error={error}
          />
          <DefaultInput
            inputProps={{
              name: "password",
              id: "password",
              type: "password",
              placeholder: "Enter Password",
              value: password,
              onChange: handleInputChange,
              icon: <PasswordIcon />,
            }}
            error={error}
          />

          <Button className="submit" type="submit" disabled={requesting}>
            {requesting ? (
              <span>
                Requesting... <Spinner />
              </span>
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="signup-link">
            No account?
            <Link to="/signup"> Sign up</Link>
          </p>
        </Form>
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authData: auth?.authData,
    // profile: auth?.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signInAction: (data) => dispatch(signInAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
