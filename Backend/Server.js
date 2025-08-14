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

// ✅ Allowed frontend URLs
const allowedOrigins = [
  "https://pokak-task-manager-x3sq-1l4i9cmri.vercel.app"
];

// ✅ CORS configuration object
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  optionsSuccessStatus: 200
};

// ✅ Apply CORS globally
app.use(cors(corsOptions));

// ✅ Handle preflight with same options
app.options("*", cors(corsOptions));

connectDB();

// Routes
app.use("/api/user", UserRouter);
app.use("/api/tasks", Taskrouter);

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
// import Taskrouter from "./src/Routes/taskRoute.js";
// import errorHandler from "./src/Middleware/errorHandler.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// const allowedOrigins = [
//     "https://pokak-task-manager-x3sq.vercel.app",
//   ];
//   app.use(cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true
//   }));


// connectDB();

// // Backend routes
// app.use("/api/user", UserRouter);
// app.use("/api/tasks", Taskrouter);

// // Error handler
// app.use(errorHandler);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server is running on Port ${PORT}`);
// });
