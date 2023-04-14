import * as actionTypes from "./auth-types";

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };

    case actionTypes.SIGNOUT:
      localStorage.clear();
      return {
        ...state,
        authData: null,
      };

    default:
      return state;
  }
};

export default authReducer;

const INITIAL_STATE = {
  authData: null,
};
