import axios from 'axios';
import { Platform } from 'react-native';
import Cookie from 'js-cookie';
// import {EXPO_PUBLIC_URL} from '@env';

const API_BASE_URL= "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  let xsrfToken;

  if (Platform.OS === 'web') {

    xsrfToken = Cookie.get('XSRF-TOKEN');
  } else {

    try {
      const cookies = await Cookies.get(API_BASE_URL);
      xsrfToken = cookies['XSRF-TOKEN']?.value;
    } catch (error) {
      console.warn('Failed to get cookies on native:', error);
    }
  }

  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = xsrfToken;
  }

  return config;
});

export default api;
