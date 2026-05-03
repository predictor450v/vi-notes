import { Router } from "express";
import { createNote } from "../controllers/noteController";

const router = Router();

router.post("/", createNote);

export default router;
