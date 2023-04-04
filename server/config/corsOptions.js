import allowedOrigins from "./allowedOrigins.js";
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (allowedOrigins.indexOf(orgin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
