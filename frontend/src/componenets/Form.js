import React, { useState } from "react";
import axios from "axios";
import "./Form.css";



function Form({setBlogContent}) {
  const [formData, setFormData] = useState({
    blogLength: "500",
    tone: "Friendly",
    topic: "",
    keyPoints: "",
  });

  // Config snippet for API call
  const config = {
    headers: { "Content-Type": "application/json" },
    data: formData
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({name, value})
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add code here to handle the form submission, e.g., send data to a server
    try {
      console.log("API CALL")
      const { data } = await axios.post("http://localhost:5000/api/openai/generate-blog", config);
      console.log(data)
      setBlogContent(data)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Generate a blog</h2>
      <div className="form-group">
        <label className="form-label">
          Blog Length:
          <select
            name="blogLength"
            value={formData.blogLength}
            onChange={handleChange}
            className="form-control"
          >
            <option value="500">500 words</option>
            <option value="1000">1000 words</option>
            <option value="1500">1500 words</option>
            <option value="2000">2000 words</option>
            <option value="2500">2500 words</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Select Tone:
          <select
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="form-control"
          >
            <option value="Friendly">Friendly</option>
            <option value="Professional">Professional</option>
            <option value="Humorous">Humorous</option>
            <option value="Inspirational">Inspirational</option>
            <option value="Informative">Informative</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Blog Topic:
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="form-control"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Key Points:
          <textarea
            name="keyPoints"
            value={formData.keyPoints}
            onChange={handleChange}
            className="form-control"
          />
        </label>
      </div>
      <div className="form-group">
        <button type="submit" className="form-button">
          Write Blog
        </button>
      </div>
    </form>
  );
}

export default Form;
