import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
// import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Form from "./Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft as back } from "@fortawesome/free-solid-svg-icons";

library.add(back);

function TextEditor({ blogContent, blog, onBack  }) {
  const { blogId } = useParams(); // Access blogId from the URL
  // const [content, setContent] = useState("");
  // console.log(blogContent)

  return (
    <>
      <Form />
      <div className="text-editor-container">
        <div className="text-editor-header">
        <button onClick={onBack} className="back-icon">
            <FontAwesomeIcon icon={back} />
          </button>

          {/* Blog name should go here */}
          <span>{blog.name}</span>
        </div>

        <ReactQuill
          className="text-editor-input"
          value={blogContent}
          theme="snow"
        />
      </div>
    </>
  );
}

export default TextEditor;
