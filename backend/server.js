import express from 'express'
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

// initialize express app
const app = express();

// connect database
try {
  await connectDB();
  console.log("Database connection successful");
} catch (error) {
  console.error("Database connection failed:", error.message);
  process.exit(1);
}

// ✅ FINAL CORS CONFIG (FIXED)
const allowedOrigins = [
  "http://localhost:5173",
  "https://car-rental-chi-five.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests like Postman or server-to-server
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed: " + origin));
    }
  },
  credentials: true
}));

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => res.send("server is running"));

app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);

// port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
