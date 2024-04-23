import React, { useState, useEffect } from "react";
import axios from "axios";

import NavBar from "./componenets/NavBar";
import Form from "./componenets/Form";
import TextEditor from "./componenets/TextEditor";

import "./App.css";
import Landing from "./Landing";

function App() {
  const [message, setMessage] = useState();
  const [blogContent, setBlogContent] = useState("");

  const state = true;

  useEffect(() => {
    axios
      .get("http://localhost:5000/message")
      .then((response) => {
        // console.log('Data received:', response.data.message);
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  // I want to create

  return (
    <div className="app">
      <NavBar />
      <div className="app-body">
        {state ? (
          <Landing />
        ) : (
          <>
            <Form setBlogContent={setBlogContent} />
            <TextEditor blogContent={blogContent} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
