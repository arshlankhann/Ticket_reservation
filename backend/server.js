require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

// MongoDB connection with serverless optimization
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }
  
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Ensure connection before handling requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/api/events", require("./routes/events"))
app.use("/api/book", require("./routes/books"))

// Export for Vercel
module.exports = app;

if (require.main === module) {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port " + (process.env.PORT || 5000));
  });
}