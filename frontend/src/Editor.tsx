import { useState, useEffect } from "react";
import axios from "axios";

// Axios instance — configured for local backend
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const Editor: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>("");

  // Save note to backend
  const handleSubmit = async () => {
    const currentTitle = title.trim() || "Untitled";
    const currentBody = body;

    // Nothing to save if both are empty
    if (currentTitle === "Untitled" && currentBody.trim().length === 0) return;

    setIsSaving(true);
    setSaveStatus("");

    const payload = {
      title: currentTitle,
      content: currentBody,
    };

    try {
      // Create new note
      await api.post("/notes", payload);
      setSaveStatus("Note saved to MongoDB!");
      // Reset form to default blank state
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Save failed:", error);
      setSaveStatus("Failed to save note");
    } finally {
      setIsSaving(false);
    }
  };

  // Clear save status after a few seconds
  useEffect(() => {
    if (saveStatus) {
      const timer = setTimeout(() => setSaveStatus(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  return (
    <div className="editor">
      <div className="logo">Vi Notes</div>

      <input
        className="editor-title"
        type="text"
        placeholder="Untitled"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        spellCheck={false}
      />

      <textarea
        className="editor-body"
        placeholder="Start writing..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        spellCheck={false}
      />

      <div>
        <button 
          className="submit-btn" 
          onClick={handleSubmit}
          disabled={isSaving || (title.trim() === "" && body.trim() === "")}
        >
          {isSaving ? "Saving..." : "Submit Note"}
        </button>
        {saveStatus && <div className="save-status">{saveStatus}</div>}
      </div>
    </div>
  );
};

export default Editor;
