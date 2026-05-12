import { Request, Response } from "express";
import Note from "../models/Note";

// route will post req here
export const createNote = async (req: Request, res: Response): Promise<void> => {
  console.log("NEW CONTROLLER WORKING");
  try {
    const { title, content, startTime } = req.body;

    const totalTime = Math.floor((Date.now() - startTime) / 1000); // Calculate total time in seconds

    const totalWords = content.trim().split(" ").filter(Boolean).length; // Count total words

    const totalCharacters = content.length; // Count total characters

    const typingSpeed = Math.round((totalWords / totalTime) * 60); // Calculate typing speed in words per minute

    const note = await Note.create({
      title: title || "Untitled",
      content: content || "",
      analysis: {
        totalTime,
        totalWords,
        totalCharacters,
        typingSpeed,
      },
    });
    res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Failed to create note" });
  }
};
