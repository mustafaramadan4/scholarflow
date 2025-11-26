import Navbar from './Navbar';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  const noNavPages = ['/login', '/register', '/'];
  const showNav = !noNavPages.includes(router.pathname);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', padding: '0 20px', flex: 1 }}>
        {showNav && <Navbar />}
        <main style={{ marginTop: 20 }}>{children}</main>
      </div>
      <footer style={{ textAlign: 'center', padding: 20, borderTop: '1px solid #eee', color: '#888', marginTop: 50 }}>
        &copy; {new Date().getFullYear()} ScholarFlow
      </footer>
    </div>
  );
}
