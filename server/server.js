import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWbhooks } from './controllers/webhooks.js'


//Initialize express
const app= express()

//connect to db
await connectDB()

//Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.get('/',(req,res)=>res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWbhooks)

Sentry.setupExpressErrorHandler(app);

export default app;