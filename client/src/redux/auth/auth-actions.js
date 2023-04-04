import * as actionTypes from "./auth-types";

export const signInAction = (data) => {
  return {
    type: actionTypes.SIGNUP,
    payload: { ...data },
  };
};
