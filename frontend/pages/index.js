import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h1>Welcome to ScholarFlow</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>Connect with scholarships and write better essays with AI.</p>
      <div style={{ marginTop: 40 }}>
        <Link href="/login" style={{ padding: '12px 24px', background: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: 5, marginRight: 15 }}>Login</Link>
        <Link href="/register" style={{ padding: '12px 24px', background: '#eee', color: '#333', textDecoration: 'none', borderRadius: 5 }}>Register</Link>
      </div>
    </div>
  );
}
