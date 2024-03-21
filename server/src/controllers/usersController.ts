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
    const users = findedUsers.filter(({ username, active, roles, id }) => ({
      username,
      active,
      roles,
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
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate
    const duplicate = await userSchema.findFirst({ username });

    if (duplicate) {
      return res.status(400).json({ message: "Duplicate username" });
    }

    // Hash Password
    const hashedPwd = bcrypt.hashSync(password, 10);

    const userObject = {
      username,
      password: hashedPwd,
      roles: roles || ["Admin"],
      active: true,
    };

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
  updateUser: async (req: Request, res: Response) => {
    const { id, username, roles, active, password } = req.body;

    // Confirm data
    if (
      !id ||
      !username ||
      !Array.isArray(roles) ||
      !roles.length ||
      typeof active !== "boolean"
    ) {
      return res
        .status(400)
        .json({ message: "All fields except password are required" });
    }

    // Does the user exist to update?
    const user = await userSchema.findFirst({ id });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check for duplicate
    const duplicate = await userSchema.findFirst({ username });

    // Allow updates to the original user
    if (duplicate && duplicate.id !== id) {
      return res.status(409).json({ message: "Duplicate username" });
    }

    user.username = username;
    user.roles = roles;
    user.active = active;

    if (password) {
      // Hash password
      user.password = await bcrypt.hash(password, 10); // salt rounds
    }

    const updatedUser = await userSchema.findByIdAndUpdate(id, user);

    res.json({ message: `${updatedUser?.username} updated` });
  },
  /* 
@desc Delete a user
@route DELETE /users
@access Private
*/
  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.body;

    // Confirm data
    if (!id) {
      return res.status(400).json({ message: "User ID Required" });
    }

    // Does the user still have assigned notes?
    const note = await noteSchema.findFirst({ userId: id });
    if (note) {
      return res.status(400).json({ message: "User has assigned notes" });
    }

    // Does the user exist to delete?
    const user = await userSchema.findFirst({ id });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const result = await userSchema.findByIdAndDelete(user.id!);

    const reply = `User deleted`;

    res.json(reply);
  },
};

export default usersController;
