import axios from 'axios';

import BASE_URL from './baseUrl';


export const generateReferrelCode = async () => {
    try {
      const tokenID = localStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/referrals/generate-code`, {
        headers: {
          token: tokenID,
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  };

export const fetchReferrelCode = async () => {
  try {
    const tokenID = localStorage.getItem('token');
    const res = await axios.get(`${BASE_URL}/referrals/referral-code`, {
      headers: {
        token: tokenID,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchCodeReferrels = async (referrelId) => {
    try {
      const tokenID = localStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/referrals/${referrelId}`, {
        headers: {
          token: tokenID,
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  };

