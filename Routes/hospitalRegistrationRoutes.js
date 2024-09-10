const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospitalRegistrationModel');
const catchAsync = require('../core/catchAsync');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { BadRequestError, AuthenticationError, NotFoundError } = require('../core/ApiError');
const { authenticate } = require('../middleware/auth');
const HospitalPassword = require('../models/hospitalpasswordModel');

// secret key
const jwtSecretKey = "ifOO3gIusVyChhors3r3dAAlmCZR2xqc";

// get all hospital
router.get('/hospitals', catchAsync(async (req, res) => {
    const hospitals = await Hospital.find();
    res.json(hospitals);
}));

router.post('/hospitals', catchAsync(async (req, res) => {
    try {
        console.log("Hospital creation request received");

        const {
            hospitalname,
            hospitalType,
            government,
            hospitalAddress,
            hospitalState,
            hospitalDistrict,
            hospitalWebsite,
            hospitalAvgOPD,
            hospitalDoctor,
            nodalOfficerName,
            nodalDesignation,
            nodalMobileNumber,
            nodalLandLineNumber,
            nodalEmail,
            nameofHospitalAdd
        } = req.body;

        // Check if hospital already exists
        const hospitalExist = await Hospital.findOne({ hospitalname });
        if (hospitalExist) {
            throw new BadRequestError("Hospital Already Exists");
        }

        // Create new hospital
        const hospital = await Hospital.create({
            hospitalname,
            hospitalType,
            government,
            hospitalAddress,
            hospitalState,
            hospitalDistrict,
            hospitalWebsite,
            hospitalAvgOPD,
            hospitalDoctor,
            nodalOfficerName,
            nodalDesignation,
            nodalMobileNumber,
            nodalLandLineNumber,
            nodalEmail,
            nameofHospitalAdd,
            freeBeds
        });

        res.status(201).json({ message: "Hospital created successfully", hospital });
    } catch (error) {
        console.error('Error creating hospital:', error.message); // Log the error message
        res.status(500).json({ message: 'An error occurred while creating the hospital.' });
    }
}));
// Login Hospital
router.post('/hospital/login', catchAsync(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const hospital = await HospitalPassword.findOne({ email });
    if (!hospital) {
        throw new AuthenticationError('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(password, hospital.password);
    if (!isValidPassword) {
        throw new AuthenticationError('Invalid email or password');
    }

    const token = jwt.sign({ hospitalName: hospital.hospitalname }, jwtSecretKey, {
        expiresIn: '1h'
    });
    // Set the cookie
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 3600000), // 1 hour
        httpOnly: true,
        secure: true, // Set to true in production
    });

    

    res.status(200).json({message:"Hospital loggin successfully" });
}));

// patch Hospital
const allowedUpdates = ['address', 'nodalMobileNumber', 'nodalLandLineNumber', 'freeBeds', 'hospitalname', 'hospitalType', 'government', 'hospitalAddress', 'hospitalState', 'hospitalDistrict', 'hospitalWebsite', 'hospitalAvgOPD', 'hospitalDoctor', 'nodalOfficerName', 'nodalDesignation', 'nodalEmail', 'nameofHospitalAdd'];

router.patch('/hospital/:name', catchAsync(async (req, res) => {
    const hospitalName = req.params.name;
    const updates = {};

    Object.keys(req.body).forEach((key) => {
        if (allowedUpdates.includes(key)) {
            updates[key] = req.body[key];
        }
    });
    const hospital = await Hospital.findOneAndUpdate({ hospitalname: hospitalName }, updates, { new: true });
        if (!hospital) {
        throw new NotFoundError('Hospital not found');
    }

    res.status(200).json(hospital);
}));

module.exports = router;