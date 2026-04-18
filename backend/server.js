import express from 'express'
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

// initialize express app
const app = express() 

// connect database
try {
  await connectDB()
  console.log("Database connection successful")
} catch (error) {
  console.error("Database connection failed:", error.message)
  process.exit(1)
}

// CORS: set CORS_ORIGIN in production to your frontend origin(s), comma-separated (e.g. https://app.vercel.app,https://preview.vercel.app)
const defaultOrigins = 'http://localhost:5173'
const allowedOrigins = (process.env.CORS_ORIGIN || defaultOrigins)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(null, false)
  },
  credentials: true,
  optionsSuccessStatus: 200
}

// middleware
app.use(cors(corsOptions));
app.use(express.json());

app.get('/',(req,res)=>res.send("server is running"))
app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/bookings',bookingRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
