import User from "../models/User.js";
import Authority from "../models/Authority.js";
import generateToken from "../utils/generateToken.js";

// @desc Register a new user or authority
// @route POST /api/auth/register
// @access Public
export const register = async (req, res) => {
  try {
    const { name, email, password, role, address, location } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Check if user or authority already exists
    const existingUser = await User.findOne({ email });
    const existingAuthority = await Authority.findOne({ email });
    if (existingUser || existingAuthority) {
      return res.status(400).json({ message: "Email already registered" });
    }

    if (role === "authority") {
      if (!address || !location)
        return res
          .status(400)
          .json({ message: "Address and location required for authorities" });

      const authority = await Authority.create({
        name,
        email,
        password,
        address,
        location,
        role: "authority",
      });

      return res.status(201).json({
        _id: authority._id,
        name: authority.name,
        email: authority.email,
        role: authority.role,
        token: generateToken(authority._id, authority.role),
      });
    } else {
      const user = await User.create({
        name,
        email,
        password,
        role: "user",
        location,
      });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Login user or authority
// @route POST /api/auth/login
// @access Public
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });
    
     if (!password || password.length < 6) {
       return res
         .status(400)
         .json({ message: "Password must be at least 6 characters long." });
     }

    // Determine which collection to search
    const account =
      role === "authority"
        ? await Authority.findOne({ email })
        : await User.findOne({ email });

    if (!account) return res.status(400).json({ message: "Account not found" });

    const isMatch = await account.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      _id: account._id,
      name: account.name,
      email: account.email,
      role: account.role,
      token: generateToken(account._id, account.role),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
