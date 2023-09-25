"use client";

import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useState } from "react";

export default function Page() {
  const ctx = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  async function handleAuth(userInfo: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<{
        username: string;
        id: number;
        email: string;
        token: string;
        firstName: string;
        lastName: string;
      }>("http://localhost:3001/user/signup", {
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
        lastName: userInfo.email,
        firstName: userInfo.email,
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
        <label htmlFor="email">Email</label>
        <input
          value={userInfo.email}
          onChange={(e) =>
            setUserInfo((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
          type="text"
          id="email"
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
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          value={userInfo.firstName}
          onChange={(e) =>
            setUserInfo((prev) => {
              return { ...prev, firstName: e.target.value };
            })
          }
          type="text"
          id="firstName"
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          value={userInfo.lastName}
          onChange={(e) =>
            setUserInfo((prev) => {
              return { ...prev, lastName: e.target.value };
            })
          }
          type="text"
          id="lastName"
        />
      </div>
      <button
        onClick={async (event) => {
          event.preventDefault();
          await handleAuth(userInfo);
        }}
      >
        Sign Up
      </button>
      {!loading && !error && <p></p>}
      {loading && <p key={"loading"}>Loading...</p>}
      {error && <p key={error}>{error}</p>}
    </form>
  );
}
