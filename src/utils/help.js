import axios from 'axios';
// import resolve from './resolve';
import BASE_URL from './baseUrl';


export const getTickets = async () => {
  let token = localStorage.getItem('token');
  console.log(token);
  try {
    const res = await axios.get(`${BASE_URL}/tickets`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addTicket = async data => {
  let token = localStorage.getItem('token');

  try {
    const res = await axios.post(`${BASE_URL}/tickets`, data, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateTicket = async (id, data) => {
  let token = localStorage.getItem('token');

  try {
    const res = await axios.patch(`${BASE_URL}/tickets/${id}`, data, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

