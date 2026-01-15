const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth_middleware");
const {
  register,
  login,
  updatePreferences
} = require("../controllers/auth_controllers");

router.post("/register", register);
router.post("/login", login);
router.put("/preferences", authMiddleware, updatePreferences);

module.exports = router;
