const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* REGISTER LOGIC */

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    next(error);
  }
};

/* LOGIN LOGIC */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    next(error);
  }
};

/* ADDING PREFERENCE LOGIC */
const updatePreferences = async (req, res, next) => {
  try {
    const { topics, language, country } = req.body;

    await User.findByIdAndUpdate(req.user.userId, {
      preferences: {
        topics,
        language,
        country
      }
    });

    res.json({
      message: "Preferences updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  updatePreferences
};
