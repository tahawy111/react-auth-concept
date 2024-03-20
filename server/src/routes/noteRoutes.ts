import { Router } from "express";
import notesController from "../controllers/notesController";
import authController from "../controllers/authController";

const router = Router();

router
  .route("/")
  .get(authController.authenticateToken, notesController.getAllNotes)
  .post(authController.authenticateToken, notesController.createNewNote)
  .patch(authController.authenticateToken, notesController.updateNote)
  .delete(authController.authenticateToken, notesController.deleteNote);
router.get(
  "/getNote",
  authController.authenticateToken,
  notesController.getNote
);

export default router;
