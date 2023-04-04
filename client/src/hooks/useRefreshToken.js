import axios from "axios";
import * as api from "../api/index";
import { useAuthContext } from "../providers/auth/AuthProvider";

const useRefreshToken = () => {
  // const { setUser } = useAuthContext();
  const refresh = async () => {
    const response = await api.refreshAPI();
    console.log(response);
    // setUser((prev) => {
    // console.log(JSON.stringify(prev));
    // console.log(response.data.accessToken);
    //   return { ...prev, accessToken: response.data.accessToken };
    // });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
