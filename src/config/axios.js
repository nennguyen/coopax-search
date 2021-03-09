/* eslint-disable no-console */
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  const organizationId = localStorage.getItem('organizationId');
  config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  if (!config.url.startsWith('http') && accessToken) {
    config.headers.common.Authorization = `Bearer ${accessToken}`;
    config.headers.common.organizationId = organizationId;
  }
  config.paramsSerializer = params => qs.stringify(params);

  return config;
});

Vue.prototype.$http = axios;
Vue.prototype.$to = function to(promise) {
  return promise
    .then(response => [response, null])
    .catch(error => [null, error]);
};
