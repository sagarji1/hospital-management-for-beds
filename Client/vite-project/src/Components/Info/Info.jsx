import React from "react";
import Appoinment from "../Cards/AppoinmentCard";
import Hospitalinfo from "../Cards/HospitalONBoarding"
import Dasboard from "../Cards/Dasboard"
import "./Info.css";
function Info() {
  return (
    <>
    <div className="container">
      <h1>Features of Online Registration System</h1>
      <hr />
      <p>
        Online Registration System (ORS) is a framework to link various
        hospitals across the country for online appointment system for getting
        consultation where counter based OPD registration and appointment system
        through Hospital Management Information System (HMIS) has been
        digitalized. The application has been hosted on the cloud services of
        NIC. Portal facilitates online appointments with various departments of
        different Hospitals using ABHA(Ayushman Bharat Health Account).
      </p>
      <div className="row">
        <div className="col-md-4">
          <Appoinment />
        </div>
        <div className="col-md-4">
          <Hospitalinfo />
        </div>
        <div className="col-md-4">
          <Dasboard/>
        </div>
      </div>
      </div>
    </>
  );
}

export default Info;
