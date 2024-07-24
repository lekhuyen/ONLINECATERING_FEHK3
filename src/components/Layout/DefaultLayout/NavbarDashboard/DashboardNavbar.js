import React from "react";
import { Link } from "react-router-dom";
import { privateRoutes } from "../../../../routes";

const DashboardNavbar = () => {
  return (
    <nav className="dashboard-navbar">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {privateRoutes.map((route, index) => (
          <li key={index}>
            <Link to={route.path}>{getRouteName(route.path)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Function to get the display name from route path
const getRouteName = (path) => {
  switch (path) {
    case "/accounts":
      return "Accounts Management";
    case "/aboutus":
      return "About Us Management";
    case "/contactus":
      return "Contact";
    case "/news-admin":
      return "News Management";
    default:
      return path.slice(1); // Remove leading '/'
  }
};

export default DashboardNavbar;
