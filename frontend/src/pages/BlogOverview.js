import React, { useState } from "react";
import "./BlogOverview.css";

import Form from "../components/Form";
import ConfirmModal from "../components/ConfirmationModal";
import NewBlogModal from "../components/NewBlogModal";
import TextEditor from "../components/TextEditor";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash as trash,
  faPlus as plus,
} from "@fortawesome/free-solid-svg-icons";

library.add(trash, plus);

function FileSystem() {
  const usersBlogs = [
    {
      id: uuidv4(),
      name: "Document 1",
      words: 1500,
      lastUpdated: "2023-04-01",
    },
    {
      id: uuidv4(),
      name: "Report 2",
      words: 1100,
      lastUpdated: "2023-04-02",
    },
  ];

  const [blogList, setBlogList] = useState(usersBlogs);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [isTextEditorVisible, setIsTextEditorVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);  

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isNewBlogModalOpen, setIsNewBlogModalOpen] = useState(false);

  // Handlers
  const handleBlogClick = (blog) => {
    setCurrentBlog(blog);
    setIsTextEditorVisible(true);
  };

  // Helper function to generate a unique blog name
  const generateUniqueName = (baseName) => {
    let newName = baseName;
    let counter = 1;
    // Check if the name already exists in the list
    while (blogList.some((blog) => blog.name === newName)) {
      newName = `${baseName} ${counter++}`;
    }
    return newName;
  };

  const handleAddBlogClick = () => {
    setIsNewBlogModalOpen(true); // Open the New Blog modal
  };

  const handleCreateNewBlog = (blogName) => {
    const baseName = "New Blog";
    // Generate a unique name based on the input or default to "New Blog" if empty
    const finalName = blogName.trim() ? blogName : generateUniqueName(baseName);

    const newBlog = {
      id: uuidv4(),
      name: finalName,
      words: 0, // Initialize with zero words
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setBlogList((currentBlogs) => [...currentBlogs, newBlog]);
    setIsNewBlogModalOpen(false); // Close the modal after adding the blog
  };

  const handleCloseNewBlogModal = () => {
    setIsNewBlogModalOpen(false);
  };

  // Function to handle delete blog
  const handleDeleteBlogClick = (id) => {
    setCurrentBlogId(id);
    setIsConfirmModalOpen(true); // Corrected to use the right state variable
  };

  const closeModal = () => {
    setIsConfirmModalOpen(false); // Ensure this uses the right state variable
    setCurrentBlogId(null);
  };

  const handleConfirmDelete = () => {
    setBlogList((currentBlogs) =>
      currentBlogs.filter((blog) => blog.id !== currentBlogId)
    );
    closeModal();
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  // Handle individual file checkbox change
  const handleCheckboxChange = (fileId) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter((id) => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };

  // Handle master checkbox toggle
  const handleMasterCheckboxChange = () => {
    if (selectedFiles.length === usersBlogs.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(usersBlogs.map((file) => file.id));
    }
  };

  if (isTextEditorVisible && currentBlog) {
    return <TextEditor blog={currentBlog} onBack={() => setIsTextEditorVisible(false)} />;
  }

  return (
    <>
      <Form />
      <div className="file-system-container">
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={() => {
            setBlogList((blogs) =>
              blogs.filter((blog) => blog.id !== currentBlogId)
            );
            setIsConfirmModalOpen(false);
          }}
          blogName={
            blogList.find((blog) => blog.id === currentBlogId)?.name || ""
          }
        />
        <NewBlogModal
          isOpen={isNewBlogModalOpen}
          onClose={handleCloseNewBlogModal}
          onConfirm={handleCreateNewBlog}
        />
        <div className="file-system-header">
          <button onClick={handleAddBlogClick}>
            <FontAwesomeIcon icon="fa-solid fa-plus" className="add-icon" />
            <span className="text">Create Blog</span>
          </button>
        </div>
        <div className="file-system-table">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={() => handleMasterCheckboxChange}
                    checked={selectedFiles.length === usersBlogs.length}
                  />
                </th>
                <th>Name</th>
                <th>Words</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {blogList.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(blog.id)}
                      onChange={() => handleCheckboxChange(blog.id)}
                    />
                  </td>
                  <td
                    className="blog-name"
                    onClick={() => handleBlogClick(blog)}
                  >
                    {blog.name}
                  </td>
                  <td>{blog.words}</td>
                  <td>{blog.lastUpdated}</td>
                  <td>
                    <FontAwesomeIcon
                      onClick={() => handleDeleteBlogClick(blog.id)}
                      cursor="pointer"
                      icon="fa-solid fa-trash"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default FileSystem;
