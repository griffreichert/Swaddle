import axios from 'axios';

import { apiRequestInterceptor, apiResponseInterceptor } from './apiInterceptor';

const api = axios.create({
  baseURL: 'http://64.121.16.105:5000',
});

// api.interceptors.request.use(apiRequestInterceptor);
api.interceptors.response.use(response => response, apiResponseInterceptor);

export default api;

/* api usage example

api.get('/path', {
  headers: {
    'token': this.props.session_token
  }
})
.catch(err => console.log(err.status))

api.put('/path', {body}, {
  headers: {
    'token': this.props.session_token
  }
})
.catch(err => console.log(err.status))

*/