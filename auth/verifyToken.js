import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization Denied" });
  }
  try {
    const token = authToken.split(" ")[1];
    const validatedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = validatedToken.id;
    req.role = validatedToken.role;
    req.userName = validatedToken.userName;
    // req.userEmail = validataedToken.userEmail;
    // console.log("Token:", token);
    // console.log("Secret Key:", process.env.JWT_SECRET_KEY);
    // console.log("Validated Token:", validatedToken);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

//restricting user based on role
export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    const userRole = user.role;
    if (userRole === "user" && roles.includes("user")) {
      next();
    } else if (userRole === "admin" && roles.includes("admin")) {
      next();
    } else {
      return res
        .status(401)
        .json({
          success: false,
          message: `${userRole} is not authorized to access this data`,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
