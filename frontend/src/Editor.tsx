import { useState, useEffect } from "react";
import axios from "axios";

// Axios 
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
  const [startTime, setStartTime] = useState<number | null>(null);
 

  // Handle form submission to save the note to the backend
  const handleSubmit = async () => {
    const currentTitle = title.trim() || "Untitled";
    const currentBody = body;

    // Do nothing if both title and body are completely empty
    if (currentTitle === "Untitled" && currentBody.trim().length === 0) return;

    setIsSaving(true);
    setSaveStatus("");

    try {
      // Send the POST request to our API
      await api.post("/notes", {
        title: currentTitle,
        content: currentBody,
        startTime,
      });
      
      setSaveStatus("Note saved to MongoDB!");
      
      // Reset the form back to a blank state after a successful save
      setTitle("");
      setBody("");
      setStartTime(null);

    } catch (error) {
      console.error("Save failed:", error);
      setSaveStatus("Failed to save note");
    } finally {
      setIsSaving(false);
    }
  };

  // Automatically clear the save status message after 3 seconds
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
        onChange={(e) => {
            if (startTime === null) {
                setStartTime(Date.now());
            }
            setBody(e.target.value);
        }}
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
