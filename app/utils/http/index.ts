import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AxiosConfig from './config';

axios.defaults.baseURL = AxiosConfig.baseURL;
axios.defaults.timeout = AxiosConfig.timeout;

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('/******************** begin ********************/');
    console.log('request', response.request.responseURL);
    console.log('response', response.status, `\ndata:`, response.data);
    console.log('/******************** end ********************/');
    return response;
  },
  (error: any) => {
    console.log(`${'/******************** begin ********************/'}`);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(
        'The request was made and the server responded with a status code that falls out of the range of 2xx'
      );
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(`
       The request was made but no response was received
       error.request is an instance of XMLHttpRequest in the browser and an instance of
       http.ClientRequest in node.js
      `);
      console.log('request', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Something happened in setting up the request that triggered an Error');
      console.log('Error', error.message);
    }
    console.log('config', error.config);
    console.log(`${'/******************** end ********************/'}`);
    // Promise.reject(error);
  }
);

export default axios;
