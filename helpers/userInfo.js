import jwt from "jsonwebtoken";
export const getUserInfoFromRequest = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      {},
      async (error, cookieData) => {
        if (error) throw error;
        resolve(cookieData);
      }
    );
  });
};
