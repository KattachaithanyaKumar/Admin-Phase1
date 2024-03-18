import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import "./drivers.css";

import Truck from "../assets/truck.png";
import { createClient } from "@supabase/supabase-js";

import DriverBox from "./DriverBox";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://tnfeykqptcbbabeuwwxn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZmV5a3FwdGNiYmFiZXV3d3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4MDYxMTYsImV4cCI6MjAyMzM4MjExNn0.Y5FPy2jo_vo1ZjRFn9LkAyPMyItAKid_VSqkEkuHeqU"
);

const Drivers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drivers, setDrivers] = useState([]);

  const navigate = useNavigate();

  async function fetchDrivers() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("DriverDetails").select("*");
      if (data !== null) {
        setDrivers(data);
        console.log(data);
      }
      if (error) {
        console.error("Error fetching drivers", error);
      } else {
        setDrivers(data);
      }
    } catch (error) {
      console.error("Error fetching drivers", error);
    } finally {
      setLoading(false);
    }
  }

  const init = useEffect(() => {
    fetchDrivers();
  }, []);
  async function downloadTableAsCSV() {
    const { data, error } = await supabase.from('DriverDetails').select('*');

    if (error) {
      console.error('Failed to fetch data:', error.message);
      return;
    }

    // Extract column names
    const columns = Object.keys(data[0]);

    // Convert data to CSV format
    let csvContent = "data:text/csv;charset=utf-8," + columns.join(",") + "\n";
    csvContent += data.map(row => columns.map(col => row[col]).join(",")).join("\n");

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'DriverDetails.csv');
    document.body.appendChild(link);

    // Trigger the download
    link.click();
  }



  return (
    <div>
      <Sidebar option3 />
      <Nav />
      <div className="page">

        <div className="driverRow">
          <div>
            <h1>Drivers</h1>
            <p>driver applications</p>
          </div>
          <button className="csvButton" onClick={async () => {
            await downloadTableAsCSV()
          }}>Export To CSV File</button>
        </div>

        <div>
          {loading ? (
            <div>loading...</div>
          ) : (
            <div className="applications">
              {drivers?.map((driver) => (
                <a
                  key={driver.id}
                  onClick={() => {
                    navigate("/application/" + driver.driverId);
                  }}
                >
                  <DriverBox driver={driver} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drivers;
