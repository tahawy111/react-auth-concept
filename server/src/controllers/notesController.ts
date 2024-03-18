import { Request, Response } from "express";

import userSchema from "../models/User";
import noteSchema from "../models/Note";
import bcrypt from "bcrypt";

const notesController = {
  // @desc Get all notes
  // @route GET /notes
  // @access Private
  getAllNotes: async (req: Request, res: Response) => {
    // Get all notes from MongoDB
    const notes = await noteSchema.findMany();

    // If no notes
    if (!notes?.length) {
      return res.status(400).json({ message: "No notes found" });
    }

    // Add username to each note before sending the response
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
    // You could also do this with a for...of loop
  
    res.json(notes);
  },
  // @desc Create new note
  // @route POST /notes
  // @access Private
  createNewNote: async (req: Request, res: Response) => {
    const { userId, title, text } = req.body;

    // Confirm data
    if (!userId || !title || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate title
    const duplicate = await noteSchema.findFirst({ title });

    if (duplicate) {
      return res.status(409).json({ message: "Duplicate note title" });
    }

    const checkNotesExistance = await noteSchema.findMany();
    let noteObject = {
      userId,
      title,
      text,
      completed: false,
      ticket: 0,
    };
    if (checkNotesExistance && checkNotesExistance.length > 0) {
      const theLastOneTicket = checkNotesExistance.reduce((prev, curr) =>
        curr.id! > prev.id! ? curr : prev
      ).ticket

      noteObject.ticket = theLastOneTicket + 1
    }

    // Create and store the new user
    const note = await noteSchema.create(noteObject);

    if (note) {
      // Created
      return res.status(201).json({ message: "New note created" });
    } else {
      return res.status(400).json({ message: "Invalid note data received" });
    }
  },
  // @desc Update a note
  // @route PATCH /notes
  // @access Private
  updateNote: async (req: Request, res: Response) => {
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
  // @desc Delete a note
  // @route DELETE /notes
  // @access Private
  deleteNote: async (req: Request, res: Response) => {
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

export default notesController;
