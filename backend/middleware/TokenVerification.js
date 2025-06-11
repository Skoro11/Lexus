import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()


export function authenticateToken(req, res, next) {
 
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  // If no token in header, check cookie
  if (!token && req.cookies) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.status(403).json({ message: "There is no access token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Access token is invalid" });
    req.user = user;
    next();
  });
}


