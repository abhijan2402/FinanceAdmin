import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import BlogCardLoader from "../components/BlogCardLoader"; // Loader component
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import "../Style/BlogList.css";

const BlogList = () => {
  const [popup, setPopup] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const handleBlogForm = (item) => {
    setPopup(item);
  };

  const getData = async () => {
    setLoading(true);
    let resultArray = [];
    const q = query(collection(db, "Blog"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArray.push({ id: doc.id, ...doc.data() });
    });
    setBlogData(resultArray);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="bloglist_header">
        <h1>Blog List</h1>
        <button className="blog_btn" onClick={() => handleBlogForm(true)}>
          Add Blogs
        </button>
      </div>
      <div className="container mt-4">
        <div className="row">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <BlogCardLoader key={index} />
            ))
          ) : blogData.length > 0 ? (
            blogData.map((blogItem) => (
              <div className="col-md-4 mb-4" key={blogItem.id}>
                <div className="card blog-card shadow-sm">
                  <img
                    src={blogItem.Image}
                    className="card-img-top"
                    alt={blogItem.Title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{blogItem.Title}</h5>
                    <p
                      className="card-text description"
                      style={{ fontFamily: "sans-serif", fontSize: "14px" }}
                    >
                      {blogItem.Description}
                    </p>
                    <div className="tags">
                      {blogItem.Tags.split(",").map((tag, tagIndex) => (
                        <span key={tagIndex} className="badge bg-primary me-1">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="card-footer">
                    <button className="card_delete">
                      <i className="bi bi-trash-fill"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p
              style={{
                fontSize: "30px",
                padding: "40px 30px",
                textAlign: "center",
              }}
            >
              No blogs available
            </p>
          )}
        </div>
      </div>
      {popup && (
        <Blog handleBlogForm={handleBlogForm} setBlogData={setBlogData} />
      )}
    </>
  );
};

export default BlogList;
