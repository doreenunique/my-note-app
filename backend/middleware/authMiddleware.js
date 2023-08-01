const jwt = require("jsonwebtoken");

// Middleware to verify user authentication
const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, "athens");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
