import axios from 'axios';
import BASE_URL from './baseUrl';

export const createJob = async job => {
  let token = localStorage.getItem('token');
  try {
    const res = await axios.post(`${BASE_URL}/jobs/`, job, {
      headers: {
        token: token
      },
      validateStatus:()=>true
    });
    if (res.data.status !== 'success') throw res.data;
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getJobs = async () => {
  let token = localStorage.getItem('token');
  try {
    const res = await axios.get(`${BASE_URL}/jobs/`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateJob = async id => {
  let token = localStorage.getItem('token');
  try {
    const res = await axios.patch(`${BASE_URL}/jobs/${id}`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteJob = async id => {
  let token = localStorage.getItem('token');
  try {
    const res = await axios.delete(`${BASE_URL}/jobs/${id}`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
