import jwt from "jsonwebtoken";

const validateJWT = (req, res, next) => {
  let token;
  token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.id = decodedToken.dataJWT.id;
      next();
    } catch (error) {
      return res.status(401).json({ msg: error.message, success: false });
    }
  }
};

export default validateJWT;
