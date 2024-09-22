import React, { useEffect, useState } from "react";
import "../Style/Blog.css"; // Custom CSS for Blog styles
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Blog = ({ handleBlogForm, setBlog }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    images: [],
  });
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const [titleImage, setTitleImage] = useState("");
  const [dataImg, setDataImg] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (files.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      if (!validImageTypes.includes(files[i].type)) {
        setError("Please upload only image files (jpeg, png, gif, webp).");
        return;
      }
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
    createData(formData);
  };

  const createData = async (data) => {
    setLoader(true);
    setDisable(true);
    const titleImageUrl = await getDownloadUrl(titleImage);
    console.log(titleImageUrl, "IMGG");
    await addDoc(collection(db, "Blog"), {
      Title: data?.title,
      Description: data?.description,
      Tags: data?.tags,
      Image: titleImageUrl,
    })
      .then((docRef) => {
        alert("Blog added");
        setDisable(false);
        setLoader(false);
        return docRef.id;
      })
      .catch((e) => {
        alert("Error while adding blogs! Please try again later");
        setLoader(false);
        setDisable(false);
      });
  };

  const getDownloadUrl = async (file) => {
    const storageRef = ref(storage, `/Banner/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(downloadURL, "DOWNLAOD URL");
            resolve(downloadURL);
          } catch (e) {
            reject(false);
          }
        }
      );
    });
  };

  const UploadImge = async (e) => {
    const seperatoedNameArray = e.target.files[0].type.split("/");
    setTitleImage(e.target.files[0]);
  };

  return (
    <div className="overlay">
      <div className="blog-form-popup">
        <div className="bolgForm_header">
          <h1 className="text-center mb-4">Add Blog</h1>
          <i
            className="bi bi-x-square"
            onClick={() => handleBlogForm(false)}
          ></i>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
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
              <i className="bi bi-file-earmark-image"></i> Upload Image
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={(e) => {
                UploadImge(e);
                handleFileChange(e);
              }}
              className="form-control"
            />
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
          <div className="text-center">
            <button
              disabled={disable}
              type="submit"
              className="btn custom-btn btn-lg mt-3"
            >
              <i className="bi bi-check-circle"></i> Submit Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Blog;
