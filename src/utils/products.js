import axios from 'axios';
import BASE_URL from './baseUrl';

export const getProducts = async id => {
  let token = localStorage.getItem('token');
  try {
    const res = await axios.get(`${BASE_URL}/businesses/${id}/items`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateProduct = async (businessId, itemId, data) => {
  let token = localStorage.getItem('token');

  try {
    const res = await axios.patch(`${BASE_URL}/businesses/${businessId}/items/${itemId}`, data, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteProduct = async id => {
  let token = localStorage.getItem('token');

  try {
    const res = await axios.delete(`${BASE_URL}/products/${id}`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const searchProducts = async search => {
  let token = localStorage.getItem('token');

  try {
    const res = await axios.get(`${BASE_URL}/products?search=${search}`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const AddProduct = async (id, product) => {
  let token = localStorage.getItem('token');
  try {
    const res = await axios.post(
      `${BASE_URL}/businesses/${id}/items`,
      product,
      {
        headers: {
          token: token,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getFilteredProducts = async (name, brand) => {
  let token = localStorage.getItem('token');
  // console.log(token);
  let url = `${BASE_URL}/products?`;
  if (name) url = url + `name=${name}&`;
  if (brand) url = url + `supplierName=${brand}`;
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

export const fetchCategories = async query => {
  let token = localStorage.getItem('token');

  try {
    const res = await axios.get(`${BASE_URL}/categories${query}`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchSizes = async () => {
  let token = localStorage.getItem('token');

  try {
    const res = await axios.get(`${BASE_URL}/sizes`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCategories = async () => {
  let token = localStorage.getItem('token');
  try {
    const res = await axios.get(`${BASE_URL}/categories/active-categories`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
