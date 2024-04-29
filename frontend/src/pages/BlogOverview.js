import React, { useState } from "react";
import "./BlogOverview.css";

import Form from "../componenets/Form";
import ConfirmModal from "../componenets/ConfirmationModal";

import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);

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

  // Example usage: Add a blog with a button click
  const handleAddBlogClick = () => {
    const baseName = "New Blog";
    const uniqueName = generateUniqueName(baseName);
    // New blog details
    const newBlog = {
      id: uuidv4(),
      name: uniqueName,
      items: 1,
      words: 0,
      lastUpdated: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    };

    setBlogList((currentBlogs) => [...currentBlogs, newBlog]);
  };

  // Function to handle delete blog
  const handleDeleteBlogClick = (id) => {
    setCurrentBlogId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  return (
    <>
      <Form />
      <div className="file-system-container">
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleConfirmDelete}
          blogName={
            blogList.find((blog) => blog.id === currentBlogId)?.name || ""
          }
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
                  <td className="blog-name">
                    
                    <Link to={`/edit/${blog.id}`} className="link">
                      {blog.name}
                    </Link>
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
