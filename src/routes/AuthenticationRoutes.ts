import { Router } from "express";

import {
  authenticateUser,
  getAccessToken,
} from "../controllers/authController";

const router = Router();

router.post("/login", authenticateUser);
router.post("/token", getAccessToken);

export default router;
