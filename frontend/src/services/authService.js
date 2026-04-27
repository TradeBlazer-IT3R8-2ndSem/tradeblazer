// authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // adjust if needed

// Login: get access + refresh tokens
export async function login(username, password) {
  const response = await axios.post(`${API_URL}/token/`, {
    username,
    password,
  });
  
  const { access, refresh } = response.data;

  // Store tokens (localStorage for web, AsyncStorage for React Native)
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);

  return access;
}
