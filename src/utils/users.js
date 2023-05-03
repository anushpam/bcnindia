import axios from 'axios';
// import resolve from './resolve';
import BASE_URL from './baseUrl';


export const getUsers = async () => {
  let token = localStorage.getItem('token');
  console.log(token);
  try {
    const res = await axios.get(`${BASE_URL}/users?role[ne]=admin`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserProfile = async (id) => {
  let token = localStorage.getItem('token');
  console.log(token);
  try {
    const res = await axios.get(`${BASE_URL}/users/${id}`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};


export const getBusinessDetail = async (id) => {
  let token = localStorage.getItem('token');
  console.log(token);
  try {
    const res = await axios.get(`${BASE_URL}/businesses/${id}`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};


export const addUser = async data => {
  let token = localStorage.getItem('token');

  try {
    const res = await axios.post(`${BASE_URL}/users`, data, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteUser = async id => {
  let token = localStorage.getItem('token');

  try {
    const res = await axios.delete(`${BASE_URL}/users/${id}`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUser = async (id, data) => {
  let token = localStorage.getItem('token');

  try {
    const res = await axios.patch(`${BASE_URL}/users/${id}`, data, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateBusiness = async (id, data) => {
  let token = localStorage.getItem('token');

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

export const getFilteredUsers = async (name, role) => {
  let token = localStorage.getItem('token');
  // console.log(token);
  let url = `${BASE_URL}/users?`;
  if (name) url = url + `name[regex]=${name}&`;
  if (role) url = url + `role=${role}`;
  try {
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
