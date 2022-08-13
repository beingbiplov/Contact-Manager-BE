import { Router } from "express";

import {
  createContact,
  deleteContact,
  getContacts,
  getContactById,
  updateContact,
} from "../controllers/contactController";

const router = Router();

router.get("/", getContacts);
router.get("/:id", getContactById);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
