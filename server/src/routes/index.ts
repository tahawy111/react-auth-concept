import { Application } from "express";
import userRoutes from "./userRoutes";
import noteRoutes from "./noteRoutes";

export default function (app: Application) {
  app.use("/users", userRoutes);
  app.use("/note", noteRoutes);
}
