import axios from 'axios';

import { apiRequestInterceptor, apiResponseInterceptor } from './apiInterceptor';

const api = axios.create({
  baseURL: 'http://64.121.16.105:5000',
});

api.interceptors.request.use(apiRequestInterceptor);
api.interceptors.response.use(response => response, apiResponseInterceptor);

export default api;