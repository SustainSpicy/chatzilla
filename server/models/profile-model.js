import { Schema, model } from "mongoose";
import { VISIBILITY_TYPE } from "../constants/index.js";
const profileSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: "UserMod", required: true },
    bio: String,
    visibility: {
      type: String,
      enum: [VISIBILITY_TYPE.PUBLIC, VISIBILITY_TYPE.PRIVATE],
      default: () => VISIBILITY_TYPE.PUBLIC,
    },
  },
  { timestamps: true }
);
profileSchema.statics.deleteProfileById = async function (userId) {
  return await this.deleteOne({ _id: userId });
};
const ProfileMod = model("Profile", profileSchema);

export default ProfileMod;
