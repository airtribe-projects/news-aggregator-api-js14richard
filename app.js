const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth_routes");
const newsRoutes = require("./routes/news_routes");
const errorMiddleware = require("./middleware/error_middleware");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());    
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

app.use(errorMiddleware);


app.listen(port, (err) => {
  if (err) {
    return console.log("Error starting news aggregator", err);
  }
  console.log(`🚀 Server is listening on port ${port}`);
});

module.exports = app;
