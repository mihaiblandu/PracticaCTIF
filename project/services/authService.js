import api from '../app/api/auth/axiosApi';

export async function fetchCsrfToken() {
  await api.get('/api/csrf-token');
}

export async function login(email, password) {
  // await fetchCsrfToken();
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
}

export async function register(userData) {
  return api.post('/api/auth/register', userData);
}

