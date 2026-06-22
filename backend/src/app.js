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
app.use(cors({
    origin: "https://leads-frontend-mu.vercel.app/", 
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