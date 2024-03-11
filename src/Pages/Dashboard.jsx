import React from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";

import Nav from "./Nav";

const Dashboard = () => {
  return (
    <div>
      <Sidebar option1 />
      <Nav />

      <div className="page">
        <h1>Dashboard</h1>
        <p>Comming Soon</p>
      </div>
    </div>
  );
};

export default Dashboard;
