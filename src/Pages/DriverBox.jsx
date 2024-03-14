import React from "react";
import "./driverbox.css";

import truck from "../assets/truck.png";

const DriverBox = ({ driver }) => {
  return (
    <div className="driverBox">
      <div className="driverBox-left">
        <h1>{driver.firstName} {driver.lastName}</h1>
        <p>{driver.email}</p>
        <br />
        {driver.isVerified ? (
          <div className="approved">
            <p>Approved</p>
          </div>
        ) : driver.isVerified === false ? (
          <div className="progress">
            <p>Rejected</p>
          </div>
        ) : <div>
          <div className="progress">
            <p>Waiting </p>
          </div>
        </div>}
      </div>
      <div className="driverBox-right">
        <img src={truck} alt="" />
      </div>
    </div>
  );
};

export default DriverBox;
