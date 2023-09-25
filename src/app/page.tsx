"use client";

import styles from "./page.module.css";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function Home() {
  const {
    auth: { user },
  } = useAuth();
  return (
    <main className={styles.main}>
      <h1>{!user ? "Not Logged In" : `Logged in as ${user.username}`}</h1>
      {!user && (
        <div className={styles.linkContainer}>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </div>
      )}
    </main>
  );
}
