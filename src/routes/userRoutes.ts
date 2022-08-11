import { Router } from "express";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import AuthenticationRoutes from "./AuthenticationRoutes";
import { deleteRefreshToken } from "../controllers/authController";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.use("/auth", AuthenticationRoutes);
router.post("/", createUser);

router.use(authenticate);

router.delete("/logout", deleteRefreshToken);

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
