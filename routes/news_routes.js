const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth_middleware");
const { getPersonalizedNews } = require("../controllers/news_controllers");

router.get("/", authMiddleware, getPersonalizedNews);

module.exports = router;
