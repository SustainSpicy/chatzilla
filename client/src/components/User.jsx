import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useRefreshToken from "../hooks/useRefreshToken.js";
import { useNavigate, useLocation } from "react-router-dom";
const User = () => {
  const [users, setUser] = useState();
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: contoller.signal,
        });
        console.log(response.data);
        isMounted && setUser(response.data);
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h2>users list</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </div>
  );
};

export default User;
