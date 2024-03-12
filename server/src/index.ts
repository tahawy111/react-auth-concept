import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import userSchema from "./models/User";

const app: Application = express();

const port: number = 5000 || process.env.PORT;

dotenv.config();

console.log(process.env.NODE_ENV);

app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use(express.json());

routes(app);

app.get("/toto", async (req: Request, res: Response) => {
  const newUser = await userSchema.create({
    username: "amer",
    password: "sercret pwd",
    rules: ["Employee"],
    active: true,
  });
  res.send(newUser);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
