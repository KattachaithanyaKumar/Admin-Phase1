import React from "react";
import Sidebar from "./Sidebar";
import Nav from "./Nav";

const Package = () => {
  return (
    <div>
      <Sidebar option2 />
      <Nav />

      <div className="page">
        <h1>Packages</h1>
        <p>Coming Soon</p>
      </div>
    </div>
  );
};

export default Package;
