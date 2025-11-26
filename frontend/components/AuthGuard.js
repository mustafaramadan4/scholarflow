import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const publicPaths = ['/login', '/register', '/'];

  useEffect(() => {
    if (publicPaths.includes(router.pathname)) {
      setAuthorized(true);
      return;
    }
    const token = localStorage.getItem('scholarflow_token');
    if (!token) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router.pathname]);

  if (!authorized && !publicPaths.includes(router.pathname)) return <div style={{ padding: 40 }}>Loading authentication...</div>;
  return children;
}
