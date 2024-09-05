import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const sendOTP = async () => {
        try {
            const response = await axios.post('/send-otp', {
                phoneNumber,
            });
            setMessage('OTP sent successfully');
        } catch (error) {
            setMessage('Failed to send OTP');
        }
    };

    const verifyOTP = async () => {
        try {
            const response = await axios.post('/verify-otp', {
                phoneNumber,
                otp,
            });
            setMessage('OTP verified successfully');
        } catch (error) {
            setMessage('Invalid OTP');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
            />
            <button onClick={sendOTP}>Send OTP</button>
            <br />
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
            />
            <button onClick={verifyOTP}>Verify OTP</button>
            <p>{message}</p>
        </div>
    );
}

export default App;