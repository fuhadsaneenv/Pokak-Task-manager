import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/Config/dbConfig.js";
import UserRouter from "./src/Routes/userRoute.js";
import errorHandler from "./src/Middleware/errorHandler.js";
import cors from "cors"
import Taskrouter from "./src/Routes/taskRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);
connectDB();

app.use('/api/user', UserRouter);
app.use('/api/tasks', Taskrouter);



app.use(errorHandler)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
