import { Schema, model } from "mongoose";
export const PROFILE_TYPES = {
  PUBLIC: "public",
  PRIVATE: "private",
};
const profileSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Userr",
  },
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
  settings: {
    privacy: {
      type: String,
      required: true,
      default: () => PROFILE_TYPES.PUBLIC,
    },
  },
});

profileSchema.statics.createProfile = async function (
  userId,
  name,
  bio,
  privacy
) {
  try {
    const user = await this.create({
      userId,
      name,
      bio,
      settings: { privacy },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const Profile = model("Profiless", profileSchema);

export default Profile;
