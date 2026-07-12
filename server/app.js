import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWbhooks } from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'


// Initialize express
const app = express()

// Connect to DB
await connectDB()
await connectCloudinary()

// Middlewares
app.use(
  cors({
    origin: "https://jobportal2026.vercel.app",
    credentials: true,
  })
);
app.use(express.json())
app.use(clerkMiddleware())

// Webhook route MUST come before express.json()
app.post(
  '/webhooks',
  express.raw({ type: 'application/json' }),
  clerkWbhooks
)


app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)



// Routes
app.get('/', (req, res) => res.send("API Working"))

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);

export default app;