import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors' 
import helmet from 'helmet'
import connectDB from './database/database.js'
import route from './router/route.js'
const app=express()

// initializing dont env
dotenv.config()

// middlewares
app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(route)
app.use(helmet())
// setting port from env file

const port=process.env.PORT || 5000

//conninting to Monogo DB
connectDB()

// declaring the port to be used in browser using listen
app.listen(5000,()=>{
    console.log("server started.......")
})