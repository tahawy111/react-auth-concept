import { Application } from "express";
import userRoutes from "./userRoutes";
import noteRoutes from "./noteRoutes";
import authRoutes from "./authRoutes";

export default function (app: Application) {
  app.use("/users", userRoutes);
  app.use("/note", noteRoutes);
  app.use("/auth", authRoutes);
}
