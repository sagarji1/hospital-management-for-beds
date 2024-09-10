import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HospitalRegistrationForm.css';
import ReCAPTCHA from "react-google-recaptcha";
import { hospitalRegistration } from '../../../Components/lib/apis'; // Update this import path

function HospitalRegistration() {
  const [formData, setFormData] = useState({
    hospitalname: '',
    hospitalType: '',
    government: '', // Changed to match model
    hospitalAddress: '',
    hospitalState: '',
    hospitalDistrict: '',
    hospitalWebsite: '',
    hospitalAvgOPD: '',
    hospitalDoctors: '',
    freeBeds: '', // Added freeBeds field
  });

  const [nodalOfficerFormData, setNodalOfficerFormData] = useState({
    nodalOfficerName: '', // Changed to match model
    nodalDesignation: '', // Changed to match model
    nodalMobileNumber: '', // Changed to match model
    nodalLandLineNumber: '', // Changed to match model
    nodalEmail: '', // Changed to match model
    nameofHospitalAdd: '', // Changed to match model
  });

  const [formValid, setFormValid] = useState(false);
  const [nodalOfficerFormValid, setNodalOfficerFormValid] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [activeTab, setActiveTab] = useState("Hospital Details");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNodalOfficerChange = (e) => {
    const { name, value } = e.target;
    setNodalOfficerFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onChangeRecaptcha = (value) => {
    setRecaptchaValue(value);
  };

  useEffect(() => {
    const isFormValid =
      formData.hospitalname &&
      formData.hospitalType &&
      formData.government &&
      formData.hospitalAddress &&
      formData.hospitalState &&
      formData.hospitalDistrict &&
      formData.hospitalAvgOPD &&
      formData.hospitalDoctors;

    setFormValid(isFormValid);
  }, [formData]);

  useEffect(() => {
    const isNodalOfficerFormValid =
      nodalOfficerFormData.nodalOfficerName &&
      nodalOfficerFormData.nodalDesignation &&
      nodalOfficerFormData.nodalMobileNumber &&
      nodalOfficerFormData.nodalEmail &&
      recaptchaValue;

    setNodalOfficerFormValid(isNodalOfficerFormValid);
  }, [nodalOfficerFormData, recaptchaValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid && nodalOfficerFormValid) {
      try {
        // Combine hospital and nodal officer data
        const combinedData = {
          ...formData,
          ...nodalOfficerFormData,
        };

        await hospitalRegistration(combinedData);
        toast.success('Form submitted successfully!');
      } catch (error) {
        toast.error('Cannot register the hospital at the moment.');
      }
    } else {
      toast.error('Please fill all required fields.');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <button>
          <h2
            className={activeTab === "Hospital Details" ? "form-header gray" : "form-header"}
            onClick={() => handleTabChange("Hospital Details")}
          >
            Hospital Details
          </h2>
        </button>
        <button>
          <h2
            className={activeTab === "Nodal Officer Details" ? "form-header left-form gray" : "form-header left-form"}
            onClick={() => handleTabChange("Nodal Officer Details")}
          >
            Nodal Officer Details
          </h2>
        </button>
        <button className="close-button">&times;</button>
      </div>

      <form className="form-flex" onSubmit={handleSubmit}>
        {activeTab === "Hospital Details" ? (
          <>
            <div className="form-group">
              <label>Hospital Name *</label>
              <input
                type="text"
                name="hospitalname"
                placeholder="Enter Hospital Name"
                value={formData.hospitalname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Hospital Type *</label>
              <select
                name="hospitalType"
                value={formData.hospitalType}
                onChange={handleChange}
                required
              >
                <option value="">Select Hospital Type</option>
                <option value="General">General</option>
                <option value="Specialty">Specialty</option>
                <option value="Super Specialty">Super Specialty</option>
              </select>
            </div>
            <div className="form-group">
              <label>Government *</label>
              <select
                name="government"
                value={formData.government}
                onChange={handleChange}
                required
              >
                <option value="">Select Government Type</option>
                <option value="Central">Central</option>
                <option value="State">State</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div className="form-group">
              <label>Hospital Address *</label>
              <input
                type="text"
                name="hospitalAddress"
                placeholder="Enter Address"
                value={formData.hospitalAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="hospitalState"
                placeholder="Enter State"
                value={formData.hospitalState}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>District *</label>
              <input
                type="text"
                name="hospitalDistrict"
                placeholder="Enter District"
                value={formData.hospitalDistrict}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input
                type="text"
                name="hospitalWebsite"
                placeholder="Enter Website URL"
                value={formData.hospitalWebsite}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Average OPD *</label>
              <input
                type="number"
                name="hospitalAvgOPD"
                placeholder="Enter Average OPD"
                value={formData.hospitalAvgOPD}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Number of Doctors *</label>
              <input
                type="number"
                name="hospitalDoctors"
                placeholder="Enter Number of Doctors"
                value={formData.hospitalDoctors}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Free Beds</label>
              <input
                type="number"
                name="freeBeds"
                placeholder="Enter Number of Free Beds"
                value={formData.freeBeds}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label>Nodal Officer Name *</label>
              <input
                type="text"
                name="nodalOfficerName"
                placeholder="Enter Nodal Officer Name"
                value={nodalOfficerFormData.nodalOfficerName}
                onChange={handleNodalOfficerChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Designation *</label>
              <input
                type="text"
                name="nodalDesignation"
                placeholder="Enter Designation"
                value={nodalOfficerFormData.nodalDesignation}
                onChange={handleNodalOfficerChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Mobile Number *</label>
              <input
                type="text"
                name="nodalMobileNumber"
                placeholder="Enter Mobile Number"
                value={nodalOfficerFormData.nodalMobileNumber}
                onChange={handleNodalOfficerChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Landline Number</label>
              <input
                type="text"
                name="nodalLandLineNumber"
                placeholder="Enter Landline Number"
                value={nodalOfficerFormData.nodalLandLineNumber}
                onChange={handleNodalOfficerChange}
              />
            </div>
            <div className="form-group">
              <label>Email ID *</label>
              <input
                type="email"
                name="nodalEmail"
                placeholder="Enter Email ID"
                value={nodalOfficerFormData.nodalEmail}
                onChange={handleNodalOfficerChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Name of Hospital (As per Address)</label>
              <input
                type="text"
                name="nameofHospitalAdd"
                placeholder="Enter Hospital Name (As per Address)"
                value={nodalOfficerFormData.nameofHospitalAdd}
                onChange={handleNodalOfficerChange}
              />
            </div>
            <ReCAPTCHA
              sitekey="6LcNozwqAAAAAKe59UsArRVgdUWTUTWjhvx_I476"
              onChange={onChangeRecaptcha}
            />
          </>
        )}

        <button type="submit" className="submit-button" disabled={!formValid || !nodalOfficerFormValid}>
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default HospitalRegistration;
