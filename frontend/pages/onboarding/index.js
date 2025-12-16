import { useRouter } from "next/router";

export default function Welcome() {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to ScholarFlow</h1>
      <button onClick={() => router.push("/onboarding/role")}>
        Get Started
      </button>
      <button onClick={() => router.push("/login")}>
        Log In
      </button>
    </div>
  );
}