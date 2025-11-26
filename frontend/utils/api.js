import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});


export const loginUser = async (email, password) => {
  const res = await api.post('/login', { email, password });
  return res.data;
};

export const registerUser = async (email, password, name) => {
  const res = await api.post('/register', { email, password, name });
  return res.data;
};

export const getScholars = async () => {
  const res = await api.get('/scholars');
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get('/profile');
  return res.data;
};
