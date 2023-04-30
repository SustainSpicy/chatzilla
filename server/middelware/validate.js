import validate from "../utils/validate.js";

export const userValidation = (req, res, next) => {
  const { username, password, bio, visibility } = req.body;

  next();
};
