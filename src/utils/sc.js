import axios from 'axios';
import BASE_URL from './baseUrl';

export const addCategory = async data => {
  //   console.log(token);
  let token = localStorage.getItem('token');

  try {
    const res = await axios.post(`${BASE_URL}/categories`, data, {
      headers: {
        token: token,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const toggleCategory = async (id, val) => {
  //   console.log(token);
  let token = localStorage.getItem('token');

  try {
    const res = await axios.patch(
      `${BASE_URL}/categories/${id}`,
      {
        disabled: val,
      },
      {
        headers: {
          token: token,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const addSize = async data => {
  let token = localStorage.getItem('token');

  try {
    const res = await axios.post(`${BASE_URL}/sizes`, data, {
      headers: {
        token: token,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const toggleSize = async (id, val) => {
  //   console.log(token);
  let token = localStorage.getItem('token');

  try {
    const res = await axios.patch(
      `${BASE_URL}/sizes/${id}`,
      {
        disabled: val,
      },
      {
        headers: {
          token: token,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
