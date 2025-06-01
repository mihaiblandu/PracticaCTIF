import axios from 'axios';
import { Platform } from 'react-native';
import Cookie from 'js-cookie';
import { navigateToLogin } from '@/app/Navigation/navigationService';
import {router} from 'expo-router';
// Dynamically require cookies only on native
let Cookies;
if (Platform.OS !== 'web') {
  Cookies = require('@react-native-cookies/cookies').default;
}

// Backend base URL
const API_BASE_URL = 'https://localhost:8443';

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Get CSRF token
let cachedCsrfToken = null;

const getCsrfToken = async () => {
  if (cachedCsrfToken) return cachedCsrfToken;

  if (Platform.OS === 'web') {
    cachedCsrfToken = Cookie.get('XSRF-TOKEN');
    return cachedCsrfToken;
  } else {
    try {
      const cookies = await Cookies.get('https://localhost:8443');
      const jwt = cookies['jwt']?.value;

      // If no JWT yet (like on login), skip fetching CSRF token
      if (!jwt) {
        return null; // or '' depending on how you handle headers
      }

      const response = await axios.get(`${API_BASE_URL}/api/csrf-token`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
      });

      cachedCsrfToken = response.data.csrfToken; // <-- important: your API sends { csrfToken: '...' }
      return cachedCsrfToken;
    } catch (err) {
      console.warn('CSRF fetch error:', err);
      return null;
    }
  }
};

// Add a helper to clear cached tokens on logout or login
const clearCachedTokens = () => {
  cachedCsrfToken = null;
};


// When you do login somewhere in your app, after success:
// clearCachedTokens();
// cache new CSRF token from response.body.csrfToken


// CSRF header injection
api.interceptors.request.use(async (config) => {
  if (config.url === '/api/auth/login') {
    return config;
  }

  const xsrfToken = await getCsrfToken();
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = xsrfToken;
  }
  return config;
});


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post('/api/auth/refresh');
        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        console.warn('[Axios] Refresh request failed:', err?.response?.status, err?.message);

        if (err?.response?.status === 401) {
          console.warn('[Axios] Refresh token failed. Redirecting to login.');
          router.replace('/login');
        }

        return Promise.reject(err);
      }
     finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
