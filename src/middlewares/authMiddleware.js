import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.sendStatus(401);

    try {
      const decoded = jwt.verify(token, SECRET);

      if (roles.length && !roles.includes(decoded.role)) {
        return res.sendStatus(403);
      }

      req.user = decoded;
      next();
    } catch {
      return res.sendStatus(401);
    }
  };
};