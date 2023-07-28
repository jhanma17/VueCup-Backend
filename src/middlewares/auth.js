const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({
      mensaje
    });
  }
  jwt.verify(token, "salchipapa", (error, decoded) => {
    if (error) {
      return res.status(401).json({
        mensaje: "No autorizado",
      });
    }

    req.userId = decoded.id;

    next();
  });
};

module.exports = verifyToken;