import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { loginUser } from "../utils/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      // token is already saved in localStorage by loginUser
      // optional: save user info locally too
      localStorage.setItem("scholarflow_user", JSON.stringify(data.user));

      toast.success(`Welcome, ${data.user.name}!`);
      router.push("/scholarships");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(
        err.response?.data?.detail || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: 10 }}
        />
        <button type="submit" disabled={loading} style={{ padding: 10, cursor: "pointer" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}