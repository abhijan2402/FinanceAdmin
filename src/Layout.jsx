// Layout.js
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Style/Layout.css"; // Custom styles

const Layout = () => {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <aside className="col-12 col-md-3 col-lg-2 sidebar">
          <nav className="navbar navbar-expand-md navbar-light flex-md-column">
            <Link className="navbar-brand mb-3" to="/">
              <i className="bi bi-speedometer2"></i> Admin Panel
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarNav"
              aria-controls="sidebarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="sidebarNav">
              <ul className="navbar-nav flex-column w-100">
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    <i className="bi bi-house-door"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/blog" className="nav-link">
                    <i className="bi bi-pencil-square"></i> Blog
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <main className="col-12 col-md-9 col-lg-10 p-4 content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
