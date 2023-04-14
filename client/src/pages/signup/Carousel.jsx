//utils
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

//components
import { Spinner } from "../../components/common/common";
import DefaultInput from "../../components/inputs/DefaultInput";
import { useAuthContext } from "../../providers/auth/AuthProvider";
import { ButtonSuccess, Wrapper } from "./signup.styles";
import { EmailIcon, PasswordIcon } from "../../components/svgIcons";
import BreakSlider from "../../components/slider/BreakSlider";

export const AuthDetails = () => {
  const { formData, error, handleInputChange } = useAuthContext();
  const [username] = useState(formData?.username);
  const [password] = useState(formData?.password);

  return (
    <>
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
          type: "text",
          value: password,
          placeholder: "Enter Password",
          onChange: handleInputChange,
          icon: <PasswordIcon />,
        }}
        error={error}
      />

      {/* <DefaultInput
        // label="Email"
        inputProps={{
          name: "email",
          id: "email",
          type: "email",
          value: formData?.email,
          placeholder: "Enter Email",
          onChange: handleInputChange,
          icon: <EmailIcon />,
        }}
        error={error}
      /> */}
    </>
  );
};
export const ProfileDetails = () => {
  const { formData, setIsNext, error, handleInputChange } = useAuthContext();
  const [bio, setBio] = useState(formData?.bio || "");

  useEffect(() => {
    setIsNext(false);

    return () => {};
  }, []);

  const handleBioChange = (e) => {
    setBio(e.target.value);
    handleInputChange(e);
  };
  return (
    <DefaultInput
      inputProps={{
        name: "bio",
        id: "bio",
        value: bio,
        placeholder: "Enter Bio",
        onChange: handleBioChange,
        icon: <EmailIcon />,
      }}
      error={error}
    />
  );
};

export const Settings = () => {
  const { setFormData, setIsNext } = useAuthContext();
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    setIsNext(false);
    setFormData((prevState) => {
      return {
        ...prevState,
        privacy: isChecked ? "public" : "private",
      };
    });
    return () => {};
  }, []);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.checked ? "public" : "private",
      };
    });
  };
  return (
    <>
      <h4>Profile visibility </h4>
      <Wrapper>
        <span>Public </span>
        <span>Private</span>
      </Wrapper>
      <BreakSlider
        inputProps={{
          name: "privacy",
          id: "privacy",
          checked: isChecked,
          onChange: handleCheckboxChange,
        }}
      />
    </>
  );
};
export const Success = () => {
  const { handleSignupSubmit, loading, requesting } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  return (
    <ButtonSuccess
      disabled={requesting}
      onClick={(e) => handleSignupSubmit(e, { navigate, from })}
    >
      {loading ? (
        <span>
          Requesting... <Spinner />
        </span>
      ) : (
        "Submit"
      )}
    </ButtonSuccess>
  );
};

export const Dots = ({ formList }) => {
  const { step, setStep, render } = useAuthContext();

  const Dot = styled.span`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #cfcfcf;
    align-self: flex-end;
    cursor: pointer;
    transition: background-color 29s ease-in-out;
    &:nth-of-type(-n + ${({ step }) => step + 1}) {
      background-color: ${({ step, render }) =>
        step === Object.keys(render).length - 1 ? "#32b9ae" : "#3d8bad"};
    }
  `;

  const handleClick = (num) => {
    //to avoid unessesarry re-rendering
    if (step !== num) {
      setStep(() => {
        return num;
      });
    }
  };

  return (
    <Wrapper>
      {formList.map((item, index) => {
        return (
          <Dot
            step={step}
            render={render}
            key={item}
            onClick={() => handleClick(index)}
          ></Dot>
        );
      })}
    </Wrapper>
  );
};
