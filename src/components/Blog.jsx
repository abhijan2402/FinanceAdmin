// Blog.js
import React, { useState } from "react";
import "../Style/Blog.css"; // Custom CSS for Blog styles

const Blog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    images: [],
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }
    setError("");
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.images.length < 1) {
      setError("Please upload at least 1 image.");
      return;
    }
    console.log("Blog Data:", formData);
    // Submit form logic here
  };

  return (
    <div className="container blog-form mt-4">
      <h1 className="text-center mb-4">Submit Blog</h1>
      <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-light">
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-pencil-square"></i> Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter blog title"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-card-text"></i> Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="Enter blog description"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-tags"></i> Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. React, JavaScript"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-file-earmark-image"></i> Upload Images (min 1, max 5)
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="form-control"
          />
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn custom-btn btn-lg mt-3"
          >
            <i className="bi bi-check-circle"></i> Submit Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default Blog;
