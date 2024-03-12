import { Application } from "express";
import userRoutes from "./userRoutes";

export default function (app: Application) {
  app.use("/users", userRoutes);
  // app.use("/api", user);
  // app.use("/api", category);
  // app.use("/api", blog);
  // app.use("/api", comment);
}
