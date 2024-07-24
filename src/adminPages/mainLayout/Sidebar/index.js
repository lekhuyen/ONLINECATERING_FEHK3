// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
 // Adjust the path as per your project structure
import { menuItems, navbarRoutes } from "../../../ultil/menu";

const cx = classNames.bind(styles);

const Sidebar = ({ activeSidebar }) => {
  return (
    <div className={cx("container")}>
      <div className={cx("navigation", activeSidebar ? "active" : "")}>
        <ul>
          {/* Render menu items */}
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                <span className={cx("icon")}>{item.icon}</span>
                <span className={cx("title")}>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
