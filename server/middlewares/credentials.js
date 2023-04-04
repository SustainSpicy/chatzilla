import allowedOrigins from "../config/allowedOrigins.js";

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    console.log("allowed");

    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", origin);
    // res.header("access-control-expose-headers", "Set-Cookie");
  }
  next();
};
export default credentials;
