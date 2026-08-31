"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const redirect = searchParams.get("redirect") || "/";
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, redirect }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(data.redirect);
        router.refresh();
      } else {
        setError(data.error || "ログインに失敗しました。");
      }
    } catch {
      setError("通信に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="brand">
        <span>P</span>HOENIX
      </h1>
      <p className="login-copy">このサイトはパスワードで保護されています。</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
        autoFocus
        required
      />
      {error && <p className="login-error">{error}</p>}
      <button className="button" type="submit" disabled={loading}>
        {loading ? "確認中..." : "ログイン"} <b>→</b>
      </button>
    </form>
  );
}
