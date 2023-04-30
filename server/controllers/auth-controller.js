//utils
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import validate from "../utils/validate.js";
import { encode } from "../utils/jwt.js";

//models
import UserModel from "../models/user-model.js";

dotenv.config();
//secrete keys
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;

export default {
  login: async (req, res) => {
    console.log("login");
    global.io.emit("connection");
    const { username, password } = req.body;
    //check edge cases
    let isValidUsername = validate(username).isString().notEmptyStr().trim();
    let isValidsPassword = validate(password).isString().notEmptyStr().value;
    if (!isValidUsername || !isValidsPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid form data" });
    }

    try {
      //check if user exists
      const existingUser = await UserModel.findUserByFied({ username });
      if (!existingUser)
        return res
          .status(400)
          .json({ success: false, message: "User does not exist" });

      //check if given password is valid
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid credentials" });

      const { payload, accessToken } = encode(existingUser);
      res.status(200).json({
        success: true,
        ...payload,
        authorization: accessToken,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
  logout: async (req, res) => {
    console.log("logout");
    if (!req.headers["authorization"]) {
      return res
        .status(400)
        .json({ success: false, message: "No access token provided" });
    }
    const accessToken = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(accessToken, ACCESS_SECRET);
      //   const existingUser = await UserModel.findUserByFied(decoded.username);
      res.status(200).json({ success: true, message: "User logged out" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
