//Check if the user is logged in before allowing access to a route.
//If the user is not logged in → access denied ❌
//If the user is logged in → access allowed ✅

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {  // Middleware function to protect routes
  try {
    const authHeader = req.headers.authorization; // When a user makes a request, they send a token like this: Authorization: Bearer eyJhbGciOiJIUzI1... This line reads that token from the request.

    // ❌ No header or not Bearer
    if (!authHeader || !authHeader.startsWith("Bearer")) {  // Check for Bearer token
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];   // Extract token from header. From this: Bearer abc123token, we get this: abc123token  

    // 🔓 Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token. This checks if the token is valid and not expired.

    // 🔍 Load user from DB (without password)
    const user = await User.findById(decoded.id).select("-password");   // Find user by ID in MongoDB, exclude password field.

    if (!user) {
      return res.status(401).json({ message: "User not found" }); // User not found/invalid
    }

    // Attach user to request
    req.user = user;  // Set req.user to the loaded user,(i.e) Now every next route can access the logged-in user using: req.user

    // Make sure isAdmin is available (from DB or token)
    if (typeof decoded.isAdmin !== "undefined") {   // If isAdmin in token, use it
      req.user.isAdmin = decoded.isAdmin;   // Set isAdmin from token
    }

    next(); //This means user is verified. Let them go to the next route.
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default protect;  

//Overall, this middleware ensures that only authenticated users can access certain routes by verifying their JWT tokens and loading their user data from the database.

// Why Do We Create authMiddleware?
//We create authMiddleware to:🔐 Protect important backend routes so only logged-in users can access them. Without this middleware, ANYONE on the internet could:Add products ❌,
//Delete data ❌,View private user info ❌,Act like a real user ❌
