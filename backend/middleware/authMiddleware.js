const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // IMPORTANT FIX
      req.user = decoded;

      next();

    } else {

      return res.status(401).json({
        message: "No token provided"
      });
    }

  } catch (error) {

    return res.status(401).json({
      message: "Token failed"
    });
  }
};

module.exports = protect;