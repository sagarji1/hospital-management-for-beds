 /*const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Use 'jsonwebtoken' instead of 'Token'
const { BadRequestError, AuthenticationError } = require('../core/ApiError');
const catchAsync = require('../core/catchAsync');
const Hospital = require('../models/hospitalpasswordModel');
const { isLoggedIn } = require('../middleware/authMiddleware');

// Secret key
const jwtSecretKey = "ifOO3gIusVyChhors3r3dAAlmCZR2xqc";

// Create Admin
router.get('/admin', catchAsync(async (req, res) => {
    const plainPassword = '12345';
    const hash = await bcrypt.hash(plainPassword, 12);
    const admin = await Admin.create({ adminname: 'admin', password: hash, email: 'admin@gmail.com' });
    res.status(200).json(admin);
}));

// Admin Login
// In adminRoutes.js

router.post('/login', catchAsync(async (req, res) => {
    const { adminname, password } = req.body;
    
    const admin = await Admin.findOne({ adminname });
    
    if (!admin) {
        throw new AuthenticationError("Admin with this adminname doesn't exist");
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
        throw new AuthenticationError('Invalid adminname or password');
    }

    const token = jwt.sign({ adminId: admin._id }, jwtSecretKey, { expiresIn: '7d' });

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        withCredentials: true
    });

    res.status(200).json({ message: "Logged In Successfully." });
}));

// Admin Logout
router.post('/logout', catchAsync(isLoggedIn), (req, res) => {
    res.cookie('token', "", { httpOnly: true, withCredentials: true }); // Ensure the cookie is cleared
    res.status(200).json({ message: "Logged out successfully" });
});

// Create Hospital
router.post('/admin/hospital', catchAsync(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please Provide Correct Details');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const hospital = await Hospital.create({ email, password: hashedPassword });
    res.status(201).json(hospital);
}));

module.exports = router;
*/
const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middleware/authMiddle");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
