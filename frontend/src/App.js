import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from "./componenets/NavBar";
import Form from "./componenets/Form";
import TextEditor from "./componenets/TextEditor";
import FileSystem from "./pages/BlogOverview";

import "./App.css";
import Landing from "./pages/Landing";

function App() {
  const [message, setMessage] = useState();
  const [blogContent, setBlogContent] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/message")
  //     .then((response) => {
  //       // console.log('Data received:', response.data.message);
  //       setMessage(response.data.message);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  // }, []);

  return(
    <Router>
      <div className="app">
        <NavBar />
        <div className="app-body">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/create" element={<FileSystem />} />
            <Route path="/edit/:blogId" element={<TextEditor />} />
          </Routes>
        </div>
      </div>
    </Router>
  ); 
}

export default App;
