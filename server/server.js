import express from 'express'
import cors from 'cors'
import 'dotenv/config'


//Initialize express
const app= express()

//Middlewares
app.use(cors())
app.use(express.json())