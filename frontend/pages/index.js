import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>ScholarFlow</h1>
      <p>Welcome to the ScholarFlow demo frontend.</p>
      <Link href="/login">Go to Login</Link>
    </div>
  );
}