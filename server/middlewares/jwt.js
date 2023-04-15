import jwt from "jsonwebtoken";
// models
import UserModel from "../models/user-model.js";

//secrete keys
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const encode = async (req, res, next) => {
  // console.log("encode");
  try {
    const { username } = req.body;

    //check if user exists
    const existingUser = await UserModel.userExist(username);
    if (!existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });

    const payload = {
      userId: existingUser._id,
      username: existingUser.username,
    };
    const accessToken = jwt.sign(payload, ACCESS_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: "1d",
    });
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    req.accessToken = accessToken;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.error });
  }
};
export const decode = (req, res, next) => {
  // console.log("decode");
  if (!req.headers["authorization"]) {
    return res
      .status(400)
      .json({ success: false, message: "No access token provided" });
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, ACCESS_SECRET);
    req.userId = decoded.id;
    req.userName = decoded.username;
    console.log("decoded");
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
