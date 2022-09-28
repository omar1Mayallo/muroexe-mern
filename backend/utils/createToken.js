import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({id: id}, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRE_IN}`,
  });
};

export default createToken;
