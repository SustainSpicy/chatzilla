//utils
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const verifyJWT = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) return res.sendStatus(401);

  const token = authHeaders.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.username;
    next();
  });
};
export default verifyJWT;
