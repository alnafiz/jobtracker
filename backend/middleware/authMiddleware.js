const jwt = require("jsonwebtoken"); // JWT token verify korar jonno

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization; // Request header theke Authorization neya holo

  // Header thakte hobe ar 'Bearer ' diye shuru hote hobe
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  const token = authHeader.split(" ")[1]; // 'Bearer <token>' theke shudhu token ongsho alada kora holo

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // .env-er secret diye token verify
    req.userId = decoded.userId; // Verified user-er ID request object-e attach kora holo
    next(); // Poroborti route handler-e pathano holo
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Not authorized, invalid or expired token" });
  }
};

module.exports = protect;
