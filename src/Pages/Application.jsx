import React, { useEffect, useState } from "react";
import "./application.css";
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

const supabase = createClient(
  "https://tnfeykqptcbbabeuwwxn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZmV5a3FwdGNiYmFiZXV3d3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4MDYxMTYsImV4cCI6MjAyMzM4MjExNn0.Y5FPy2jo_vo1ZjRFn9LkAyPMyItAKid_VSqkEkuHeqU"
);

const Application = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [showRejectOptions, setShowRejectOptions] = useState(false);
  var rejectReason = ["Driver is not available", "Driver is not verified", "Driver is not approved", "Driver is not good"];

  const getData = async () => {
    try {
      const { data, error } = await supabase
        .from("DriverDetails")
        .select("*")
        .eq("driverId", id)
        .single();

      if (data) {
        setData(data);
        console.log(data);
      }

      if (error) {
        console.error(error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      console.log(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Nav />
      <div className="application">
        <div className="split">
          <h1>{data?.firstName + " " + data?.lastName}</h1>
          <p>ABN Number: {data?.aBNNo}</p>
        </div>
        Driver Id: {data?.driverId}

        <div className="userData">
          <div className="left">
            <input type="text" value={data?.email} disabled />
            <input type="text" value={data?.mobileNo} disabled />
            <input type="text" value={data?.subUrb} disabled />
            <input type="text" value={data?.city} disabled />
          </div>
          <div className="right">
            <input type="text" value={data?.vehicleType} disabled />
            <input type="text" value={data?.vehicleMake} disabled />
            <input type="text" value={data?.vehicleModel} disabled />
            <input type="text" value={data?.vehicleYear} disabled />
          </div>
        </div>

        <div className="application-list">
          <h1>Application</h1>

          <>
            <h3>
              Can You Lift and Groove? (Yes or No – we need to know if you can
              dance with that fridge)
            </h3>
            <input type="text" value={data?.canYouLiftAndGroove} disabled />
          </>

          <>
            <h3>
              Pitch Your flexer Tale: Why are you the next PicUp sensation?
            </h3>
            <textarea
              name="pitch"
              id=""
              value={data?.flexerTale}
              disabled
            ></textarea>
          </>

          <>
            <h3>Availability (Days, Hours, When the stars align, etc.)</h3>
            <input type="text" value={data?.availability} disabled />
          </>
          <>
            <h3>
              Flexer Style: Are you a solo superstar or do you prefer a duo act?
              Or are you the Beyoncé of flexing and can do both?
            </h3>
            <input type="text" value={data?.flexerStyle} disabled />
          </>
          <>
            <h3>
              Insurance Mastery: You know the drill – public liability, CTP car
              insurance. We need to see your superhero cape (insurance papers)
              before you officially join the flexer dance floor.
            </h3>
            <input type="text" value={data?.lastDanceMove} disabled />
          </>
        </div>

        <div className="options">
          <button className="approve" onClick={async () => {
            if (data.isVerified === true) {
              return alert('Driver already verified');
            }
            const response = await supabase.from('DriverDetails').update(
              {
                isVerified: true,
                rejectionReason: null,
              }
            ).eq('driverId', id);
            console.log(response);
            if (response.status === 204) {
              alert('Driver Verified');
            } else {
              alert('Error Verifying Driver');
            }
            setLoading(true);
            getData();
          }}>Approve</button>
          <Dropdown>
            <Dropdown.Toggle style={{
              width: "100%",
              padding: "14px 30px",
              borderRadius: " 12px",
              border: "none",
              outline: "none",
              cursor: "pointer",
              backgroundColor: "#fc7272",
              color: "black",
            }} id="dropdown-basic" >
              Reject
            </Dropdown.Toggle>
            <Dropdown.Menu style={{
              width: "100%",
              padding: "14px 30px",
              borderRadius: "12px",
              cursor: "pointer",
              color: "black",
            }}>
              {
                rejectReason.map((reason, index) => {
                  return <Dropdown.Item onClick={async (e) => {
                    if (data.isVerified === false) {
                      return alert('Driver already rejected');
                    }
                    const response = await supabase.from('DriverDetails').update(
                      {
                        isVerified: false,
                        rejectionReason: reason,
                      }
                    ).eq('driverId', id);
                    console.log(response);
                    if (response.status === 204) {
                      alert('Driver Rejected');
                    } else {
                      alert('Error Rejecting Driver');
                    }
                    setLoading(true);
                    getData();
                  }} key={index} >{reason}</Dropdown.Item>
                })
              }
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Application;
