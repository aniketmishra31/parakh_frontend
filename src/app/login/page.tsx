"use client";

import useAuth from "@/hooks/useAuth";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const ctx = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  async function handleAuth(userInfo: {
    username: string;
    email?: string;
    password: string;
  }) {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<{
        username: string;
        email: string;
        token: string;
        firstName: string;
        lastName: string;
      }>("http://localhost:3001/user/login", {
        username: userInfo.username,
        password: userInfo.password,
      });
      console.log(res.data);
      ctx.setAuth({ isAuthenticated: true, user: res.data });
      setError(null);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      setError(err.response.data.message);
    }
  }

  return (
    <form>
      <div>
        <label htmlFor="username">Username</label>
        <input
          value={userInfo.username}
          onChange={(e) =>
            setUserInfo((prev) => {
              return { ...prev, username: e.target.value };
            })
          }
          type="text"
          id="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
          type="password"
          id="password"
        />
      </div>
      <button
        onClick={async (event) => {
          event.preventDefault();
          await handleAuth(userInfo);
        }}
      >
        Log In
      </button>
      {!loading && !error && <p></p>}
      {loading && <p key={"loading"}>Loading...</p>}
      {error && <p key={error}>{error}</p>}
      <Link href="/">homepage</Link>
    </form>
  );
}
