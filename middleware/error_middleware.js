const errorMiddleware = (err, req, res, next) => {
  console.error("🔥 Error:", err.message);

  res.status(500).json({
    message: "Something went wrong",
    error: err.message
  });
};

module.exports = errorMiddleware;
