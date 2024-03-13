import { Request, Response } from "express";

import userSchema from "../models/User";
import noteSchema from "../models/Note";
import bcrypt from "bcrypt";

const usersController = {
  /* 
@desc Get all users
@route GET /users
@access Private
*/
  getAllUsers: async (req: Request, res: Response) => {
    const findedUsers = await userSchema.findMany();
    if (!findedUsers) {
      return res.status(400).json({ message: "No users found" });
    }
    const users = findedUsers.filter(({ username, active, rules, id }) => ({
      username,
      active,
      rules,
      id,
    }));
    return res.json(users);
  },
  /* 
@desc Create new user
@route POST /users
@access Private
*/
  createNewUser: async (req: Request, res: Response) => {
    const { username, password, roles } = req.body;

    // Confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate
    const duplicate = await userSchema.findFirst({ username });

    if (duplicate) {
      return res.status(400).json({ message: "Duplicate username" });
    }

    // Hash Password
    const hashedPwd = bcrypt.hashSync(password, 10);

    const userObject = { username, password: hashedPwd, roles, active: true };

    // Create User and store new user

    const user = await userSchema.create(userObject);

    if (user) {
      return res.status(201).json({ message: `New User ${username} Created` });
    } else {
      return res.status(400).json({ message: `Invalid user data received` });
    }
  },
  /* 
@desc Update a user
@route PATCH /users
@access Private
*/
  updateUser: async (req: Request, res: Response) => {},
  /* 
@desc Delete a user
@route DELETE /users
@access Private
*/
  deleteUser: async (req: Request, res: Response) => {},
};

export default usersController;