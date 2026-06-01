// @ts-nocheck
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form  = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Pogresni podaci. Pokusajte ponovo.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="login-logo">IT Security</div>
        <h1 className="login-title">Prijava</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">
            Email
            <input name="email" type="email" required className="login-input" placeholder="admin@itsecurity.rs" />
          </label>
          <label className="login-label">
            Lozinka
            <input name="password" type="password" required className="login-input" placeholder="••••••••" />
          </label>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Prijava..." : "Prijavi se"}
          </button>
        </form>
      </div>

      <style>{`
        .login-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4f5f8;
        }
        .login-box {
          background: #fff;
          border-radius: 12px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.1);
        }
        .login-logo {
          font-size: 20px;
          font-weight: 700;
          color: #1d3eb8;
          margin-bottom: 8px;
        }
        .login-title {
          font-size: 24px;
          font-weight: 700;
          color: #0b1020;
          margin-bottom: 28px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .login-label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: #0b1020;
        }
        .login-input {
          font-size: 14px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 10px 14px;
          transition: border-color 0.15s;
          font-family: inherit;
        }
        .login-input:focus {
          outline: none;
          border-color: #1d3eb8;
          box-shadow: 0 0 0 3px rgba(29,62,184,0.1);
        }
        .login-error {
          background: #fee2e2;
          color: #991b1b;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 6px;
        }
        .login-btn {
          background: #1d3eb8;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          padding: 12px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background 0.15s;
          margin-top: 4px;
        }
        .login-btn:hover { background: #152a85; }
        .login-btn:disabled { opacity: 0.6; cursor: default; }
      `}</style>
    </div>
  );
}
