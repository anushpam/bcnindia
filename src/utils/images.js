import axios from 'axios';
import resolve from './resolve';
import BASE_URL from './baseUrl';


// {{PROD_ORIGIN}}/api/v1/businesses/add-image
export const addProductImage = async (data) => {
  let token = localStorage.getItem('token');
  console.log(data)
  try {
    const res = await axios.post(`${BASE_URL}/businesses/add-image`, data, {
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

export const addStoreImage = async (data) => {
  let token = localStorage.getItem('token');
  console.log(data)
  try {
    const res = await axios.post(`${BASE_URL}/businesses/add-image`, data, {
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

// {{ORIGIN}}/api/v1/businesses/delete-image
export const deleteProductImage = async (id, imgId, name) => {
  let token = localStorage.getItem('token');
  try {
    const res = await axios.patch(
      `${BASE_URL}/businesses/delete-image`,
      {contentName: name,
        contentId: id,
        imageId: imgId
      },
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

export const deleteStoreImage = async (id, imgId, name) => {
  let token = localStorage.getItem('token');
  try {
    const res = await axios.patch(
      `${BASE_URL}/businesses/delete-image`,
      { 
        contentName: name,
        contentId: id,
        imageId: imgId
      },
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
