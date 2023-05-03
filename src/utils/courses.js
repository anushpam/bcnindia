import axios from 'axios';
import BASE_URL from './baseUrl';

export const getCourses = async () => {
  //   console.log(token);
  let token = localStorage.getItem('token');

  try {
    const res = await axios.get(`${BASE_URL}/courses`, {
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

export const getSubjects = async () => {
  //   console.log(token);
  let token = localStorage.getItem('token');

  try {
    const res = await axios.get(`${BASE_URL}/subjects`, {
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

export const editCourse = async (id, name) => {
  //   console.log(token);
  let token = localStorage.getItem('token');

  try {
    const res = await axios.patch(
      `${BASE_URL}/courses/${id}`,
      {
        name,
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

export const editSubject = async (
  id,
  name,
  disabled = null,
  courseId = null
) => {
  //   console.log(token);
  let token = localStorage.getItem('token');

  try {
    const res = await axios.patch(
      `${BASE_URL}/subjects/${id}`,
      {
        name,
        disabled,
        courseId,
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

export const deleteCourse = async id => {
  //   console.log(token);
  let token = localStorage.getItem('token');

  try {
    const res = await axios.delete(`${BASE_URL}/courses/${id}`, {
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

export const deleteSubject = async id => {
  //   console.log(token);
  let token = localStorage.getItem('token');

  try {
    const res = await axios.delete(`${BASE_URL}/subjects/${id}`, {
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

export const disableSubject = async id => {
  //   console.log(token);
  let token = localStorage.getItem('token');

  try {
    const res = await axios.patch(
      `${BASE_URL}/subjects/${id}`,
      {
        disabled: true,
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

export const enableSubject = async id => {
  //   console.log(token);
  let token = localStorage.getItem('token');

  try {
    const res = await axios.patch(
      `${BASE_URL}/subjects/${id}`,
      {
        disabled: false,
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
