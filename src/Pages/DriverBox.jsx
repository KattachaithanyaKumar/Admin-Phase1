import React from "react";
import "./driverbox.css";

import truck from "../assets/truck.png";

const DriverBox = ({ driver }) => {
  return (
    <div className="driverBox">
      <div className="driverBox-left">
        <h1>{driver.firstName + driver.lastName}</h1>
        <p>{driver.email}</p>
        {driver.isVerified ? (
          <div className="approved">
            <p>Approved</p>
          </div>
        ) : (
          <div className="progress">
            <p>Progress</p>
          </div>
        )}
      </div>
      <div className="driverBox-right">
        <img src={truck} alt="" />
      </div>
    </div>
  );
};

export default DriverBox;
