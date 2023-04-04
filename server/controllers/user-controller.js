//utils
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import makeValidation from "@withvoid/make-validation";

//model
import UserModel from "../models/user-model.js";
import ProfileModel, { PROFILE_TYPES } from "../models/profile-model.js";

dotenv.config();

export default {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onCreateUser: async (req, res) => {
    console.log(req.body);
    try {
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          username: { type: types.string },
          password: { type: types.string },

          privacy: { type: types.enum, options: { enum: PROFILE_TYPES } },
        },
      }));
      // console.log(validation);
      if (!validation.success)
        return res.status(400).json({
          validation,
          message: `${validation.message} in ${Object.keys(validation.errors)}`,
        });
      // console.log(req.body);
      const { username, password, email, phone } = req.body;
      const { name, bio, privacy } = req.body;

      const existingUser = await UserModel.userExist(username);
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "User already exist!!" });
      }

      // enctypt password
      const hashedPassword = await bcrypt.hash(password, 12);

      //create new user
      const user = await UserModel.createUser(
        username,
        hashedPassword,
        email,
        phone
      );
      //generate profile for user
      const profile = await ProfileModel.createProfile(
        user._id,
        name,
        bio,
        privacy
      );

      return res.status(200).json({ success: true, user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error });
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
};
