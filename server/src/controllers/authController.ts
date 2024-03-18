import { NextFunction, Request, Response } from "express";

import userSchema from "../models/User";
import noteSchema from "../models/Note";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authController = {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await userSchema.findFirst({ username });
    if (!username || !password) {
      return res.status(400).send("All fields is missing");
    }
    if (!user) {
      return res.status(404).send("Invalid data");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).send("Invalid password");
    }

    const accessToken = jwt.sign(user.id!, process.env.ACCESS_TOKEN_SECRET!);

    res.json({ accessToken });
  },
  authenticateToken: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authToken = req.headers["authorization"];
    const token = authToken?.split(" ")[1] 
        console.log(authToken);
    next()
  },
};

export default authController;
