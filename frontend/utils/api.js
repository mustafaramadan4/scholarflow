import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('scholarflow_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const loginUser = async (email, password) => (await api.post('/auth/login', { email, password })).data;
export const registerUser = async (email, password, name) => (await api.post('/auth/signup', { email, password, name, role: 'student' })).data;
export const getMyProfile = async () => (await api.get('/profiles/me')).data;
export const createOrUpdateProfile = async (data) => (await api.post('/profiles/', data)).data;
export const searchScholarships = async (q = "") => (await api.get(`/scholarships/search?q=${q}`)).data;
export const createApplication = async (profileId, scholarshipId) => (await api.post('/applications/', {
    // 1. Send the profile_id (Required by ApplicationCreate schema)
    profile_id: profileId,
    // 2. Send the scholarship_id
    scholarship_id: scholarshipId 
})).data;
export const getMyApplications = async () => (await api.get('/applications/')).data;
export const generateEssay = async (prompt, length) => {
  const dummyId = "00000000-0000-0000-0000-000000000000";
  return (await api.post('/essays/generate', { profile_id: dummyId, scholarship_id: dummyId, prompt, length_target: parseInt(length), tone: "professional" })).data;
};
