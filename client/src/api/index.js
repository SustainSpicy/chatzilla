import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export const API_PRIVATE = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).authorization
    }`;
  }

  return req;
});

export default API;

//auth
export const signUpAPI = (formData) => API.post("/user", formData);
export const signInAPI = (formData) => API.post("/user/signin", formData);
export const signout = () =>
  API.get("/user/signout", {
    withCredentials: true, //very important, it allows us to send cookie with our request
  });

//refresh tokens
export const refreshAPI = () =>
  API_PRIVATE.get("/refresh", {
    withCredentials: true, //very important, it allows us to send cookie with our request
  });

//users
export const getAllUsersAPI = () => API.get("/user");

export const getUserByIdAPI = (formData) => API.get("/users/" + formData);

//chat
export const getAllActiveChatsAPI = (userId) => API.get(`/room/${userId}`);
export const getRoomByIdAPI = (roomId) => API.get(`/room/${roomId}/room`);

export const initializeChat = (chatData) =>
  API.post("/room/initiate", chatData);

export const getAllConversationByRoomId = (roomId) =>
  API.get(`/room/${roomId}/messages`);

export const postMessage = (roomId, message) =>
  API.post("/room/" + roomId + "/message", message);

export const markRead = (roomId) => API.put("/room/" + roomId + "/mark-read");
