// utils
import jwt from "jsonwebtoken";
import makeValidation from "@withvoid/make-validation";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
// models
import UserModel from "../models/user-model.js";

//secrete keys
dotenv.config();
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

export default {
  signIn: async (req, res) => {
    try {
      //validate request
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          username: { type: types.string },
          password: { type: types.string },
        },
      }));

      //check edge cases
      if (!validation.success)
        return res
          .status(400)
          .json({ validation, message: "Textfields are required!!" });
      console.log(req.body);

      const { username, password } = req.body;

      //check if user exists
      const existingUser = await UserModel.userExist(username);
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

      //generate access token payload
      const payload = {
        id: existingUser._id,
        username: existingUser.username,
      };

      const accessToken = jwt.sign(payload, ACCESS_SECRET, {
        expiresIn: "1d",
      });
      const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
        expiresIn: "1d",
      });

      //save refresh token to database
      existingUser.refreshToken = refreshToken;

      //save new created profile
      await existingUser.save();

      //set cookie
      res.cookie("jwt", refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        SameSite: "None",
      });

      res
        .status(200)
        .json({ success: true, ...payload, authorization: accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Operation failed." });
    }
  },
  signOut: async (req, res) => {
    console.log("signout");
    // const cookies = req.cookies;
    // console.log(cookies);
    // if (!cookies?.jwt) return res.sendStatus(204); //no content;

    // const refreshToken = cookies.jwt;
    //check user with current token
    if (!req.headers["authorization"]) {
      return res
        .status(400)
        .json({ success: false, message: "No access token provided" });
    }

    const accessToken = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(accessToken, ACCESS_SECRET);
      const existingUser = await UserModel.userExist(decoded.username);

      if (!existingUser) {
        //  delete current cookie
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "None",
          // secure: true,
        });
        return res.sendStatus(204); //no content;
      }

      //    delete the refresh token in the database
      existingUser.refreshToken = "";
      await existingUser.save();

      //   delete current cookie
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        // secure: true,
      }); //secure true - only severse on https
      res.status(200).json({ success: true, message: "User logged out" });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ success: false, message: "Operation failed" });
    }
  },
};
