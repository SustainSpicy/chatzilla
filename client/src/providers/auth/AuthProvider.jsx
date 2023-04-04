//utils
import { connect } from "react-redux";
import * as api from "../../api/index";
import validation from "../../utils/validation.js";
//components
import {
  AuthDetails,
  ProfileDetails,
  Settings,
  Success,
} from "../../pages/signup/Carousel";

//hooks
import { createContext, useContext, useEffect, useState } from "react";
import { signInAction } from "../../redux/auth/auth-actions";
import { useAlertContext } from "../alert/AlertProvider";

const AuthContext = createContext();

const AuthContextProvider = ({ children, signInAction }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [openAlertBar] = useAlertContext();
  const [formData, setFormData] = useState({});
  const [isNext, setIsNext] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    switch (step) {
      case 0:
        const { username, password } = formData;
        setIsNext(!checkIfNext({ username, password }));
        return;
      case 1:
        const { bio } = formData;
        setIsNext(!checkIfNext({ bio }));

        return;
      case 2:
        const { privacy } = formData;
        setIsNext(!checkIfNext({ privacy }));
        return;

      default:
        return;
    }
  }, [formData, step]);

  const checkIfNext = (formData) => {
    // console.log(formData);
    const isFormValid = Object.values(formData).every(
      (value) => value !== "" && value?.length >= 3
    );

    if (Object.keys(error).length < 1 && isFormValid) {
      return true;
    }
    return false;
  };

  const validate = (e) => {
    switch (e.target.name) {
      case "username":
        {
          let { success, errorMeta } = validation.validateUsername(
            e.target.value
          );
          if (success) {
            let { username, ...rest } = error;
            setError({ ...rest });
          }
          setError((prevState) => ({ ...prevState, ...errorMeta }));
        }

        return;
      case "password":
        {
          let { success, errorMeta } = validation.validatePassword(
            e.target.value
          );
          if (success) {
            let { password, ...rest } = error;
            setError({ ...rest });
          }
          setError((prevState) => ({ ...prevState, ...errorMeta }));
        }

        return;
      case "email":
        {
          let { success, errorMeta } = validation.validateEmail(e.target.value);
          if (success) {
            let { email, ...rest } = error;
            setError({ ...rest });
          }
          setError((prevState) => ({ ...prevState, ...errorMeta }));
        }

        return;
      case "bio":
        {
          let { success, errorMeta } = validation.validateBio(e.target.value);
          if (success) {
            let { bio, ...rest } = error;
            setError({ ...rest });
          }
          setError((prevState) => ({ ...prevState, ...errorMeta }));
        }

        return;
      default:
        return;
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();

    validate(e);

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignupSubmit = async (e, navigate) => {
    e.preventDefault();

    if (checkIfNext(formData)) {
      setRequesting(true);
      setLoading(true);
      try {
        const { data } = await api.signUpAPI(formData);
        if (data.success) {
          setLoading(false);
          setRequesting(false);
          openAlertBar({
            type: "success",
            msg: "Account created!!",
          });
          navigate.navigate("/login", { replace: true });
        }
      } catch (error) {
        setLoading(false);
        setRequesting(false);
        openAlertBar({
          type: "error",
          msg: error?.response?.data?.message || error,
        });
        // console.log(error?.response?.data?.message || error);
      }
    } else {
      openAlertBar({
        type: "error",
        msg: "Inputs required",
      });
    }
  };

  const handleSigninSubmit = async (e, navigate, from) => {
    e.preventDefault();

    if (checkIfNext(formData)) {
      setLoading(true);
      setRequesting(true);
      try {
        const { data } = await api.signInAPI(formData);
        if (data.success) {
          setLoading(false);
          setRequesting(false);
          signInAction(data);
          openAlertBar({
            type: "success",
            msg: "Login Sucessful...",
          });
          navigate(from, { replace: true });
        }
      } catch (error) {
        setLoading(false);
        setRequesting(false);
        openAlertBar({
          type: "error",
          msg: error?.response?.data?.message || error,
        });
        // console.log(error?.response?.data?.message || error);
      }
    } else {
      openAlertBar({
        type: "error",
        msg: "inputs required",
      });
    }
  };
  const render = {
    0: <AuthDetails />,
    1: <ProfileDetails />,
    2: <Settings />,
    3: <Success />,
  };

  const prevStep = () => {
    setStep((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      }
      return prevState;
    });
  };
  const nextStep = () => {
    setStep((prevState) => {
      if (prevState < 3) {
        setIsNext(true);
        return prevState + 1;
      }
      return prevState;
    });
  };
  return (
    <AuthContext.Provider
      value={{
        isNext,
        setIsNext,
        error,
        requesting,
        setError,
        setStep,
        loading,
        checkIfNext,
        step,
        render,
        prevStep,
        nextStep,
        formData,
        setFormData,
        handleSignupSubmit,
        handleSigninSubmit,
        handleInputChange,
      }}
    >
      {children}
    </AuthContext.Provider>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContextProvider);

export const useAuthContext = () => {
  return useContext(AuthContext);
};
