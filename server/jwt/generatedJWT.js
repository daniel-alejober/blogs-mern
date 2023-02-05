import jwt from "jsonwebtoken";

const generatedJWT = (dataJWT) => {
  //*el el objeto iran los valores hasheados en el jwt
  return jwt.sign({ dataJWT }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default generatedJWT;
