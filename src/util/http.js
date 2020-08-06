import axios from 'axios';

const http = axios.create({
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

http.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (body.status === 'success') {
      return body;
    }
    return null;
  },
  (error) => Promise.reject(error),
);

export default http;
