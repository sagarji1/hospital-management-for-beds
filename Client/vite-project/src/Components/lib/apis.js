import axios from "axios";

const BACKEND_URL = 'http://localhost:8080';

const instance = axios.create({
    withCredentials: true
});

// Hospital Registration
export async function hospitalRegistration(hospitalData) {
    try {
        const response = await instance.post(`${BACKEND_URL}/hospitals`, hospitalData);
        if (response.status !== 201) {
            throw new Error('Unable to register the hospital at the moment.');
        }
        return response.data;
    } catch (error) {
        console.error('Error registering hospital:', error.message);
        throw error;
    }
}

// Hospital Fetch Profile
export async function fetchHospital() {
    try {
        const response = await instance.get(`${BACKEND_URL}/hospital`);
        if (response.status !== 200) {
            throw new Error('Unable to fetch hospital profile at the moment.');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching hospital profile:', error.message);
        throw error;
    }
}

// Hospital Login
export async function loginHospital(hospital) {
    try {
        const response = await instance.post(`${BACKEND_URL}/login`, hospital);
        if (response.status !== 200) {
            throw new Error('Invalid hospital credentials.');
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in hospital:', error.message);
        throw error;
    }
}

// Hospital Update Details
export async function updateHospitalDetails(hospital) {
    try {
        const response = await instance.put(`${BACKEND_URL}/hospitals/${hospital.name}`, hospital);
        if (response.status !== 200) {
            throw new Error('Failed to update hospital details.');
        }
        return response.data;
    } catch (error) {
        console.error('Error updating hospital details:', error.message);
        throw error;
    }
}

// Fetch Admin Profile
export async function fetchProfile() {
    try {
        const response = await instance.get(`${BACKEND_URL}/admin`);
        if (response.status !== 200) {
            throw new Error('Unable to fetch admin profile at the moment.');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching admin profile:', error.message);
        throw error;
    }
}

// Admin Login
export async function adminLogin(user) {
    try {
        const response = await axios.post(`${BACKEND_URL}/admin/login`, user, {
            withCredentials: true
        });
        if (response.status !== 200) {
            throw new Error('Login failed');
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in admin:', error.message);
        throw error;
    }
}

// Admin Logout
export async function logoutAdmin() {
    try {
        const response = await instance.post(`${BACKEND_URL}/admin/logout`);
        if (response.status !== 200) {
            throw new Error('Unable to log out at the moment.');
        }
        return response.data;
    } catch (error) {
        console.error('Error logging out admin:', error.message);
        throw error;
    }
}

// Create Hospital by Admin
export async function createHospitalByAdmin(hospital) {
    try {
        const response = await instance.post(`${BACKEND_URL}/admin/hospital`, hospital);
        if (response.status !== 201) {
            throw new Error('Failed to create hospital.');
        }
        return response.data;
    } catch (error) {
        console.error('Error creating hospital by admin:', error.message);
        throw error;
    }
}

// Doctor Login
export async function loginDoctor(doctor) {
    const response = await instance.post(`${BACKEND_URL}/doctor/login`, doctor);
    if (response.status !== 200) {
        throw new Error('Either Mobile or OTP Wrong');
    }
    return response.data;
}

// Patient Login and Register by Mobile OTP
export async function patientLoginAndRegister(patient) {
    try {
        const response = await instance.post(`${BACKEND_URL}/patient/login`, patient);
        if (response.status !== 200) {
            throw new Error('Invalid mobile number or OTP.');
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in or registering patient:', error.message);
        throw error;
    }
}

// Send OTP to a Mobile Number
export async function sendOtp(countryCode, mobileNumber) {
    try {
        const response = await instance.post(`${BACKEND_URL}/sendotp/${countryCode}/${mobileNumber}`);
        if (response.status !== 200) {
            throw new Error('Failed to send OTP.');
        }
        return response.data;
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        throw error;
    }
}

// Validate OTP
export async function validateOtp(countryCode, mobileNumber, otpCode) {
    try {
        const response = await instance.post(`${BACKEND_URL}/validateOtp/${countryCode}/${mobileNumber}/${otpCode}`);
        if (response.status !== 200) {
            throw new Error('Invalid OTP.');
        }
        return response.data;
    } catch (error) {
        console.error('Error validating OTP:', error.message);
        throw error;
    }
}
