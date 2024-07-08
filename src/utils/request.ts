import axios from 'axios';

const service = axios.create({
  timeout: 1000 * 5,
});
// Add a request interceptor
service.interceptors.request.use((config) => {
  // Do something before request is sent
  Object.assign(config.headers, { Authorization: `Bearer ${localStorage.getItem('token')}` });
  return config;
}, (error) => (Promise.reject(error)));

export default service;