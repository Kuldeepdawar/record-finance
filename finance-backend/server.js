// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");
const financeRoutes = require("./routes/financeRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Logging setup
const logTransport = new winston.transports.File({
  filename: "./logs/combined.log",
});
const errorTransport = new winston.transports.File({
  filename: "./logs/error.log",
  level: "error",
});
const logger = winston.createLogger({
  level: "info",
  transports: [logTransport, errorTransport],
});

// Use routes
app.use("/api/finances", financeRoutes);

// Error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
