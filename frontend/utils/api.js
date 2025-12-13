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

export const loginUser = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  const token = res.data.token;  // ← backend returns `token`, not `access_token`
  localStorage.setItem('scholarflow_token', token); // save token
  return res.data; // returns { token, user }
};
export const registerUser = async (email, password, name) => (await api.post('/auth/signup', { email, password, name, role: 'student' })).data;
export const getMyProfile = async () => (await api.get('/profiles/me')).data;
export const createOrUpdateProfile = async (data) => {
  const body = {
    // Role & Account
    gradeLevel: data.gradeLevel,
    state: data.state,

    // Profile Basics
    fullName: data.fullName,
    highSchool: data.highSchool,
    major: data.major,             // maps to backend "intended_major"
    
    // GPA
    gpaUnweighted: data.gpaUnweighted,
    gpaWeighted: data.gpaWeighted,

    // Eligibility
    citizenship: data.citizenship,
    firstGen: data.firstGen,
    ethnicity: data.ethnicity,
    extracurriculars: data.extracurriculars,
    sports: data.sports,

    // Achievements
    satScore: data.satScore,
    actScore: data.actScore,
    apCount: data.apCount,
    honors: data.honors,
    volunteerHours: data.volunteerHours,

    // Documents
    transcriptFile: data.transcriptFile,
    resumeFile: data.resumeFile,

    // Preferences
    weeklyHours: data.weeklyHours,
  };

  const res = await api.post('/profiles/', body);
  return res.data;
};
export const searchScholarships = async (q = "") => (await api.get(`/scholarships/search?q=${q}`)).data;
export const createApplication = async (scholarshipId) =>
  (await api.post('/applications/', { scholarship_id: scholarshipId })).data;
// export const createApplication = async (profileId, scholarshipId) => (await api.post('/applications/', {
//     // 1. Send the profile_id (Required by ApplicationCreate schema)
//     profile_id: profileId,
//     // 2. Send the scholarship_id
//     scholarship_id: scholarshipId 
// })).data;
export const getMyApplications = async () => (await api.get('/applications/')).data;
export const generateEssay = async (prompt, length) => {
  const dummyId = "00000000-0000-0000-0000-000000000000";
  return (await api.post('/essays/generate', { profile_id: dummyId, scholarship_id: dummyId, prompt, length_target: parseInt(length), tone: "professional" })).data;
};
