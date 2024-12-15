import jwt from "jsonwebtoken";
export const SECRET_KEY = "this is secret key";

export const auth = (req: any, res: any, next: any) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
