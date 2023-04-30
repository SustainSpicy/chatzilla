import { Schema, model, ObjectId } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String },
  },
  {
    timestamps: true,
    //instance method
    methods: {
      getName() {
        return this.username;
      },
    },
  }
);

userSchema.statics.getAllUser = async function () {
  return await this.find({});
};
userSchema.statics.createUser = async function (userData) {
  return await this.create(userData);
};

userSchema.statics.findUserByFied = async function (field) {
  return await this.findOne(field);
};
userSchema.statics.findUserById = async function (userId) {
  return await this.findOne({ _id: userId });
};

userSchema.statics.updateUserById = async function (userId, userData) {
  return await this.updateOne({ _id: userId }, { $set: userData });
};

userSchema.statics.deleteUserById = async function (userId) {
  return await this.deleteOne({ _id: userId });
};
const UserMod = model("User", userSchema);
export default UserMod;
