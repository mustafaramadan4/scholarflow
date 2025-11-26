import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: 20, borderBottom: '1px solid #ccc', marginBottom: 20 }}>
      <Link href="/">Dashboard</Link> |{' '}
      <Link href="/scholars">Scholars</Link> |{' '}
      <Link href="/profile">Profile</Link> |{' '}
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </nav>
  );
}
