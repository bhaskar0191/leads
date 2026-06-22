import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import LeadRoute from './routes/LeadRoute.js';
import {connectDB} from './config/DB.js'

dotenv.config()
const app = express();
app.use(cookieParser());

 const allowedOrigins = [
  "https://leads-frontend-iota.vercel.app",                                         // your deployed frontend
  "http://localhost:5173",                // for local dev
];
app.use(cors({
    origin: allowedOrigins, 
    credentials:true
}));

// Parse URL-encoded bodies (optional, for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("server is conncet")
})

// app.listen(process.env.PORT, () => {
    //console.log(`Server is running on port ${process.env.PORT}`);
//})

// Connect to MongoDB
connectDB()
// Routes
app.use('/leads', LeadRoute);

export default app