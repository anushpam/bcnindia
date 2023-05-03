import axios from 'axios';
import BASE_URL from './baseUrl';

let token = localStorage.getItem('token');

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    console.log(res.data);
    token = res.data.token;
    localStorage.setItem('token', token);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

console.log(`${BASE_URL}/auth/verify`)
export const validate = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/verify`, {
      headers: {
        token: token,
      }
    });
    console.log(res.data);
    // token = res.data.token;
    localStorage.setItem('token', token);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// "name":"Abdullah",
// "email":"referral@gmail.com",
// "password":"123456",
// "businessName":"Computer Repair Shop",
// "type":"service",
// "address":"Noida Section 60",
// "pincode":"234234",
// "code":"tb3MeUmb"

export const registerUser = async (name, email, password, businessName, type, pincode, address, code,contact ) => {
  try {
    const res = await axios.post(`${BASE_URL}/businesses/create-business-account`, {
      name,
      email,
      password,
      businessName, 
      type, 
      pincode, 
      address,
      code,
      contact
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};


export const getPrefilledData = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/users/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};