import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem('scholarflow_token');
    router.push('/login');
  };

  return (
    <nav style={{ padding: '20px 0', borderBottom: '1px solid #eaeaea', marginBottom: 20, display: 'flex', gap: 20, alignItems: 'center' }}>
      <Link href="/scholarships" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>Find Scholarships</Link>
      <Link href="/applications" style={{ textDecoration: 'none', color: '#555' }}>My Applications</Link>
      <Link href="/essays" style={{ textDecoration: 'none', color: '#555' }}>Essay Generator</Link>
      <Link href="/profile" style={{ textDecoration: 'none', color: '#555' }}>Profile</Link>
      <div style={{ marginLeft: 'auto' }}>
        <button onClick={logout} style={{ padding: '8px 16px', cursor: 'pointer' }}>Logout</button>
      </div>
    </nav>
  );
}
