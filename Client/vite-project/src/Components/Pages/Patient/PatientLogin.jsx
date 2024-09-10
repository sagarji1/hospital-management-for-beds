import React, { useState } from 'react';
import './PatientLogin.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import API functions for sending and validating OTP
import { sendOtp, validateOtp } from '../../../Components/lib/apis'; // Adjust the import path as needed

function PatientLogin() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleMobileNumberSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Extract country code and mobile number from input
      const countryCode = '91'; // Assuming '91' for India, change as per your requirement
      const mobile = mobileNumber;

      // Call API to send OTP to the mobile number
      await sendOtp(countryCode, mobile);

      setShowOtpInput(true); // Show OTP input field
      toast.info('OTP sent to your mobile number!');
    } catch (error) {
      toast.error('Error sending OTP. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Extract country code and mobile number from input
      const countryCode = '91'; // Assuming '91' for India, change as per your requirement
      const mobile = mobileNumber;

      // Call API to verify OTP
      await validateOtp(countryCode, mobile, otp);

      toast.success('OTP verified successfully!');
    } catch (error) {
      toast.error('Error verifying OTP. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="ors-login-container">
      <ToastContainer />
      <div className="ors-login-box">
        <div className="logo-part">
          <div className="logo">
            <img
              id='emblem'
              src="https://delhi.gov.in/sites/default/files/emblem-dark.png"
              alt="National_Emblem"
            />
            {/* <h1>eHospital</h1> */}
          </div>
          <div className="logo-text">
            <h2>Government of National Capital Territory of Delhi</h2>
            <h3>राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार</h3>
          </div>
        </div>
        <form onSubmit={showOtpInput ? handleOtpSubmit : handleMobileNumberSubmit}>
          <div className="ors-input-group">
            <label>Mobile Number *</label>
            <input
              type="text"
              name="mobile"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter Mobile Number"
              required
              disabled={showOtpInput || loading}
            />
          </div>
          {showOtpInput && (
            <div className="ors-input-group">
              <label>OTP *</label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                disabled={loading}
              />
            </div>
          )}
          {showOtpInput ? (
            <button
              type="submit"
              className="ors-login-button"
              disabled={loading}
            >
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
            </button>
          ) : (
            <button
              type="submit"
              className="ors-login-button"
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Get OTP'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default PatientLogin;
