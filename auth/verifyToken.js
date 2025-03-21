import jwt from "jsonwebtoken";
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
    console.log("Token:", token);
    console.log("Secret Key:", process.env.JWT_SECRET_KEY);
    console.log("Validated Token:", validatedToken);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
