import { useState } from "react";
import axios from "axios";

// Axios instance — pre-configured for future backend integration
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Suppress unused variable warning — will be used when backend is connected
void api;

const Editor: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

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
    </div>
  );
};

export default Editor;
