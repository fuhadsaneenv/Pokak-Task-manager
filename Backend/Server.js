import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/Config/dbConfig.js";
import UserRouter from "./src/Routes/userRoute.js";
import Taskrouter from "./src/Routes/taskRoute.js";
import errorHandler from "./src/Middleware/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    "https://pokak-task-manager-x3sq.vercel.app"
  ];
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }));


connectDB();

// Backend routes
app.use("/user", UserRouter);
app.use("/tasks", Taskrouter);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./src/Config/dbConfig.js";
// import UserRouter from "./src/Routes/userRoute.js";
// import errorHandler from "./src/Middleware/errorHandler.js";
// import cors from "cors"
// import Taskrouter from "./src/Routes/taskRoute.js";
// import cookieParser from "cookie-parser";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cookieParser());

// app.use(
//     cors({
//         origin: ['http://localhost:5173',
//         "https://pokak-task-manager-x3sq-g60dfua1p.vercel.app"],

//         credentials: true,
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type', 'Authorization'],
//     })
// );
// connectDB();

// app.use('/api/user', UserRouter);
// app.use('/api/tasks', Taskrouter);

// app.use(errorHandler)

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server is running on Port ${PORT}`);
// });
