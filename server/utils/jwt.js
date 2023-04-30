//utils
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
//secrete keys
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const encode = (userData) => {
  //generate access token payload

  const payload = {
    userId: userData._id,
    username: userData.username,
  };

  console.log("encoded");
  const accessToken = jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "1d",
  });
  return { payload, accessToken };

  //set cookie
  //   res.cookie("jwt", refreshToken, {
  //     maxAge: 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //     secure: true,
  //     SameSite: "None",
  //   });
};
export const decode = async (req) => {
  if (!req.headers["authorization"]) {
    return res
      .status(400)
      .json({ success: false, message: "No access token provided" });
  }
  const accessToken = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(accessToken, ACCESS_SECRET);
  req.userId = decoded.id;
  req.userName = decoded.username;
  console.log("decoded");
  return true;
};
