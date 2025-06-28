import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import analyzeRouter from "./routes/analyze.js";

// app config
const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://vitacare.health',
    'https://www.vitacare.health',
    'https://vitacare-admin.vercel.app',
    'https://vitacare.vercel.app',
    'https://vitacare-health.vercel.app'
  ],
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

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);