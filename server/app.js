import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWbhooks } from './controllers/webhooks.js'

// Initialize express
const app = express()

// Connect to DB
await connectDB()

// Middlewares
app.use(cors())

// Webhook route MUST come before express.json()
app.post(
  '/webhooks',
  express.raw({ type: 'application/json' }),
  clerkWbhooks
)

// Then use express.json()
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send("API Working"))

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);

export default app;