import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      
      // 1. CLEAR OLD STATE: Just in case, clear any old token before setting the new one
      localStorage.removeItem('scholarflow_token'); 
      
      localStorage.setItem('scholarflow_token', data.token);
      router.push('/scholarships');
    } catch (err) { 
      // 2. CRITICAL: Clear the token on failure as well.
      // This stops the Scholarships page logic from seeing a bad token and redirecting.
      localStorage.removeItem('scholarflow_token'); 
      
      // Customize error message for better UX
      const errorMessage = err.response?.data?.detail || 'Login failed. Please check your credentials.';
      alert(errorMessage); 
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', textAlign: 'center' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: 10 }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: 10 }} />
        <button type="submit" style={{ padding: 10 }}>Login</button>
      </form>
    </div>
  );
}
