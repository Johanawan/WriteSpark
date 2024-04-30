import React, { useState } from "react";
import "./NewBlogModal.css";

function NewBlogModal({ isOpen, onClose, onConfirm }) {
  const [blogName, setBlogName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent the form from causing a page reload
    onConfirm(blogName);
    setBlogName("")
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Create A New Blog</h2>
          <label htmlFor="blogName">Blog Name:</label>
          <input
            type="text"
            id="blogName"
            value={blogName}
            onChange={(e) => setBlogName(e.target.value)}
          />
          <button type="submit">Create Blog</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default NewBlogModal;