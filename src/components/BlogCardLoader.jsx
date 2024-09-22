import React from "react";
import "../Style/BlogCardLoader.css"; 

const BlogCardLoader = () => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card blog-card-loader shadow-sm">
        <div className="loader-image"></div>
        <div className="card-body">
          <div className="loader-title"></div>
          <div className="loader-description"></div>
          <div className="loader-tags"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardLoader;
