import User from "../models/user-model.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const handleRefreshToken = async (req, res) => {
  const cookies = req.signedCookies;
  console.log("cookies", req.cookies);
  console.log("cookies2", req.signedCookies);
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  //check for user with refresh token
  const existingUser = await User.findOne({ refreshToken }).exec();
  if (!existingUser) return res.sendStatus(403); //forbidden

  jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
    if (err || existingUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        username: decoded.username,
        id: decoded.id,
      },
      ACCESS_SECRET,
      { expiresIn: "30s" }
    );

    res.json({ accessToken });
  });
};
