import React from "react";
import "./sideBar.css";
import {NavLink} from 'react-router-dom';

const SideBar: React.FC = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <NavLink to="/dashboard-home" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
          >
            <i className="bi bi-building-fill"></i>
            <span>School Management</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="components-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
          <li>
                <NavLink to="/addCity">
                    <i className="bi bi-circle"></i>
                    <span>Add City</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/addSchool">
                    <i className="bi bi-circle"></i>
                    <span>Add School</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/addClass">
                    <i className="bi bi-circle"></i>
                    <span>Add Class</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/addSubject">
                    <i className="bi bi-circle"></i>
                    <span>Add Subject</span>
                </NavLink>
            </li>
           
          </ul>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
          >
          <i className="bi bi-person-workspace"></i>
            <span>Teacher Management</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="components-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
            <li>
                <NavLink to="/addTeacher">
                    <i className="bi bi-circle"></i>
                    <span>Add Teacher</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/assignSubject">
                    <i className="bi bi-circle"></i>
                    <span>Assign Subject</span>
                </NavLink>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
          >
         <i className="bi bi-shop-window"></i>
            <span>Shop</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="components-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
            <li>
                <NavLink to="/categories">
                    <i className="bi bi-circle"></i>
                    <span>Categories</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/subCategories">
                    <i className="bi bi-circle"></i>
                    <span>Sub Categories</span>
                </NavLink>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
          >
        <i className="bi bi-person-fill"></i>
            <span>Vendor</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="components-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
            <li>
                <NavLink to="/addProduct">
                    <i className="bi bi-circle"></i>
                    <span>Add Product</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/subCategories">
                    <i className="bi bi-circle"></i>
                    <span>Sub Categories</span>
                </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
