import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
// import { useState } from "react";

function TextEditor({ blogContent }) {
  // const [content, setContent] = useState("");
  // console.log(blogContent)
  return (
    <div className="text-editor-container">
      <ReactQuill className="text-editor-input" value={blogContent} theme="snow" />
    
    </div>
  );
}

export default TextEditor;
