import { Router } from "express";

import {
  createUser,
  getUserById,
  updateUser,
} from "../controllers/userController";
import AuthenticationRoutes from "./AuthenticationRoutes";
import { deleteRefreshToken } from "../controllers/authController";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.use("/auth", AuthenticationRoutes);
router.post("/", createUser);

router.use(authenticate);

router.delete("/logout", deleteRefreshToken);

router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
