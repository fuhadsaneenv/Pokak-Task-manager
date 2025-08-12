import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/Config/dbConfig.js";
import UserRouter from "./src/Routes/userRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/user', UserRouter);




const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
