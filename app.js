const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config(); // Ensure this is loaded first
const jwt = require('jsonwebtoken'); // Ensure jwt is imported

const hospitalRegistrationRoutes = require('./Routes/hospitalRegistrationRoutes');
const adminRoutes = require('./Routes/adminRoutes'); // Adjust the path as needed
const familyDetails = require('./Routes/addFamilyRoutes');

const OTP = require('./models/otp'); // Ensure this model is correctly implemented
const cookieParser = require('cookie-parser');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ensure URL encoded bodies are parsed

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // Use environment variable if needed
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true, // Allow credentials (cookies, etc.)
}));

app.use(cookieParser());

// Checking route
app.get('/echo', (req, res) => {
  res.send('received echo');
});

// Register routes
app.use('/hospital', hospitalRegistrationRoutes);
app.use('/admin', adminRoutes);
app.use('/family', familyDetails);

// OTP Configuration using environment variables
const otp = new OTP(
  process.env.OTP_BASE_URL,
  process.env.OTP_API_KEY,
  process.env.OTP_EMAIL,
  process.env.OTP_PASSWORD
);

// Function to generate JWT token
const generateJWTToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

// Route to send OTP
app.post('/sendotp/:countryCode/:mobileNumber', async (req, res) => {
  const { countryCode, mobileNumber } = req.params;

  try {
    const authToken = await otp.generateAuthToken(); // Ensure authToken is defined
    const response = await otp.sendOtp(authToken, countryCode, mobileNumber);

    if (response.data.responseCode === 200 && !response.data.errorMessage) {
      res.status(200).send('OTP sent successfully!');
    } else {
      res.status(400).send(`Bad Request: ${response.data.errorMessage || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to validate OTP
app.post('/validateOtp/:countryCode/:mobileNumber/:otpCode', async (req, res) => {
  const { countryCode, mobileNumber, otpCode } = req.params;

  try {
    const authToken = await otp.generateAuthToken(); // Ensure authToken is defined
    const response = await otp.validateOtp(authToken, otpCode, countryCode, mobileNumber);

    if (response.data && response.data.verificationStatus === 'VERIFICATION_COMPLETED' && !response.data.errorMessage) {
      const user = { countryCode, mobileNumber };
      const token = generateJWTToken(user);
      res.cookie('jwt', token, {
        expires: new Date(Date.now() + 3600000), // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
      });
      res.status(200).json({ token });
    } else {
      res.status(400).send(`Bad Request: ${response.data ? response.data.errorMessage : 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const { status = 500, message = 'Internal Server Error' } = err;
  res.status(status).json({ errMsg: message });
});

module.exports = app;
