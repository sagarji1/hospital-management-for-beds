const request = require('request');

class OTP {
  constructor(baseURL, customerId, email, password) {
    this.baseURL = baseURL;
    this.customerId = customerId;
    this.email = email;
    this.password = password;
    this.verificationId = null;
  }

  async generateAuthToken() {
    const base64String = Buffer.from(this.password).toString('base64');

    const url = `${this.baseURL}/auth/v1/authentication/token?country=IN&customerId=${this.customerId}&email=${this.email}&key=${base64String}&scope=NEW`;

    const options = {
      url: url,
      headers: {
        accept: '*/*',
      },
    };

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          console.error('Error generating auth token:', error);
          reject(error);
          return;
        }

        console.log('Auth Token:', body);
        const authToken = JSON.parse(body).token;
        resolve(authToken); // Return the authToken value
      });
    });
  }

  async sendOtp(authToken, countryCode, mobileNumber) {
    const url = `${this.baseURL}/verification/v2/verification/send?countryCode=${countryCode}&customerId=${this.customerId}&flowType=SMS&mobileNumber=${mobileNumber}`;

    const options = {
      url: url,
      method: 'POST',
      json: true,
      headers: {
        accept: '*/*',
        authToken: authToken, // Set the authToken header
      },
    };

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          console.error('Error sending OTP:', error);
          reject(error);
          return;
        }

        console.log('Request:', options);
        console.log('Body:', body);
        this.verificationId = body.data.verificationId;
        resolve(body);
      });
    });
  }

  async validateOtp(authToken, otpCode, countryCode, mobileNumber) {
    const url = `${this.baseURL}/verification/v2/verification/validateOtp?countryCode=${countryCode}&mobileNumber=${mobileNumber}&verificationId=${this.verificationId}&customerId=${this.customerId}&code=${otpCode}`;

    const options = {
      url: url,
      method: 'GET',
      json: true,
      headers: {
        accept: '*/*',
        authToken: authToken, // Set the authToken header
      },
    };

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          console.error('Error validating OTP:', error);
          reject(error);
          return;
        }

        console.log('Request:', options);
        console.log('Body:', body);

        resolve(body);
      });
    });
  }
}

module.exports = OTP;