import React, { useState } from 'react';
import "./Form.css";

function Form() {
    const [formData, setFormData] = useState({
        blogLength: '500',
        tone: 'Friendly',
        topic: '',
        keyPoints: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Add code here to handle the form submission, e.g., send data to a server
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
                <label className="form-label">
                    Blog Length:
                    <select name="blogLength" value={formData.blogLength} onChange={handleChange} className="form-control">
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
                    <select name="tone" value={formData.tone} onChange={handleChange} className="form-control">
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
                <button type="submit" className="form-button">Write Blog</button>
            </div>
        </form>
    );
}

export default Form;