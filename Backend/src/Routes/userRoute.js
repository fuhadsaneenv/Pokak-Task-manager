import express from "express";
import {
  login,
  logout,
  register,
  getCurrentUser,
} from "../Controller/UserController.js";
import protect from "../Middleware/authMiddleware.js";

const UserRouter = express.Router();

UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.post("/logout", logout);
UserRouter.get("/me", protect, getCurrentUser);

export default UserRouter;
