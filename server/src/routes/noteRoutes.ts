import { Router } from "express";
import notesController from "../controllers/notesController";

const router = Router();

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.createNewNote)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);

export default router;
