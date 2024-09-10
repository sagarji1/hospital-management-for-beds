const mongoose = require('mongoose');
const { Schema } = mongoose;

const hospital = new Schema({
  
  hospitalname: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  hospitalType: {
    type: String,
    trim: true,
    required: true
  },
  government: {
    type: String,
    trim: true,
    required: true
  },
  hospitalAddress: {
    type: String,
    trim: true,
    required: true
  },
  hospitalState: {
    type: String,
    trim: true,
    required: true
  },
  hospitalDistrict: {
    type: String,
    trim: true,
    required: true
  },
  hospitalWebsite: {
    type: String,
    trim: true
  },
  hospitalAvgOPD: {
    type: Number
  },
  hospitalDoctors: {
    type: Number
  },
  nodalOfficerName: {
    type: String,
    trim: true,
    required: true
  },
  nodalDesignation: {
    type: String,
    trim: true,
    required: true
  },
  nodalMobileNumber: {
    type: Number,
    required: true
  },
  nodalLandLineNumber: {
    type: Number
  },
  nodalEmail: {
    type: String,
    trim: true,
    required: true
  },
  nameofHospitalAdd: {
    type: String,
    trim: true
  },
  freeBeds:{
    type:Number,

  }
}, { timestamps: true, versionKey: false });

const Hospital = mongoose.model('Hospital', hospital);

module.exports = Hospital;