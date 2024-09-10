import React from "react";
import Banner from "../Components/Banner/Banner";
import LoginCard from "../Components/LoginCards/LoginCard";
import Opd from "../Components/OPD/Opd";
import Patient from "../Components/Patient/PatientLogin"
import Vendor from "../Components/Vendor/VendorLogin"
import './Home.css'
import Eopd from "../Components/Eopd/Eopd"
import Payment from "../Components/Payment/Payment"
import LabReport from "../Components/LabReport/LabReport"
import Blood from "../Components/Blood/Blood"
import Info from "../Components/Info/Info";
import Hospital from "../Components/HospitalLogin/Hospital"
import Footer from "../Components/Footer/Footer"

function Home() {
  return (
    <>
      <Banner />
      <div className="line">
        <div className="space"><LoginCard /></div>
        <div className="space"><Patient/></div>
        <div className="space"><Vendor/></div>
      </div>
       <h2 className="head2"> Our Facilities</h2>
       <div className="line">
        <div className="space"><Eopd/></div>
        <div className="space"><Payment/></div>
        <div className="space"><LabReport/></div>
        <div className="space"><Blood/></div>
       </div>
       <Info/>
       <Hospital/>
       
       <Footer/>
    </>
  );
}

export default Home;
