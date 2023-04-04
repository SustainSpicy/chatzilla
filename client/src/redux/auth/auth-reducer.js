import * as actionTypes from "./auth-types";

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP:
      return { ...state, authData: action?.payload };

    default:
      return state;
  }
};

export default authReducer;

const INITIAL_STATE = {
  authData: null,
};
