import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import userSchema from "./models/User";
import noteSchema from "./models/Note";

const app: Application = express();

const port: number = 5000 || process.env.PORT;

dotenv.config();

console.log(process.env.NODE_ENV);


app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);


routes(app);

// app.get("/toto", async (req: Request, res: Response) => {
//   const newUser = await userSchema.create({
//     username: "khaled",
//     password: "sercret pwd2",
//     roles: ["Employee"],
//     active: true,
//   });
//   res.send(newUser);
// });
app.get("/toto", async (req: Request, res: Response) => {
  const newUser = await noteSchema.create({
    title: "test",
    text: "hello test one",
    completed: false,
    userId: "64372818-1f77-4236-b194-5052c4aea376",
    ticket: 0,
  });
  res.send(newUser);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
