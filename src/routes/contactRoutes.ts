import { Router } from "express";

import {
  createContact,
  deleteContact,
  getContacts,
  getContactById,
  updateContact,
  getFavContacts,
} from "../controllers/contactController";

const router = Router();

router.get("/favorite", getFavContacts);
router.get("/", getContacts);
router.get("/:id", getContactById);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
