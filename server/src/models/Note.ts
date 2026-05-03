import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      default: "Untitled",
    },
    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, 
  }
);

const Note = mongoose.model<INote>("Note", noteSchema);

export default Note;
