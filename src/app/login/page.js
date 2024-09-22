"use client"; 
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from './login.module.css'
import { useState } from "react";

export default function SignInForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  !result.error? router.push("/") :setError(result.error);
  }

  return (
    <form onSubmit={handleSubmit}  className={styles.form} >
      <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        /> 
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      {error && <p >{error}</p>}
      <button type="submit" className={styles.btn}   >Sign In</button>
    </form>
  );
}
