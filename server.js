const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const quizRoutes = require("./routes/quizzes");
const authRoutes = require("./routes/auth").router; // Adjusted import for named export
app.use("/api", quizRoutes);
app.use("/api/auth", authRoutes); // Prefix for auth routes

// Define a simple route
app.get("/", (req, res) => {
  res.send("Welcome to the Quiz App API");
});

// Server configuration with timeouts
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port: ${port}`);
});

server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000; // 120 seconds
