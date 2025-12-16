import { useRouter } from "next/router";
import { useState } from "react";

export default function Role() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  const roles = [
    { key: "student", label: "High School Student" },
    { key: "parent", label: "Parent / Guardian" },
    { key: "counselor", label: "Counselor / Educator" },
  ];

  const continueNext = () => {
    localStorage.setItem("role", role);
    router.push("/profile-setup");
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>Who are you?</h2>

      {roles.map(({ key, label }) => (
        <label
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: 12,
            marginBottom: 12,
            border: role === key ? "2px solid #2563eb" : "1px solid #ccc",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="role"
            value={key}
            checked={role === key}
            onChange={() => setRole(key)}
            style={{
              width: 18,
              height: 18,
              accentColor: "#2563eb", // forces visibility
            }}
          />
          <span>{label}</span>
        </label>
      ))}

      <button
        disabled={!role}
        onClick={continueNext}
        style={{
          marginTop: 24,
          padding: "10px 16px",
          opacity: role ? 1 : 0.5,
        }}
      >
        Continue
      </button>
    </div>
  );
}