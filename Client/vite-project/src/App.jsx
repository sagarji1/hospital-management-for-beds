import React from "react";
import Layout from "./Components/Layout/Layout";
import Home from "./Home/Home";
import { Routes, Route } from "react-router-dom";
import Dashboard from "@mui/icons-material/Dashboard";
import Login from "./Components/Pages/Login/Login";
import HospitalRegistration from "./Components/Pages/HospitalRegistration/HospitalRegistration";
import PatientLogin from "./Components/Pages/Patient/PatientLogin"

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />

          <Route path="/dasboard" element={<Dashboard />} />
          <Route path="/patientLogin" element={<PatientLogin />} />
          <Route path="/hospital-registration" element={<HospitalRegistration />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
