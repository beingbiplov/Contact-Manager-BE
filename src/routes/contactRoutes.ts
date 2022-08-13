import { Router } from "express";

import { createContact, deleteContact } from "../controllers/contactController";

const router = Router();

router.post("/", createContact);
router.delete("/:id", deleteContact);

export default router;
