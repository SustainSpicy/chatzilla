import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.statics.userExist = async function (username) {
  try {
    const existingUser = await this.findOne({ username });

    return existingUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
userSchema.statics.createUser = async function (
  username,
  password,
  email,
  phone
) {
  try {
    const user = await this.create({ username, password, email, phone });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
};
userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw { error: "No user with this id found" };
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.deleteOne({ _id: id });

    return result;
  } catch (error) {
    throw error;
  }
};
userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
};
const User = model("Userr", userSchema);

export default User;
