import jwt from "jsonwebtoken";
// models
import UserModel from "../models/user-model.js";
import dotenv from "dotenv";

//secrete keys
dotenv.config();
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const encode = async (req, res, next) => {
  const { username } = req.body;

  try {
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
    console.log("encoded");
    req.accessToken = accessToken;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.error });
  }
};
export const decode = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res
      .status(400)
      .json({ success: false, message: "No access token provided" });
  }
  const accessToken = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, ACCESS_SECRET);

    req.userId = decoded.userId;
    req.userName = decoded.username;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
