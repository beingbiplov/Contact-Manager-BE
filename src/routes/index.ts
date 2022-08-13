import { Router } from "express";

import userRoutes from "./userRoutes";
import contactRoutes from "./contactRoutes";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.use("/users", userRoutes);

router.use(authenticate);
router.use("/contacts", contactRoutes);

export default router;
