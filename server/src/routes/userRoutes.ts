import { Router } from "express";
import usersController from "../controllers/usersController";

const router = Router();

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

export default router;
