import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import analyzeRouter from "./routes/analyze.js";
import mongoose from "mongoose";

// app config
const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://vitacare.health',
      'https://www.vitacare.health',
      'https://vitacare-admin.vercel.app',
      'https://vitacare.vercel.app',
      'https://vitacare-health.vercel.app',
      /^https:\/\/.*\.vercel\.app$/,
      /^https:\/\/.*\.onrender\.com$/,
      /^https:\/\/.*\.netlify\.app$/
    ];
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// middlewares
app.use(express.json());
app.use(cors(corsOptions));

// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api", analyzeRouter);

// Remove the static uploads middleware since we're using Cloudinary
// app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Working");
});

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: dbStatus,
      environment: process.env.NODE_ENV || "development"
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);