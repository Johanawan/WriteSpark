import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
// import { useState } from "react";
import { useParams } from 'react-router-dom';
import Form from "./Form";

function TextEditor({ blogContent }) {
  const { blogId } = useParams(); // Access blogId from the URL
  // const [content, setContent] = useState("");
  // console.log(blogContent)
  return (
    <>
    <Form/>
    <div className="text-editor-container">
      <ReactQuill className="text-editor-input" value={blogContent} theme="snow" />
    
    </div>
    </>
  );
}

export default TextEditor;
