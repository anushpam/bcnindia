import axios from 'axios';

import BASE_URL from './baseUrl';

let token = localStorage.getItem('token');

export const getVendors = async () => {
  try {
    const tokenID = localStorage.getItem('token');
    const res = await axios.get(`${BASE_URL}/businesses`, {
      headers: {
        token: tokenID,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getVendor = async (id) => {
  try {
    const tokenID = localStorage.getItem('token');
    const res = await axios.get(`${BASE_URL}/users/${id}`, {
      headers: {
        token: tokenID,
      },
    });
    console.log(res)
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateVendor = async (id, data) => {
  try {
    const res = await axios.patch(`${BASE_URL}/businesses/${id}`, data, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteVendor = async id => {
  try {
    const res = await axios.delete(`${BASE_URL}/businesses/${id}`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getFilteredVendors = async (name, type, approved) => {
  try {
    let token = localStorage.getItem('token');
    // console.log(token);
    let url = `${BASE_URL}/businesses?`;
    if (name) url = url + `name[regex]=${name}&name[options]=i&`;
    if (type !== 'all') url = url + `type=${type}&`;
    if (approved !== 'all') url += `approved=${approved}&`;
    const res = await axios.get(url, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createVendor = async data => {
  let token = localStorage.getItem('token');
  try {
    const res = await axios.post(`${BASE_URL}/businesses`, data, {
      headers: {
        token: token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const disableVendor = async id => {
  let token = localStorage.getItem('token');
  try {
    const res = await axios.patch(
      `${BASE_URL}/stores/${id}/businesses`,
      {},
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const pendingApprovals = async () => {
  let token = localStorage.getItem('token');
  try {
    const res = await axios.get(`${BASE_URL}/businesses?approved=false`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const approveStore = async id => {
  let token = localStorage.getItem('token');
  try {
    const res = await axios.get(
      `${BASE_URL}/businesses/${id}/approve`,
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};