// refreshService.js
import axios from 'axios';

const refreshAxios = axios.create({
  baseURL: 'https://localhost:8443',
  withCredentials: true,
});

export async function refreshToken() {
  try {
    console.log("[RefreshService] Calling /api/auth/refresh");
    const response = await refreshAxios.post('/api/auth/refresh');
    return response.data;
  } catch (error) {
    console.log("[RefreshService] Refresh failed:", error?.response?.status);
    throw error; // Let authContext handle redirect
  }
}
