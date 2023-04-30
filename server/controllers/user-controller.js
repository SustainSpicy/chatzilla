//utils
import bcrypt from "bcryptjs";
import validate from "../utils/validate.js";
//model
import UserModel from "../models/user-model.js";
import ProfileModel from "../models/profile-model.js";

export default {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getAllUser();

      res.status(200).json({ success: true, users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  createUser: async (req, res) => {
    const { username, password, bio, visibility } = req.body;
    let isValidUsername = validate(username).isString().notEmptyStr().trim();
    let isValidsPassword = validate(password).isString().notEmptyStr().value;

    if ("bio" in req.body) {
      let isValidBio = validate(bio).isString().notEmptyStr().value;
      if (!isValidBio)
        return res
          .status(400)
          .json({ success: false, message: "Invalid form data" });
    }
    if ("visibility" in req.body) {
      let isValidVisiblity = validate(visibility)
        .notEmptyStr()
        .isString().value;
      if (!isValidVisiblity)
        return res
          .status(400)
          .json({ success: false, message: "Invalid form data" });
    }
    if (!isValidUsername || !isValidsPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid form data" });
    }

    try {
      //check for existing users
      const existingUser = await UserModel.findUserByFied({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: true, message: "Username is already taken" });
      }

      //encrypt password
      const hashedPassword = await bcrypt.hash(password, 12);

      //create new document
      const newUser = new UserModel({ username, password: hashedPassword });
      const { _id } = newUser;
      const newProfile = new ProfileModel({ _id, bio, visibility });

      //save to database
      newUser.save();
      newProfile.save();

      res.status(201).json({ success: true, newUser, message: "User Created" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { username, password } = req.body;

    if ("username" in req.body) {
      let isValidUsername = validate(username).isString().notEmptyStr().trim();
      if (!isValidUsername)
        return res
          .status(400)
          .json({ success: false, message: "Invalid form data" });
    }
    if ("password" in req.body) {
      let isValidsPassword = validate(password).isString().notEmptyStr().trim();

      if (!isValidsPassword)
        return res
          .status(400)
          .json({ success: false, message: "Invalid form data" });
    }
    try {
      //check for existing users
      const existingUser = await UserModel.findUserById(userId);
      if (!existingUser) {
        return res
          .status(400)
          .json({ success: true, message: "User does not exist" });
      }

      const updatedUser = await UserModel.updateUserById(userId, {
        username,
        password,
      });
      res
        .status(200)
        .json({ success: true, updatedUser, message: "User Updated" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    const { userId } = req.params;

    try {
      //check for existing users
      const existingUser = await UserModel.findUserById(userId);
      if (!existingUser) {
        return res.statusCode(400);
      }

      const deletedProfile = await ProfileModel.deleteProfileById(userId);
      const deletedUser = await UserModel.deleteUserById(userId);
      res
        .status(200)
        .json({ success: true, deletedUser, message: "User Deleted" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
