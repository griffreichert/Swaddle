import axios from 'axios';

// import { apiRequestInterceptor, apiResponseInterceptor } from './apiInterceptor';

const api = axios.create({
  baseURL: 'http://18.217.2.166:3000/',
});

// api.interceptors.request.use(apiRequestInterceptor);
// api.interceptors.response.use(response => response, apiResponseInterceptor);

export default api;