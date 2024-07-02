const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")
const wishlistRoute = require("./routes/wishlistRoute")
// Load environment variables
dotenv.config();

const app = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Middleware for handling CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

// Middleware for logging HTTP requests
app.use(morgan("dev"));

// MongoDB connection string from environment variables
const DB = process.env.DB;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("DB Connected successfully");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

// Connect to the database
connectDB();

// Route for authentication
app.use("/api/v1/users", authRoute,userRoute);
app.use("/api/v1/products",productRoute)
app.use("/api/v1/wishlist",wishlistRoute)
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
