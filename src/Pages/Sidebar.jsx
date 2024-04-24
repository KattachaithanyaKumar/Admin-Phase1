import React from "react";
import "./sidebar.css";

import { LuHome, LuPersonStanding } from "react-icons/lu";
import { LuPackage } from "react-icons/lu";
import { LuCar } from "react-icons/lu";
import { LuBadgeDollarSign } from "react-icons/lu";

import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const option1 = props.option1 || false;
  const option2 = props.option2 || false;
  const option3 = props.option3 || false;
  const option4 = props.option4 || false;
  const option5 = props.option5 || false;

  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <LuHome
        color={option1 ? "D69F29" : "fff"}
        onClick={() => {
          navigate("/dashboard");
        }}
      />
      <LuPackage
        color={option2 ? "D69F29" : "fff"}
        onClick={() => {
          navigate("/package");
        }}
      />
      <LuCar
        color={option3 ? "D69F29" : "fff"}
        onClick={() => {
          navigate("/drivers");
        }}
      />
      <LuBadgeDollarSign
        color={option4 ? "D69F29" : "fff"}
        onClick={() => {
          navigate("/earnings");
        }}
      />
      <LuPersonStanding
        color={option5 ? "D69F29" : "fff"}
        onClick={() => {
          navigate("/customer-instant-quote");
        }}
      />
    </div>
  );
};

export default Sidebar;
