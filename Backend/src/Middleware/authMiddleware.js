import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default protect;
