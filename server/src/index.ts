import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

const app: Application = express();

const port: number = 5000 || process.env.PORT;

dotenv.config();

app.get("/toto", (req: Request, res: Response) => {
  res.send("Hello toto");
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
