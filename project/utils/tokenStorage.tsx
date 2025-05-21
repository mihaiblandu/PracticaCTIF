import { Platform } from 'react-native';
import Cookies from 'js-cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveToken(token: string) {
  // if (Platform.OS === 'web') {
  //   Cookies.set('token', token, {
  //     path: '/',
  //     secure: true,
  //     sameSite: 'Lax',
  //     expires: 7,
  //   });
  // } else {
  //   await AsyncStorage.setItem('token', token);
  // }
}

export async function getToken() {
  if (Platform.OS === 'web') {
    return Cookies.get('token');
  } else {
    return await AsyncStorage.getItem('token');
  }
}

export async function removeToken() {
  if (Platform.OS === 'web') {
    Cookies.remove('token');
  } else {
    await AsyncStorage.removeItem('token');
  }
}



export const saveXsrfToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('xsrfToken', token);
  } catch (error) {
    console.error('Failed to save XSRF token:', error);
  }
};

export const getXsrfToken = async () => {
  try {
    return await AsyncStorage.getItem('xsrfToken');
  } catch (error) {
    console.error('Failed to get XSRF token:', error);
    return null;
  }
};
