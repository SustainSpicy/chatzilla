import * as actionTypes from "./auth-types";

export const signInAction = (data) => {
  return {
    type: actionTypes.SIGNIN,
    payload: { ...data },
  };
};
export const signOutAction = () => {
  return {
    type: actionTypes.SIGNOUT,
  };
};
