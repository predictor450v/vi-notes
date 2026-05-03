import { Request, Response } from "express";
import Note from "../models/Note";

// POST /api/notes — create a new note
export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title: title || "Untitled",
      content: content || "",
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Failed to create note" });
  }
};
